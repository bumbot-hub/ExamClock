import {startClock, stopClock} from './clock.js';
import {pauseTimer, resumeTimer, startTimer, endTimer} from './timer.js';


const contrast_BTN = document.getElementById("contrast");
const fullscreen_BTN = document.getElementById("fullscreen");
const back_BTN = document.getElementById("back");
const dark_mode_Switch = document.getElementById("dark-mode");

const goClock = document.getElementById("clock");
const goTimer = document.getElementById("timer");

let hourMode = 24;
let isRunning = false;

const startTimer_BTN = document.getElementById("start-timer");
const playPause_BTN = document.getElementById("play-pause");
const reset_BTN = document.getElementById("reset");
const accentColorChanger = document.getElementById("accent-color");
const accentColorReset = document.getElementById("reset-accent");
const reset_icon = document.getElementById('reset');
const okBtn = document.getElementById('ok-btn');
let historyStack = []; // Stack of visited sites

// Returns first visible section (active) besides header
function getVisibleSection(){
    const children = Array.from(document.body.children).slice(1);
    return children.find(child => !child.classList.contains("hidden"));
}

contrast_BTN.addEventListener("click", () => {
    document.body.classList.toggle("contrast-mode");
    if(document.body.classList.contains("contrast-mode")){
        document.body.style.setProperty("--accent-color", contrastAccent(accentColorChanger.value));
    }else{
        document.body.style.setProperty("--accent-color", accentColorChanger.value);
    }
    contrast_BTN.classList.toggle("fa-flip-horizontal");
})

function contrastAccent(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h = 0;
    if (max !== min) {
        const d = max - min;
        if (max === r)       h = (g - b) / d + (g < b ? 6 : 0);
        else if (max === g)  h = (b - r) / d + 2;
        else                 h = (r - g) / d + 4;
        h *= 60;
    }

    return `hsl(${Math.round(h)}, 100%, 50%)`;
}

fullscreen_BTN.addEventListener("click", () => {
    if(!document.fullscreenElement){
        document.documentElement.requestFullscreen();
        fullscreen_BTN.classList.add("fa-compress");
        fullscreen_BTN.classList.remove("fa-expand");
    }else{
        document.exitFullscreen();
        fullscreen_BTN.classList.add("fa-expand");
        fullscreen_BTN.classList.remove("fa-compress");
    }
})

dark_mode_Switch.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
})

function updateHeader(section){
    const backBTN = document.getElementById("back");
    const logo = document.querySelector('h2');
    const logo_accent = document.querySelector('.logo-square');
    if(section.classList.contains("homepage")){
        backBTN.classList.add('hidden');
    }else{
        backBTN.classList.remove('hidden');
    }

    if(section.classList.contains("clock") || section.classList.contains("timer")){
        logo.style.color = "transparent";
        logo_accent.style.color = "transparent";
    }else{
        logo.style.color = ''; //get back to default from CSS file
        logo_accent.style.color = '';
    }
}

const hourModeCheckbox = document.getElementById("hour-mode");
hourModeCheckbox.addEventListener("change", () => {
    hourMode = hourModeCheckbox.checked ? 12 : 24;
    startClock(hourMode);
})

const page_changer_BTN = [
    document.getElementById("settings"),
    document.getElementById("clock"),
    document.getElementById("timer")
];

page_changer_BTN.forEach(btn => {
    if(btn){
        btn.addEventListener("click", () => {
            const currentSection = getVisibleSection();
            if (currentSection) {
                historyStack.push(currentSection.className); //Add current section to history
                currentSection.classList.add("hidden");
            }

            const newSection = document.querySelector(`.${btn.id}`);
            if(newSection){
                newSection.classList.remove("hidden");
                updateHeader(newSection);
            }
        });
    }
});

accentColorChanger.addEventListener("input", () => {
    document.body.style.setProperty("--"+accentColorChanger.id, accentColorChanger.value);
    accentColorReset.classList.remove("hidden");
})

accentColorReset.addEventListener("click", () => {
    document.body.style.removeProperty("--accent-color")
    accentColorChanger.value = getComputedStyle(document.body)
        .getPropertyValue("--accent-color")
        .trim();
    accentColorReset.classList.add("hidden");
})

function goBack(){
    if (historyStack.length === 0) return;

    let currentSection = getVisibleSection();
    if(currentSection){
        currentSection.classList.add("hidden");
    }

    const prevSection = document.querySelector(`.${historyStack.pop()}`);
    if(prevSection){
        if(!prevSection.classList.contains("clock")){
            stopClock();
        }
        if(!prevSection.classList.contains("timer")){
            pauseTimer();
        }

        prevSection.classList.remove("hidden");
        updateHeader(prevSection);
    }
}

back_BTN.addEventListener("click", goBack);

export function updateInfo(data){
    const nameFields = document.getElementsByClassName("exam-name");
    const centreFields = document.getElementsByClassName("centre-number");

    for(const field of nameFields){
        field.innerHTML = data["exam-name"].toString();
    }

    for(const field of centreFields){
        field.innerHTML = data["centre-number"].toString();
    }
}

goClock.addEventListener("click", () => {
    startClock(hourMode);
});

const timerPopup = document.getElementById("timer-popup");

goTimer.addEventListener("click", () => {
    timerPopup.classList.remove("hidden");
    timerPopup.children[0].classList.remove("hidden");
});

startTimer_BTN.addEventListener("click", () => {
    if(reset_icon.classList.contains('fa-arrow-rotate-right')){
        reset_icon.classList.remove('fa-arrow-rotate-right');
        reset_icon.classList.add('fa-stop');
    }
    const countdown_input = document.getElementById("countdown-input").value;
    const component_input = document.getElementById("component-input").value;
    const progress_bar = document.getElementById("timer-progress");
    document.getElementsByClassName("timer-nav")[0].classList.remove("hidden");

    document.getElementById("component").innerHTML += component_input;
    startTimer(countdown_input, document.getElementById("countdown"), progress_bar);

    timerPopup.classList.add("hidden");
    timerPopup.children[0].classList.add("hidden");
    isRunning = true;
})


playPause_BTN.addEventListener("click", () => {
    if(isRunning){
        pauseTimer();
        playPause_BTN.classList.remove("fa-pause");
        playPause_BTN.classList.add("fa-play");
    }else{
        resumeTimer(document.getElementById("countdown"), document.getElementById("timer-progress"));
        playPause_BTN.classList.remove("fa-play");
        playPause_BTN.classList.add("fa-pause");
    }
    isRunning = !isRunning;
})

reset_BTN.addEventListener("click", () => {
    endTimer(document.getElementById('countdown'), document.getElementById("timer-progress"), reset_icon);
})

okBtn.addEventListener("click", () => {
    timerPopup.classList.add("hidden");
    timerPopup.children[1].classList.add("hidden");
})