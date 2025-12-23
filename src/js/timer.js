import {toggleClasses} from "./utils.js";

let intervalId = null;
let remainingTime = 0;
let fullTime = 0;

function renderTime(HTML) {
    const h   = Math.floor(remainingTime / 3600);
    const min = Math.floor((remainingTime % 3600) / 60);
    const s   = remainingTime % 60;

    HTML.innerHTML = [
        h.toString().padStart(2, '0'),
        min.toString().padStart(2, '0'),
        s.toString().padStart(2, '0')
    ].join(':');
}

function updateProgressBar(progressBar) {
    if(!progressBar || !fullTime) return;

    const progressPercentage = (remainingTime / fullTime) * 100;
    progressBar.style.width = progressPercentage + '%';

    const progressPercentageText = document.getElementById('progress-percentage');
    if (progressPercentageText) {
        progressPercentageText.innerHTML = Math.round(progressPercentage) + '%';
    }
}

function startInterval(HTML, progress_bar) {
    if (intervalId) clearInterval(intervalId);

    intervalId = setInterval(() => {
        if (remainingTime <= 0) {
            endTimer(HTML, progress_bar);
        } else {
            remainingTime--;
            updateProgressBar(progress_bar);
            renderTime(HTML);
        }
    }, 1000);
}

export function startTimer(countdown, HTML, progress_bar){
    fullTime =
        parseInt(countdown.slice(0,2), 10) * 3600 +
        parseInt(countdown.slice(3,5), 10) * 60;

    if(remainingTime === 0){
        remainingTime = fullTime;
    }
    renderTime(HTML);
    updateProgressBar(progress_bar);
    startInterval(HTML, progress_bar);

}

export function pauseTimer(){
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

export function resumeTimer(HTML, progressBar){
    if (!intervalId && remainingTime > 0) {
        startInterval(HTML, progressBar);
    }
}

export function endTimer(HTML, progress_bar, icon){
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
    remainingTime = 0;
    progress_bar.style.width = '0%';
    HTML.innerHTML = '00:00:00';
    document.getElementById('timer-popup').classList.remove('hidden');
    document.getElementById('reminder').classList.remove('hidden');
    toggleClasses(icon, 'fa-stop', 'fa-arrow-rotate-right');
}