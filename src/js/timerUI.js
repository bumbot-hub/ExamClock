import {endTimer, pauseTimer, resumeTimer, startTimer} from "./timer";
import {toggleClasses} from "./utils";

export function setupTimerEvents(DOM, appState){
    DOM.startTimerBtn.addEventListener("click", () => {
        toggleClasses(DOM.resetBtn, 'fa-arrow-rotate-right', 'fa-stop')
        document.getElementsByClassName("timer-nav")[0].classList.remove("hidden");

        DOM.componentField.innerHTML += DOM.componentInput.value;
        startTimer(DOM.countdownInput, DOM.countdownField, DOM.progressBar);

        DOM.timerPopup.classList.add("hidden");
        DOM.timerPopup.children[0].classList.add("hidden");
        appState.isRunning = true;
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

    DOM.reset.addEventListener("click", () => {
        endTimer(DOM.countdownField, DOM.progressBar, DOM.reset);
    });

    DOM.okBtn.addEventListener("click", () => {
        DOM.timerPopup.classList.add("hidden");
        DOM.timerPopup.children[1].classList.add("hidden");
    });
}