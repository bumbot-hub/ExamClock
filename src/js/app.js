import {startClock, stopClock} from './clock.js';
import {getVisibleSection, createContrastColor, toggleClasses} from './utils.js'
import {setupTimerEvents} from "./timerUI.js";
import {getReminderPercentage, pauseTimer} from "./timer.js";

const DOM = {
    // Global buttons
    backBtn: document.getElementById('back'),
    contrastBtn: document.getElementById('contrast'),
    fullscreenBtn: document.getElementById('fullscreen'),
    settingsBtn: document.getElementById('settings'),

    // Settings
    accentColorChanger: document.getElementById('accent-color'),
    accentColorReset: document.getElementById('reset-accent'),
    examNameEl: document.getElementsByClassName('exam-name'),
    centreNumberEl: document.getElementsByClassName('centre-number'),
    // Homepage
    clockBtn: document.getElementById('clock'),
    timerBtn: document.getElementById('timer'),
    // Timer
    componentInput: document.getElementById('component-input'),
    countdownInput: document.getElementById('countdown-input'),
    countdownField: document.getElementById('countdown'),
    componentField: document.getElementById('component'),
    okBtn: document.getElementById('ok-btn'),
    playPauseBtn: document.getElementById('play-pause'),
    progressBar: document.getElementById('timer-progress'),
    popups: document.getElementById('timer-popup'),
    remindersContainer: document.getElementById('reminders'),
    resetBtn: document.getElementById('reset'),
    startTimerBtn: document.getElementById('start-timer'),

    firstReminder: document.getElementById('first'),
    secondReminder: document.getElementById('second')
};

let state = {
    hourMode: 24,
    isTimerRunning: false,
    historyStack: [], // Stack of visited sites for goBack() function
    reminder1: 0,
    reminder2: 0,
};

const pageChangerBtn = [
    DOM.settingsBtn,
    DOM.clockBtn,
    DOM.timerBtn
];


function updateHeader(section){
    const logo = document.querySelector('h2');
    const logoAccent = document.querySelector('.logo-square');
    if(section.classList.contains("homepage")){
        DOM.backBtn.classList.add('hidden');
    }else{
        DOM.backBtn.classList.remove('hidden');
    }

    if(section.classList.contains("clock") || section.classList.contains("timer")){
        logo.style.color = "transparent";
        logoAccent.style.color = "transparent";
    }else{
        logo.style.color = ''; //get back to default from CSS file
        logoAccent.style.color = '';
    }
}

pageChangerBtn.forEach(btn => {
    if(btn){
        btn.addEventListener("click", () => {
            const currentSection = getVisibleSection();
            const newSection = document.querySelector(`.${btn.id}`);

            if(currentSection   === newSection) return;

            if(currentSection){
                state.historyStack.push(currentSection.className); //Add current section to history
                currentSection.classList.add("hidden");
            }

            if(newSection){
                newSection.classList.remove("hidden");
                updateHeader(newSection);
            }
        });
    }
});

function goBack(){
    if (state.historyStack.length === 0) return;

    let currentSection = getVisibleSection();
    if(currentSection){
        currentSection.classList.add("hidden");
    }

    const prevSection = document.querySelector(`.${state.historyStack.pop()}`);
    if(prevSection){
        if(!prevSection.classList.contains("clock")){
            stopClock();
        }

        prevSection.classList.remove("hidden");
        updateHeader(prevSection);
    }
}

//Global, Homepage and Setting listeners
DOM.backBtn.addEventListener("click", goBack);

DOM.contrastBtn.addEventListener("click", () => {
    document.body.classList.toggle("contrast-mode");
    if(document.body.classList.contains("contrast-mode")){
        document.body.style.setProperty("--accent-color", createContrastColor(DOM.accentColorChanger.value));
    }else{
        document.body.style.setProperty("--accent-color", DOM.accentColorChanger.value);
    }
    DOM.contrastBtn.classList.toggle("fa-flip-horizontal");
});

DOM.fullscreenBtn.addEventListener("click", () => {
    if(!document.fullscreenElement){
        document.documentElement.requestFullscreen();
    }else{
        document.exitFullscreen();
    }
    toggleClasses(DOM.fullscreenBtn, 'fa-expand', 'fa-compress');
});

// Color change logic implemented in settings_data.js
DOM.accentColorChanger.addEventListener("input", () => {
    DOM.accentColorReset.classList.remove("hidden");
});

DOM.clockBtn.addEventListener("click", () => {
    startClock(state.hourMode);
});


export function updateInfo(data){
    for(const field of DOM.examNameEl){
        field.innerHTML = data["exam-name"] ? data["exam-name"].toString() : "";
    }

    for(const field of DOM.centreNumberEl){
        field.innerHTML = data["centre-number"] ? data["centre-number"].toString() : "";
    }

    const optionalContainers = ['.exam-data', '.others'];
    optionalContainers.forEach(selector => {
        const containers = document.querySelector(selector);
        containers.forEach(container => {
            const hasContent = container.innerText.trim().length > 0;

            if(hasContent){
                container.classList.remove("hidden");
            }else{
                container.classList.add("hidden");
            }
        })
    })

    state.reminder1 = Number.parseInt(data['1st-reminder'], 10) || 0;
    state.reminder2 = Number.parseInt(data['2nd-reminder'], 10) || 0;
    refreshMarkersUI();
}

export function updateAccessibility(data){
    // hour-mode; false - 24h, true - 12h
    state.hourMode = data['hour-mode'] ? 12 : 24;
    startClock(state.hourMode);

    // dark-mode
    if(data['dark-mode']){
        document.body.classList.add('dark-mode');
    }else{
        document.body.classList.remove('dark-mode');
    }

    // accent-color
    if(data['accent-color']){
        document.body.style.setProperty('--accent-color', data['accent-color']);
    }
}

export function refreshMarkersUI() {
    const markers = [DOM.firstReminder, DOM.secondReminder];
    const reminderValues = [state.reminder1, state.reminder2];

    reminderValues.forEach((min, index) => {
        const marker = markers[index];
        if (marker) {
            const percent = getReminderPercentage(min);
            if (min > 0 && percent > 0 && percent <= 100) {
                marker.style.left = `${percent}%`;
                marker.classList.remove("hidden");
            } else {
                marker.classList.add("hidden");
            }
        }
    });
}

setupTimerEvents(DOM, state);