const time = document.getElementById('time');
const date = document.getElementsByClassName('date');

let now = new Date();
let intervalId = null;

const day = now.toLocaleDateString('en-US',{day: '2-digit'});
const month = (now.toLocaleDateString('en-US',{month: 'long'})).toUpperCase();
const year = now.toLocaleDateString('en-US',{year: 'numeric'});

for(let i=0; i<date.length; i++) {
    date[i].innerHTML = day + " " + month + " " + year;
}

function clockSync(){
    now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes= now.getMinutes().toString().padStart(2, '0');
    const seconds= now.getSeconds().toString().padStart(2, '0');
    const clockFormat =`${hours}:${minutes}:${seconds}`;

    time.innerHTML = clockFormat;
}

export function startClock(){
    if(intervalId) clearInterval(intervalId);
    clockSync();
    intervalId = setInterval(clockSync, 1000);
}

export function stopClock(){
    if(intervalId){
        clearInterval(intervalId);
        intervalId = null;
    }
}