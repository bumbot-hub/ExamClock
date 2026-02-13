import {toggleClasses, formatSecondsToTime, parseTimeToSeconds} from "./utils.js";

let intervalId = null;
export let remainingTime = 0;
let fullTime = 0;

function renderTime(HTML) {
    HTML.innerHTML = formatSecondsToTime(remainingTime);
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

function startInterval(HTML, progress_bar, reminders) {
    if (intervalId) clearInterval(intervalId);

    intervalId = setInterval(() => {
        if (remainingTime <= 0) {
            endTimer(HTML, progress_bar);
        } else {
            remainingTime--;
            updateProgressBar(progress_bar);
            renderTime(HTML);
            if(reminders){
                for(let r of reminders){
                    if((r*60) === remainingTime){
                        showReminderPopup(r);
                    }
                }
            }
        }
    }, 1000);
}

export function startTimer(countdown, HTML, progress_bar, reminders){
    fullTime = parseTimeToSeconds(countdown);
    if (remainingTime === 0) {
        remainingTime = fullTime;
    }

    renderTime(HTML);
    updateProgressBar(progress_bar);
    startInterval(HTML, progress_bar, reminders);
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


    showReminderPopup(-1);
    toggleClasses(icon, 'fa-stop', 'fa-arrow-rotate-right');
}

export function getReminderPercentage(reminderMinutes) {
    if (!fullTime) return 0;
    const reminderSeconds = reminderMinutes * 60;
    return (reminderSeconds / fullTime) * 100;
}

function showReminderPopup(r){
    let innerTxt = `${r} minutes left!`;
    if(r === -1){
        innerTxt = `The time has ended.`;
    }

    document.getElementById('timer-popup').classList.remove('hidden');
    document.getElementById('pop-up-content').innerText = innerTxt;
    document.getElementById('reminder').classList.remove('hidden');
}