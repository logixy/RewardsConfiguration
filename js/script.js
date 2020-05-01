monthSelect = document.getElementById('monthSelect');
monthSelect.selectedIndex = (new Date().getMonth() + 1) % 12;

inputJson = document.getElementById('inputJson');
generateJson = document.getElementById('generateJson');
copyJson = document.getElementById('copyJson');
outputJson = document.getElementById('outputJson');
generationError = document.getElementById('generationError');

let requestURL = 'https://www.mymusichere.me/public/awards/awards.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

awards = []
inputJson.value = '[]'

request.onload = function() {
    awards = request.response;
    inputJson.value = JSON.stringify(awards, null, 2)
}

days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

generateJson.addEventListener("click", onGenerateJsonButtonClick);

awardsConfig = []

function onGenerateJsonButtonClick() {
    try {
        input = JSON.parse(inputJson.value)
        generationError.style.visibility = 'hidden'
    } catch (error) {
        generationError.style.visibility = 'visible'
    }

    for (day = 1; day <= days[monthSelect.selectedIndex]; day++) {
        type = Math.floor(Math.random() * 3)

        total = input[type].awards.length
        awardIndex = Math.floor(Math.random() * total)

        header = {
            day: day,
            type: input[type].type,
        }
        content = input[type].awards[awardIndex]
        award = Object.assign(header, content)
        delete award.weight
        awardsConfig.push(award)
    }

    outputJson.innerHTML = JSON.stringify(awardsConfig, null, 2)
};

copyJson.addEventListener("click", copyJsonToClipboard)

function copyJsonToClipboard() {
    input = document.createElement('textarea')
    document.body.appendChild(input);
    input.value = JSON.stringify(awardsConfig, null, 2);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
}
