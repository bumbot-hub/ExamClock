import { startClock, stopClock } from './clock.js';
import { startTimer, pauseTimer, resumeTimer, stopTimer } from './timer.js';

const contrast_BTN = document.getElementById("contrast");
const fullscreen_BTN = document.getElementById("fullscreen");
const back_BTN = document.getElementById("back");
const dark_mode_Switch = document.getElementById("dark_mode");

const goClock = document.getElementById("clock");
const goTimer = document.getElementById("timer");

let hourMode = document.getElementById("hour-mode").checked;
let isRunning = false;

const startTimer_BTN = document.getElementById("start_timer");
const playPause_BTN = document.getElementById("play_pause");
const reset_BTN = document.getElementById("reset");
const accentColorChanger = document.getElementById("accent-color");
let historyStack = []; // Stack of visited sites

// Returns first visible section (active) besides header
function getVisibleSection(){
    const children = Array.from(document.body.children).slice(1);
    return children.find(child => !child.classList.contains("hidden"));
}

contrast_BTN.addEventListener("click", () => {
    document.body.classList.toggle("contrast_mode");
    if(document.body.classList.contains("contrast_mode")){
        document.body.style.setProperty("--accent-color", contrastAccent(accentColorChanger.value));
    }else{
        document.body.style.setProperty("--accent-color", accentColorChanger.value);
    }
    contrast_BTN.classList.toggle("fa-flip-horizontal");
    console.log(hourMode);
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
    document.body.classList.toggle("dark_mode");
})

function updateHeader(section){
    const backBTN = document.getElementById("back");
    const logo = document.querySelector('h2');
    const logo_accent = document.querySelector('.logo_square');
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
            stopTimer();
        }

        prevSection.classList.remove("hidden");
        updateHeader(prevSection);
    }
}

back_BTN.addEventListener("click", goBack);

export function updateInfo(data){
    const nameFields = document.getElementsByClassName("exam_name");
    const centreFields = document.getElementsByClassName("centre_number");

    for(const field of nameFields){
        field.innerHTML = data["exam_name"].toString();
    }

    for(const field of centreFields){
        field.innerHTML = data["centre_number"].toString();
    }
}

goClock.addEventListener("click", () => {
    startClock();
});

const timerPopup = document.getElementById("timer_popup");

goTimer.addEventListener("click", () => {
    timerPopup.classList.remove("hidden");
});

startTimer_BTN.addEventListener("click", () => {
    const countdown_input = document.getElementById("countdown_input").value;
    const component_input = document.getElementById("component_input").value;
    const progress_bar = document.getElementById("timer_progress")

    document.getElementById("component").innerHTML += component_input;
    startTimer(countdown_input, document.getElementById("countdown"), progress_bar);

    timerPopup.classList.add("hidden");
})


playPause_BTN.addEventListener("click", () => {
    if(isRunning){
        pauseTimer();
        playPause_BTN.classList.add("fa-pause");
        playPause_BTN.classList.remove("fa-play");

    }else{
        resumeTimer(document.getElementById("countdown"));
        playPause_BTN.classList.add("fa-play");
        playPause_BTN.classList.remove("fa-pause");
    }
    isRunning = !isRunning;
})

reset_BTN.addEventListener("click", () => {
    stopTimer();
})