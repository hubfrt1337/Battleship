import { factoryShip } from "./battleship.js";
import { gameBoard } from "./gameBoard.js";
import { computerBoardGenerator } from "./computerBoardGenerator.js";

const carrier = factoryShip(5)
const battleship = factoryShip(4)
const cruiser = factoryShip(3)
const submarine = factoryShip(3)
const destroyer = factoryShip(2)

const gameBoard1 = gameBoard();
const computerBoard = gameBoard();
computerBoardGenerator(computerBoard);
gameBoard1.placeShip([4, 9], battleship, "vertical");
//gameBoard1.placeShip([5,9], destroyer, "vertical")
gameBoard1.placeShip([1,0], destroyer, "vertical")
console.log(gameBoard1.receiveAttack([0,0]))
console.log(gameBoard1.matrix)
console.log(gameBoard1.ships)