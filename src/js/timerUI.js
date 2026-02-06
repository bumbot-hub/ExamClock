import {endTimer, pauseTimer, resumeTimer, startTimer, remainingTime} from "./timer.js";
import {toggleClasses} from "./utils.js";

export function setupTimerEvents(DOM, appState){
    DOM.timerBtn.addEventListener("click", () => {
        if(remainingTime === 0){
            DOM.timerPopup.classList.remove("hidden");
            DOM.timerPopup.children[0].classList.remove("hidden");

            DOM.resetBtn.classList.replace(DOM.resetBtn.classList[1], "fa-stop");
            DOM.playPauseBtn.classList.replace(DOM.playPauseBtn.classList[1], "fa-pause");
        }
    });

    const startTimerHandler = () => {
        document.getElementsByClassName("timer-nav")[0].classList.remove("hidden");

        DOM.componentField.innerHTML = DOM.componentInput.value;
        startTimer(DOM.countdownInput.value, DOM.countdownField, DOM.progressBar);

        DOM.timerPopup.classList.add("hidden");
        DOM.timerPopup.children[0].classList.add("hidden");
        appState.isRunning = true;
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
        endTimer(DOM.countdownField, DOM.progressBar, DOM.resetBtn);
    });

    DOM.okBtn.addEventListener("click", () => {
        DOM.timerPopup.classList.add("hidden");
        DOM.timerPopup.children[1].classList.add("hidden");
    });
}