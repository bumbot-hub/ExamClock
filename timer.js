let intervalId = null;
let remainingTime = 0;

export function startTimer(countdown, HTML, progress_bar){
    let fullTime = countdown.slice(0,2)*60*60 + countdown.slice(3,5)*60 + countdown.slice(6,8);
    let remainingTime = fullTime;

    if(intervalId) clearInterval(intervalId);

    intervalId = setInterval(() => {
        if(remainingTime <= 0){
            clearInterval(intervalId);
            intervalId = null;
            progress_bar.value = 100;
        }else{
            progress_bar.value = (remainingTime/fullTime)*100;

            let h = Math.floor(remainingTime / 3600);
            let min = Math.floor((remainingTime % 3600) / 60);
            let s = remainingTime % 60;

            h = h.toString().padStart(2, '0');
            min = min.toString().padStart(2, '0');
            s = s.toString().padStart(2, '0');

            HTML.innerHTML = `${h}:${min}:${s}`;
            remainingTime --;
        }
    }, 1000);
}

export function pauseTimer(){
    if(intervalId){
        clearInterval(intervalId);
        intervalId = null;
    }
}

export function resumeTimer(HTML){
    if(!intervalId && remainingTime > 0){
        intervalId = setInterval(() => {
            if(remainingTime <= 0){
                clearInterval(intervalId);
                intervalId = null;
            } else {
                let h = Math.floor(remainingTime / 3600);
                let min = Math.floor((remainingTime % 3600) / 60);
                let s = remainingTime % 60;

                h = h.toString().padStart(2,'0');
                min = min.toString().padStart(2,'0');
                s = s.toString().padStart(2,'0');

                HTML.innerHTML = `${h}:${min}:${s}`;
                remainingTime--;
            }
        }, 1000);
    }
}

export function stopTimer(){
    if(intervalId){
        clearInterval(intervalId);
        intervalId = null;
        remainingTime = 0;
    }
}