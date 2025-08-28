import { factoryShip } from "./battleship.js";
import { gameBoard } from "./gameBoard.js";

const carrier = factoryShip(5)
const battleship = factoryShip(4)
const cruiser = factoryShip(3)
const submarine = factoryShip(3)
const destroyer = factoryShip(2)

const gameBoard1 = gameBoard();
gameBoard1.placeShip([4, 9], battleship, "vertical");
gameBoard1.placeShip([9,9], destroyer, "vertical")
console.log(gameBoard1.matrix)