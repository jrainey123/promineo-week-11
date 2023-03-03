/* Week 11 Coding Assignment
Create a game of Tic-Tac-Toe
[x] Using any of the tools you’ve worked with so far, create a game of Tic-Tac-Toe.
[x] Create a Tic-Tac-Toe game grid using your HTML element of choice. 
[x] When a cell in the grid is clicked, an X or O should appear in that spot depending on whose turn it is.
[x] A heading should say whether it is X’s or O’s turn and change with each move made.
[x] A button should be available to clear the grid and restart the game.
[x] When a player has won, or the board is full and the game results in a draw, a Bootstrap alert or similar Bootstrap component should appear across the screen announcing the winner. */

const cells = document.querySelectorAll(".cell");
const playerX="X";
const playerO="O";
let turn=playerX;

$(document).ready(function(){
    $("button").click(function(){
    $("#rules-text").fadeToggle("slow");
  });
});

const boardState=Array(cells.length);
boardState.fill(null);


const strike=document.getElementById('strike');
const gameOverArea=document.getElementById("game-over-area");
const gameOverText=document.getElementById("game-over-text");
const playAgain=document.getElementById("play-again");
playAgain.addEventListener("click", startNewGame);

cells.forEach((cell) => cell.addEventListener("click", cellClick)); 

function setHoverText(){
   cells.forEach((cell) => {
    cell.classList.remove("x-hover");
    cell.classList.remove("o-hover");
   }); 

const hoverClass = `${turn.toLowerCase()}-hover`;

cells.forEach((cell) => {
    if(cell.innerText == "") {
        cell.classList.add(hoverClass);
    }
});
}

setHoverText();

function cellClick(event){
    if(gameOverArea.classList.contains("visible")){
        return;  //if the gameOverArea is visible then the game is over and the turns end.
    }

const cell = event.target;
const cellNumber = cell.dataset.index;
if (cell.innerText != ""){
   return;
}

if (turn === playerX){
    cell.innerText=playerX;
    boardState[cellNumber - 1] = playerX;
    turn=playerO;
}
else{
    cell.innerText=playerO;
    boardState[cellNumber - 1] = playerO;
    turn=playerX;   
}
setHoverText();
checkWinner();
}

function checkWinner(){
    //check for a winner
   for(const winningCombination of winningCombinations) {
     const {combo, strikeClass} = winningCombination;
     const cellValue1=boardState[combo[0] - 1];
     const cellValue2=boardState[combo[1] - 1];
     const cellValue3=boardState[combo[2] - 1];

     if(cellValue1 != null && cellValue1 === cellValue2 && cellValue1 === cellValue3) {
        strike.classList.add(strikeClass);
        gameOverScreen(cellValue1);
        return;
    }
   }
   //check for a draw
   const allCellFilledIn = boardState.every((cell) => cell !==null);
   if(allCellFilledIn){
    gameOverScreen(null);
   }
}

function gameOverScreen(winnerText){
    let text="Draw!";
    if(winnerText != null){
        text=`Winner is ${winnerText}!`;
    }
    gameOverArea.className="visible";
    gameOverText.innerText=text;
}

function startNewGame(){
    strike.className="strike";
    gameOverArea.className="hidden";
    boardState.fill(null);
    cells.forEach((cell) => (cell.innerText=""));
    turn=playerX;
    setHoverText();
}

const winningCombinations = [
{combo:[1,2,3], strikeClass: "strike-row-1"},
{combo:[4,5,6], strikeClass: "strike-row-2"},
{combo:[7,8,9], strikeClass: "strike-row-3"},
{combo:[1,4,7], strikeClass: "strike-column-1"},
{combo:[2,5,8], strikeClass: "strike-column-2"},
{combo:[3,6,9], strikeClass: "strike-column-3"},
{combo:[1,5,9], strikeClass: "strike-diagonal-1"},
{combo:[3,5,7], strikeClass: "strike-diagonal-2"},
];

 