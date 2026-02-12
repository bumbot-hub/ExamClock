import {endTimer, pauseTimer, resumeTimer, startTimer, remainingTime} from "./timer.js";
import {toggleClasses} from "./utils.js";
import { refreshMarkersUI } from "./app.js";

export function setupTimerEvents(DOM, appState){
    DOM.timerBtn.addEventListener("click", () => {
        if(remainingTime === 0){
            DOM.popups.classList.remove("hidden");
            DOM.popups.children[0].classList.remove("hidden");

            DOM.resetBtn.classList.replace(DOM.resetBtn.classList[1], "fa-stop");
            DOM.playPauseBtn.classList.replace(DOM.playPauseBtn.classList[1], "fa-pause");
        }
    });

    DOM.startTimerBtn.addEventListener("click", () => {
        const remindersValue= getReminders();

        document.getElementsByClassName("timer-nav")[0].classList.remove("hidden");

        DOM.componentField.innerHTML = DOM.componentInput.value;

        startTimer(DOM.countdownInput.value, DOM.countdownField, DOM.progressBar, remindersValue);
        appState.isRunning = true;
        refreshMarkersUI();

        DOM.popups.classList.add("hidden");
        DOM.popups.children[0].classList.add("hidden");
    };


    DOM.startTimerBtn.addEventListener("click", startTimerHandler);
    DOM.componentInput.addEventListener("keydown", (event) => {
        if(event.code === "Enter"){
            event.preventDefault();
            startTimerHandler();
        }
    });

    DOM.playPauseBtn.addEventListener("click", () => {
        if(appState.isRunning){
            pauseTimer();
        }else{
            resumeTimer(DOM.countdownField, DOM.progressBar);
        }
        toggleClasses(DOM.playPauseBtn, 'fa-pause', 'fa-play');
        appState.isRunning = !appState.isRunning;
    });

    DOM.resetBtn.addEventListener("click", () => {
        if(DOM.resetBtn.classList.contains('fa-stop')){
            endTimer(DOM.countdownField, DOM.progressBar, DOM.resetBtn);
            Array.from(DOM.popups.children).forEach(popup => {
                popup.classList.add("hidden");
            });
        }else if(DOM.resetBtn.classList.contains('fa-arrow-rotate-right')){
            DOM.timerBtn.click();                       // Simulating clicking on timer button for popup to show
        }
    });

    DOM.okBtn.addEventListener("click", () => {
        DOM.popups.classList.add("hidden");
        DOM.popups.children[1].classList.add("hidden");
    });
}

function getReminders(){
    return [Number.parseInt(document.getElementsByName('1st-reminder')[0].value, 10), Number.parseInt(document.getElementsByName('2nd-reminder')[0].value, 10)]
}