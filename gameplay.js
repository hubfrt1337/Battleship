import { factoryShip } from "./battleship.js";
import { gameBoard } from "./gameBoard.js";
import { computerBoardGenerator } from "./computerBoardGenerator.js";
import { player } from "./player.js";
import { showPcDivs, showPlayerDivs } from "./DOMboards.js";


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
//console.log(Array.from(fields));
console.log(fields[0])
pcFields.forEach(field => {
  field.addEventListener("click", (e) => { console.log(e.target) })
}) 
  console.log(pcFields[2])