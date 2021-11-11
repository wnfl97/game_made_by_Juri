'use strict';

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__start');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const popUp = document.querySelector('.pop-up');
const gameRefresh = document.querySelector('.pop-up__refresh');


const carrot_size = 80;
const carrot_count = 5;
const bug_count = 5;

function initGame(){
    field.innerHTML = '';
 console.log(fieldRect);
 addItem('carrot', carrot_count, 'img/carrot.png');
 addItem('bug', bug_count, 'img/bug.png');
}

function addItem(className, count, imgPath){
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - carrot_size;
    const y2 = fieldRect.height - carrot_size;
    for(let i = 0; i<count; i++){
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1,x2);
        const y = randomNumber(y1,y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min, max){
    return Math.random()*(max-min)+min;
}

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click',()=>{
    if(started){
        stopGame();
    } else{
        startGame();
    }
    started = !started;
});

function stopGame(){

}

function startGame(){
    initGame();
    showTimerNscore();
    showStopBtn();
    startGameTimer();
}

function replayGame(){
    initGame();
    startGameTimer();
}

function showTimerNscore(){
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function showStopBtn(){
    gameBtn.innerHTML =  `<i class="fas fa-stop"></i>`;
}

function paddedFormat(num){
    return num<10 ? '0' + num : num;
}
function startGameTimer(duration, element){
    let secondRemaining = duration;
    let min = 0;
    let sec = 0;
    let timer = setInterval(()=>{
        min = parseInt(secondRemaining / 60);
        sec = parseInt(secondRemaining % 60);
        element.innerHTML = `${paddedFormat(min)}:${paddedFormat(sec)}`;
        secondRemaining = secondRemaining - 1;
        if(secondRemaining<0){
            clearInterval(timer);
            popUp.style.display = 'flex';
        }
    },1000);
}

window.onload = function(){
    let time_min = 0;
    let time_sec = 5;
    let duration = time_min *60 + time_sec;

    const element = document.querySelector('.game__timer');
    element.innerHTML = `${paddedFormat(time_min)}:${paddedFormat(time_sec)}`;

    startGameTimer(duration--, element);
    
};

gameRefresh.addEventListener('click',()=>{
    replayGame();
    popUp.style.display = 'none';
});
