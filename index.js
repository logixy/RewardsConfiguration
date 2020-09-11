const TEMPLATES = ['BioTech', 'ClassicTech', 'MagicRPG'];

const copiedCompleteLabel = document.getElementById('copiedCompleteLabel');
const copyJsonButton = document.getElementById('copyJsonButton')
const errorLabel = document.getElementById('errorLabel');
const inputJsonTextArea = document.getElementById('inputJsonTextArea');
const makeButton = document.getElementById('makeButton');
const monthSelect = document.getElementById('monthSelect');
const outputJsonText = document.getElementById('outputJsonText');
const templateSelect = document.getElementById('templateSelect');
const weightModeSelect = document.getElementById('weightModeSelect');

main();

function main() {
    copiedCompleteLabel.style.visibility = 'hidden'
    copyJsonButton.onclick = onCopyButtonClick;
    makeButton.addEventListener('click', onMakeButtonClick);
    monthSelect.selectedIndex = (new Date().getMonth() + 1) % 12;
    templateSelect.addEventListener('change', onSelectTemplate);

    hideError()

    let rewardsConfig = [];
    showOutputJsonFromObject(rewardsConfig)

    for (let i = 0; i < TEMPLATES.length; i++) {
        const option = document.createElement('option');
        option.innerHTML = TEMPLATES[i];
        templateSelect.appendChild(option);
    }
}

function onSelectTemplate() {
    let templateName = templateSelect.options[templateSelect.selectedIndex].text;

    if (templateSelect.selectedIndex === 0) {
        inputJsonTextArea.value = '';
    } else {
        axios.get(`templates/${templateName}.json`).then((response) => {
            inputJsonTextArea.value = JSON.stringify(response.data, null, 2);
        }).catch((error) => {
            showError(error, 'Failed to load template ' + `(templates/${templateName}.json)`)
        })
    }
}

function onMakeButtonClick() {
    try {
        let rewardsList = parseInputJson(inputJsonTextArea.value);

        let monthIndex = monthSelect.selectedIndex;
        let rewardsConfig = makeRewardsConfig(rewardsList, monthIndex);

        showOutputJsonFromObject(rewardsConfig)

        hideError();
    } catch (error) {
        showError(error, 'Invalid JSON. See console for more info.');
    }
};

function onCopyButtonClick() {
    copyTextToClipboard(outputJsonText.innerHTML)

    copiedCompleteLabel.style.visibility = 'visible';

    setTimeout(() => {
        copiedCompleteLabel.style.visibility = 'hidden'
    }, 3000);
}

function parseInputJson(json = '') {
    let rewardsList = Object.assign({}, JSON.parse(json));

    if (rewardsList.length === 0) {
        throw 'No types defined';
    }

    let typeIndex;

    for (typeIndex = 0; typeIndex < rewardsList.length; typeIndex++) {
        if (!rewardsList[typeIndex].type) {
            throw 'Missing "type" property of type with index ' + typeIndex;
        }

        if (!rewardsList[typeIndex].rewards) {
            throw 'Missing "rewards" property of type with index ' + typeIndex;
        }

        if (rewardsList[typeIndex].rewards.length === 0) {
            throw 'No rewards of type ' + rewardsList[typeIndex].type + ' defined';
        }
    }

    return rewardsList;
}

function showOutputJsonFromObject(object = {}) {
    outputJsonText.innerHTML = JSON.stringify(object, null, 2);
}

function makeRewardsConfig(rewardsList, month) {
    let rewardsConfig = [];

    let typeIndex = 0;

    rewards = [];

    for (let i = 0; i < 3; i++) {
        let header = {
            day: 0,
            type: rewardsList[i].type
        };

        if (rewardsList[i].description) {
            header.description = rewardsList[i].description;
        }

        let content = [];
        for (let j = 0; j < rewardsList[i].rewards.length; j++) {
            content = rewardsList[i].rewards[j];
            rewardsList[i].rewards[j] = Object.assign(Object.assign({}, header), Object.assign({}, content));
        }

        rewards = rewards.concat(rewardsList[i].rewards);
    }

    // For more information on weights and weight mode see
    // https://github.com/LogicWorlds/RewardsConfiguration#weight-mode

    let filteredRewardsL = rewards.filter(
        reward => reward.weight === 'l'
    );

    let filteredRewardsLM = rewards.filter(
        reward => (reward.weight === 'l' || reward.weight === 'm')
    );

    let filteredRewardsM = rewards.filter(
        reward => reward.weight === 'm'
    );

    let filteredRewardsMH = rewards.filter(
        reward => (reward.weight === 'm' || reward.weight === 'h')
    );

    let filteredRewardsH = rewards.filter(
        reward => reward.weight === 'h'
    );

    const DAYS = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    for (i = 1; i <= DAYS[month]; i++) {
        let reward = {};

        if (i < 8) {
            reward = getRandomItemFromArray(filteredRewardsL);
        } else if (i > 23) {
            if (weightModeSelect.selectedIndex === 0) {
                // strict mode
                reward = getRandomItemFromArray(filteredRewardsH);
            } else if (weightModeSelect.selectedIndex === 1) {
                // mixed mode
                reward = getRandomItemFromArray(filteredRewardsMH);
            }
        } else {
            if (weightModeSelect.selectedIndex === 0) {
                // strict mode
                reward = getRandomItemFromArray(filteredRewardsM);
            } else if (weightModeSelect.selectedIndex === 1) {
                // mixed mode
                reward = getRandomItemFromArray(filteredRewardsLM);
            }
        }

        reward = Object.assign({}, reward);
        reward.day = i;
        delete reward.weight;
        rewardsConfig.push(reward);
    }

    return rewardsConfig
}

function getRandomItemFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function copyTextToClipboard(text = '') {
    let input = document.createElement('textarea');

    document.body.appendChild(input);

    input.value = text
    input.select();

    document.execCommand('copy');

    document.body.removeChild(input);

    delete input;
}

function showError(error, errorText = '') {
    errorLabel.style.visibility = 'visible';
    errorLabel.innerHTML = '<b>Unknown error!</b> See console for details.';

    if (errorText != '') {
        errorLabel.innerHTML = '<b>Error!</b> ' + errorText;
    }

    console.error(error);
}

function hideError() {
    errorLabel.style.visibility = 'hidden';
}
