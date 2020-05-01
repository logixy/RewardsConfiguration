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
    return JSON.parse(inputJson.value);
}

function generateRewardsConfig(rewardsList, month) {
    rewardsConfig = []

    for (let day = 1; day <= DAYS[month]; day++) {
        if (rewardsList.length === 0) {
            throw 'No types defined';
        }

        let typeIndex = Math.floor(Math.random() * rewardsList.length);

        if (!rewardsList[typeIndex].type) {
            throw "Missing 'type' property of type with index " + typeIndex;
        }

        if (!rewardsList[typeIndex].rewards) {
            throw "Missing 'rewards' property of type " + rewardsList[typeIndex].type
        }

        if (!rewardsList[typeIndex].rewards.length) {
            throw 'No rewards of type ' + rewardsList[typeIndex].type + ' defined'
        }

        let total = rewardsList[typeIndex].rewards.length;
        let rewardIndex = Math.floor(Math.random() * total);

        let header = {
            day: day,
            type: rewardsList[typeIndex].type
        };

        if (rewardsList[typeIndex].description) {
            header.description = rewardsList[typeIndex].description;
        }

        let content = rewardsList[typeIndex].rewards[rewardIndex];

        let reward = Object.assign(header, content);

        if (reward.weight) {
            delete reward.weight;
        } else {
            throw "Missing 'weight' property of reward with type " + rewardsList[typeIndex].type + " and index " + rewardIndex;
        }

        rewardsConfig.push(reward);
    }
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
