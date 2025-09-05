import { factoryShip } from "./battleship.js";
import { gameBoard } from "./gameBoard.js";
import { computerBoardGenerator } from "./computerBoardGenerator.js";
import { player } from "./player.js";
import { showPcDivs, showPlayerDivs } from "./DOMboards.js";
import { updateBoards, switchTurn, computerMove, dotAllNeighbours } from "./actions.js";


const carrier = factoryShip(5)
const battleship = factoryShip(4)
const cruiser = factoryShip(3)
const submarine = factoryShip(3)
const destroyer = factoryShip(2)
const player1 = player();
const playerPc = player();
player1.board.placeShip([9, 1], carrier, "vertical");
player1.board.placeShip([1, 0], battleship, "horizontal");
player1.board.placeShip([3, 0], cruiser, "horizontal");
player1.board.placeShip([7, 9], submarine, "vertical");
player1.board.placeShip([3, 7], destroyer, "horizontal");
computerBoardGenerator(playerPc.board);
showPlayerDivs(player1.board.matrix);
showPcDivs(playerPc.board.matrix);
console.log(player1.board.matrix)
console.log(playerPc.board.matrix)

export const fields = document.querySelectorAll(".field");
export const pcFields = document.querySelectorAll(".pc-field");
fields.forEach(field => {
  field.addEventListener("click", (e) => { console.log(e.target)})
})  
// Add event listener to pc fields so player can interact with them
// canClick flag to prevent multiple clicks while it is pc turn
export const state = {
  canClick: true,
};

pcFields.forEach(field => {
  field.addEventListener("click", (e) => { 
    // if false user can't click because it is pc turn
    if(!state.canClick) return;
    // get coordinates from data-value attribute convert to array from string
    const coords = JSON.parse(e.target.dataset.value);
    // if attack was on the same field return whole function and do nothing
    if(!playerPc.board.receiveAttack(coords)){
      console.log("You already clicked this field");
        return;
    } 
    
    const result = updateBoards(playerPc.board.matrix, coords);
    // result is either "x" or "·"
    e.target.innerText = result;
    // check if game is over after player move
    //if(endGame(playerPc.board)) return;
    console.log(player1.board.ships, "player board ships")
    console.log(playerPc.board.ships, "pc board ships")

    // if game is not over switch turn based on result
    // if result is x keep the turn to the player
    if(switchTurn("playerTurn", result) === "playerTurn"){
      console.log("Player's turn");
      return;
    }
    // pc turns on the bottom
    // pc turns on the bottom
    // if result is · switch to pc turn and make a move after 1 second
    if(switchTurn("playerTurn", result) === "pcTurn"){
      state.canClick = false;
      console.log("PC's turn");
      setTimeout(() => {
        computerMove(player1.board);
      },1000);
    };
  });
});
  
console.log(player1.board.ships, "player ships")