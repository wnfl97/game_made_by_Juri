'use strict';

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__start');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const popUp = document.querySelector('.pop-up');
const popUpRefresh = document.querySelector('.pop-up__refresh');
const popUpText = document.querySelector('.pop-up__msg');


const CARROT_SIZE = 80;
const carrot_count = 5;
const bug_count = 5;
const GAME_DURATION_SEC = 5;

function initGame(){
    field.innerHTML = '';
//  console.log(fieldRect);
 addItem('carrot', carrot_count, 'img/carrot.png');
 addItem('bug', bug_count, 'img/bug.png');
}

function addItem(className, count, imgPath){
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width-CARROT_SIZE;
    const y2 = fieldRect.height-CARROT_SIZE;
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
    return Math.random() * (max - min) + min;
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
    stopGameTimer();
    hideGameBtn();
    showPopUp('REPLAY❓');
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

function startGameTimer(){
    let remainingTimeSec = GAME_DURATION_SEC; //5
    updateTimerText(remainingTimeSec);
    timer = setInterval(()=>{
            if(remainingTimeSec<=0){
            clearInterval(timer);
           popUp.style.display = 'flex';
            return;
        }
        updateTimerText(--remainingTimeSec);
    },1000);
}

function updateTimerText(time){
    const minutes = Math.floor(time / 60);
    //floor->소수점이 나오면 정수로 만들어주는 함수
    const seconds = time % 60 ;
    gameTimer.innerHTML = `${minutes}:${seconds}`;
}

function stopGameTimer(){
    clearInterval(timer);
}

function hideGameBtn(){
    gameBtn.style.visibility = 'hidden';
}

function showPopUp(text){
    popUpText.innerHTML = text;
    popUp.classList.remove('pop-up--hide');
}

popUpRefresh.addEventListener('click',()=>{
    replayGame();
    popUp.style.display = 'none';
    gameBtn.innerHTML = `<i class="fas fa-play"></i>`;
});







// function paddedFormat(num){
//     return num<10 ? '0' + num : num;
// }

// window.onload = function(){
//     let time_min = 0;
//     let time_sec = 5;
//     let duration = time_min *60 + time_sec;

//     const element = document.querySelector('.game__timer');
//     element.innerHTML = `${paddedFormat(time_min)}:${paddedFormat(time_sec)}`;

//     startGameTimer(duration--, element);
    
// };


