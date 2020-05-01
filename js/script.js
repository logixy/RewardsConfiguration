let monthSelect = document.getElementById('monthSelect');
monthSelect.selectedIndex = (new Date().getMonth() + 1) % 12;

let inputJsonTextArea = document.getElementById('inputJson');

let generateJsonButton = document.getElementById('generateJson');
generateJsonButton.addEventListener("click", onGenerateJsonButtonClick);

let outputJson = document.getElementById('outputJson');

let generationError = document.getElementById('generationError');


const DAYS = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


var rewardsConfig = [];
outputJson.innerHTML = JSON.stringify(rewardsConfig, null, 2);

function onGenerateJsonButtonClick() {
    try {
        let rewardsList = parseInputJson();

        let monthIndex = monthSelect.selectedIndex;
        generateRewardsConfig(rewardsList, monthIndex);

        outputJson.innerHTML = JSON.stringify(rewardsConfig, null, 2);

        hideError();
    } catch (error) {
        showError(error);
    }

};


function parseInputJson() {
    let rewardsList = JSON.parse(inputJson.value);

    if (rewardsList.length === 0) {
        throw 'No types defined';
    }

    var typeIndex;
    for (typeIndex = 0; typeIndex < rewardsList.length; typeIndex++) {
        if (!rewardsList[typeIndex].type) {
            throw "Missing 'type' property of type with index " + typeIndex;
        }
        if (!rewardsList[typeIndex].rewards) {
            throw "Missing 'rewards' property of type with index " + typeIndex;
        }
        if (rewardsList[typeIndex].rewards.length === 0) {
            throw 'No rewards of type ' + rewardsList[typeIndex].type + ' defined'
        }
    }

    return rewardsList;
}

function generateRewardsConfig(rewardsList, month) {
    rewardsConfig = []

    let typeIndex = 0;

    rewards = [];

    for (let i = 0; i < rewardsList.length; i++) {
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
            rewardsList[i].rewards[j] = Object.assign(header, content);
        }

        rewards = rewards.concat(rewardsList[i].rewards);
    }

    var filteredRewardsL = rewards.filter(
        reward => reward.weight === "l"
    );

    var filteredRewardsLM = rewards.filter(
        reward => (reward.weight === "l" || reward.weight === "m")
    );

    var filteredRewardsMH = rewards.filter(
        reward => (reward.weight === "m" || reward.weight === "h")
    );

    for (i = 1; i <= DAYS[month]; i++) {
        let reward = {};

        if (i < 8) {
            reward = getRandomItemFromArray(filteredRewardsL)
        } else if (i > 23) {
            reward = getRandomItemFromArray(filteredRewardsMH)
        } else {
            reward = getRandomItemFromArray(filteredRewardsLM)
        }

        reward.day = i;
        delete reward.weight;
        rewardsConfig.push(reward);
    }
}

function getRandomItemFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}


const copyJsonButton = document.getElementById('copyJson');

copyJson.addEventListener("click", function copyJsonToClipboard() {
    let input = document.createElement('textarea');
    document.body.appendChild(input);
    input.value = JSON.stringify(rewardsConfig, null, 2);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    delete input;
})


function showError(error) {
    generationError.style.visibility = 'visible';
    console.error(error);
};

function hideError() {
    generationError.style.visibility = 'hidden';
};
