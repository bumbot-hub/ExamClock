import {endTimer, pauseTimer, resumeTimer, startTimer, remainingTime, getReminderPercentage} from "./timer.js";
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

    DOM.startTimerBtn.addEventListener("click", () => {
        const remindersValue= getReminders();

        document.getElementsByClassName("timer-nav")[0].classList.remove("hidden");

        DOM.componentField.innerHTML = DOM.componentInput.value;
        startTimer(DOM.countdownInput.value, DOM.countdownField, DOM.progressBar, remindersValue, DOM.remindersContainer);
        appState.isRunning = true;

        DOM.timerPopup.classList.add("hidden");
        DOM.timerPopup.children[0].classList.add("hidden");

        remindersValue.forEach((min, index) => {
            if (min > 0) {
                const percent = getReminderPercentage(min);
                const marker = index === 0 ? DOM.firstReminder : DOM.secondReminder;

                if (marker) {
                    marker.style.left = `${percent}%`;
                    marker.classList.remove("hidden");
                }
            }
        });
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
        }else if(DOM.resetBtn.classList.contains('fa-arrow-rotate-right')){
            DOM.timerBtn.click();                       // Simulating clicking on timer button for popup to show
        }
    });

    DOM.okBtn.addEventListener("click", () => {
        DOM.timerPopup.classList.add("hidden");
        DOM.timerPopup.children[1].classList.add("hidden");
    });
}

function getReminders(){
    return [Number.parseInt(document.getElementsByName('1st-reminder')[0].value, 10), Number.parseInt(document.getElementsByName('2nd-reminder')[0].value, 10)]
}