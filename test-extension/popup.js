document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('start');
    startButton.onclick = () => { chrome.runtime.sendMessage('START_RECORDING') };
});