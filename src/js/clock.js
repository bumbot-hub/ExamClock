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

function clockSync(hourMode){
    now = new Date();
    let hours = now.getHours();
    const minutes= now.getMinutes().toString().padStart(2, '0');
    const seconds= now.getSeconds().toString().padStart(2, '0');
    let amPmIndicator;
    if(hourMode === 12 && hours>12){
        amPmIndicator = 'pm';
        hours -= 12;
    }else if(hourMode === 12){
        amPmIndicator = 'am';
    }else {
        amPmIndicator = '';
    }

    hours = hours.toString().padStart(2, '0');
    time.innerHTML = `${hours}:${minutes}:${seconds} ${amPmIndicator}`;
}

export function startClock(hourMode){
    if(intervalId) clearInterval(intervalId);
    clockSync(hourMode);
    intervalId = setInterval(clockSync, 1000, hourMode);
}

export function stopClock(){
    if(intervalId){
        clearInterval(intervalId);
        intervalId = null;
    }
}