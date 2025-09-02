import { factoryShip } from "./battleship.js";
import { gameBoard } from "./gameBoard.js";
import { computerBoardGenerator } from "./computerBoardGenerator.js";
import { player } from "./player.js";
import { showPcDivs, showPlayerDivs } from "./DOMboards.js";
import { updateBoards, switchTurn, computerMove } from "./actions.js";


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


const fields = document.querySelectorAll(".field");
const pcFields = document.querySelectorAll(".pc-field");
fields.forEach(field => {
  field.addEventListener("click", (e) => { console.log(e.target) })
})  
// Add event listener to pc fields so player can interact with them
// canClick flag to prevent multiple clicks while it is pc turn
export const state = {
  canClick: true,
};

pcFields.forEach(field => {
  field.addEventListener("click", (e) => { 
    if(!state.canClick) return;
    const coords = JSON.parse(e.target.dataset.value);
    if(!playerPc.board.receiveAttack(coords)){
      console.log("You already clicked this field");
        return;
    } 

    const result = updateBoards(playerPc.board.matrix, coords);
    // result is either "x" or "·"
    e.target.innerText = result;
    // if result is x keep the turn to the player
    if(switchTurn("playerTurn", result) === "playerTurn"){
      console.log("Player's turn");
      return;
    }
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
  