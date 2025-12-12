let intervalId = null;
let remainingTime = 0;
let fullTime = 0;

function renderTime(HTML) {
    const h   = Math.floor(remainingTime / 3600);
    const min = Math.floor((remainingTime % 3600) / 60);
    const s   = remainingTime % 60;

    HTML.innerHTML = [
        h.toString().padStart(2, '0'),
        min.toString().padStart(2, '0'),
        s.toString().padStart(2, '0')
    ].join(':');
}

function startInterval(HTML, progress_bar) {
    if (intervalId) clearInterval(intervalId);

    intervalId = setInterval(() => {
        if (remainingTime < 0) {
            clearInterval(intervalId);
            intervalId = null;
            remainingTime = 0;
            progress_bar.value = 100;
            HTML.innerHTML = '00:00:00';
            endTimer();
        } else {
            progress_bar.value = (remainingTime / fullTime) * 100;
            renderTime(HTML);
            remainingTime--;
        }
    }, 1000);
}

export function startTimer(countdown, HTML, progress_bar){
    fullTime =
        parseInt(countdown.slice(0,2), 10) * 3600 +
        parseInt(countdown.slice(3,5), 10) * 60;

    remainingTime = fullTime;
    renderTime(HTML);
    startInterval(HTML, progress_bar);
}

export function pauseTimer(){
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

export function resumeTimer(HTML, progress_bar){
    if (!intervalId && remainingTime > 0) {
        startInterval(HTML, progress_bar);
    }
}

export function stopTimer(){
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
    remainingTime = 0;
}

function endTimer(){

}
