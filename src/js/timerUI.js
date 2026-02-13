import {endTimer, pauseTimer, resumeTimer, startTimer, remainingTime} from "./timer.js";
import {getVisibleSection, toggleClasses} from "./utils.js";
import { refreshMarkersUI } from "./app.js";

export function setupTimerEvents(DOM, appState){
    const initializeTimer = () => {
        const remindersValue= getReminders();

        document.getElementsByClassName("timer-nav")[0].classList.remove("hidden");

        DOM.componentField.innerHTML = DOM.componentInput.value;

        startTimer(DOM.countdownInput.value, DOM.countdownField, DOM.progressBar, remindersValue);
        appState.isTimerRunning = true;
        refreshMarkersUI();

        DOM.popups.classList.add("hidden");
        DOM.popups.children[0].classList.add("hidden");
    }

    const togglePause = () => {
        if(appState.isTimerRunning){
            pauseTimer();
            appState.isTimerRunning = false;
        }else{
            resumeTimer(DOM.countdownField, DOM.progressBar);
        }
        toggleClasses(DOM.playPauseBtn, 'fa-pause', 'fa-play');
        appState.isTimerRunning = !appState.isTimerRunning;
    }

    DOM.timerBtn.addEventListener("click", () => {
        if(remainingTime === 0){
            DOM.popups.classList.remove("hidden");
            DOM.popups.children[0].classList.remove("hidden");

            DOM.resetBtn.classList.replace(DOM.resetBtn.classList[1], "fa-stop");
            DOM.playPauseBtn.classList.replace(DOM.playPauseBtn.classList[1], "fa-pause");
        }
    });

    DOM.startTimerBtn.addEventListener("click", () => {
        initializeTimer();
    });

    DOM.componentInput.addEventListener("keydown", (event) => {
        if(event.code === "Enter"){
            event.preventDefault();
            initializeTimer();
        }
    });

    DOM.playPauseBtn.addEventListener("click", () => {
        togglePause();
    });

    window.addEventListener("keydown", (event) => {
        if(event.code === "Space"){
            const currentSection = getVisibleSection();

            if (currentSection.classList.contains("timer") && remainingTime > 0) {
                event.preventDefault();
                togglePause();
            }
        }
    })

    DOM.backBtn.addEventListener("click", () => {
        console.log(appState.isTimerRunning);
        if(appState.isTimerRunning){
            togglePause();
        }
    })

    DOM.resetBtn.addEventListener("click", () => {
        if(DOM.resetBtn.classList.contains('fa-stop')){
            endTimer(DOM.countdownField, DOM.progressBar, DOM.resetBtn);
            appState.isTimerRunning = false;
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