export function startTimer(countdown, HTML){
    let totalTime = countdown.slice(0,2)*60*60 + countdown.slice(3,5)*60 + countdown.slice(6,8);

    const intervalId = setInterval(() => {
        if(totalTime <= 0){
            clearInterval(intervalId);
        }else{
            let h = Math.floor(totalTime / 3600);
            let min = Math.floor((totalTime % 3600) / 60);
            let s = totalTime % 60;

            h = h.toString().padStart(2, '0');
            min = min.toString().padStart(2, '0');
            s = s.toString().padStart(2, '0');

            HTML.innerHTML = `${h}:${min}:${s}`;
            totalTime --;
        }
    }, 1000);
}

export function stopTimer(){}