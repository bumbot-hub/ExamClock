import { startClock, stopClock } from './clock.js';
import { startTimer, stopTimer } from './timer.js';

const contrast_BTN = document.getElementById("contrast");
const fullscreen_BTN = document.getElementById("fullscreen");
const back_BTN = document.getElementById("back");
const goClock = document.getElementById("clock");
const goTimer = document.getElementById("timer");
const startTimer_BTN = document.getElementById("start_timer");

let historyStack = []; // Stack of visited sites

// Returns first visible section (active) besides header
function getVisibleSection(){
    const children = Array.from(document.body.children).slice(1);
    return children.find(child => !child.classList.contains("hidden"));
}

contrast_BTN.addEventListener("click", () => {
    document.body.classList.toggle("high_contrast");
    contrast_BTN.classList.toggle("fa-flip-horizontal");
})

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
        } else if(!prevSection.classList.contains("timer")){
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

    document.getElementById("component").innerHTML += component_input;
    startTimer(countdown_input, document.getElementById("countdown"));

    timerPopup.classList.add("hidden");
})