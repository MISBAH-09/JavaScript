let isAutoPlaying = false;
let intervalID;
let score=JSON.parse(localStorage.getItem('score'))||{
    wins:0,
    losses:0,
    ties:0
};
updatescoreelement();

document.querySelector('.js-result').innerHTML=result;

// let isAutoPlaying=true;
// let intervalID;

function autoplay(){
    if(!isAutoPlaying){
        intervalID=setInterval(function(){
            const playerMove=pickComputerMove();
            playGame(playerMove);
        },1000);
        isAutoPlaying=true;
        document.querySelector('.auto-button').innerHTML="Stop";
    }else{
        clearInterval(intervalID);
        isAutoPlaying=false;
        document.querySelector('.auto-button').innerHTML="Auto Play";
    }
   


}


// function autoplay() {
//   if (!isAutoPlaying) {
//     intervalID = setInterval(function () {
//       const moves = ['rock', 'paper', 'scissors'];
//       const randomIndex = Math.floor(Math.random() * moves.length);
//       const playerMove = moves[randomIndex];
//       playGame(playerMove);
//     }, 1000);
//     isAutoPlaying = true;
//   } else {
//     clearInterval(intervalID);
//     isAutoPlaying = false;
//   }
// }





function playGame(playerMove) {
const ComputerMove = pickComputerMove();

let result = "";

if (playerMove === 'scissors') {
if (ComputerMove === 'rock') {
    result = "You lose";
} else if (ComputerMove === 'paper') {
    result = "You win";
} else {
    result = "Tie";
}

} else if (playerMove === 'paper') {
if (ComputerMove === 'rock') {
    result = "You win";
} else if (ComputerMove === 'paper') {
    result = "Tie";
} else {
    result = "You lose";
}

} else if (playerMove === 'rock') {
if (ComputerMove === 'rock') {
    result = "Tie";
} else if (ComputerMove === 'paper') {
    result = "You lose";
} else {
    result = "You win";
}
}

if (result==="You win"){
score.wins=score.wins+1;
}else if(result==="You lose"){
score.losses=score.losses+1;
}else if (result==="Tie"){
score.ties=score.ties+1;
}

localStorage.setItem('score',JSON.stringify(score));
updatescoreelement();   
document.querySelector('.js-result').innerHTML=result;
document.querySelector('.js-move').innerHTML=`you <img src="${playerMove}-emoji.png" alt="" class="result-image"> <img src="${ComputerMove}-emoji.png" alt="" class="result-image"> Computer`;

// alert(`You picked ${playerMove}. Computer picked ${ComputerMove}. ${result} '\n Win: ${score.wins}. Lose:${score.losses}. Tie: ${score.ties}`);


}
function updatescoreelement(){
document.querySelector('.js-score').innerHTML= `Win: ${score.wins}. Lose:${score.losses}. Tie: ${score.ties}`; 
}


function pickComputerMove() {
const randomNumber = Math.random();
let ComputerMove = '';

if (randomNumber < 1 / 3) {
ComputerMove = 'rock';
} else if (randomNumber < 2 / 3) {
ComputerMove = 'paper';
} else {
ComputerMove = 'scissors';
}

return ComputerMove;
}

