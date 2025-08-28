import { factoryShip } from "./battleship";
import { gameBoard } from "./gameBoard";
describe("tests for gameBoard factory", () => {
    const destroyer = factoryShip(2)
    const submarine = factoryShip(3)
    const gameBoard = gameBoard()
    test("Place destroyer at [0,0] and [1,0] coordinates", () => {
        gameBoard.placeShip(destroyer, [0,0]);
        gameBoard.placeShip(destroyer, [1,0]);
        expect(gameBoard.matrix[0][0]).toBe(1)
        expect(gameBoard.matrix[1][0]).toBe(1)
    })
    test("Can't place ship further than it's length", () =>{
        gameBoard.placeShip(submarine, [0,5])
        expect(gameBoard.placeShip(submarine, [0,8])).toBeFalsy();
    })
    test("Change spot value to -2 if missed a shot", () =>{
        expect(gameBoard.receiveAttack([5,5])).toBe(-2)
    })
    test("Change spot value to -1 if hitted a ship", () => {
        expect(gameBoard.receiveAttack([0,0])).toBe(-1);
    })
    test("Cant hit the same spot twice", () => {
        expect(gameBoard.receiveAttack([0,0])).toBeFalsy();
    })
    test("Report when all ships are sunk should return true", () => {
        expect(gameBoard.areAllSunk()).toBeTruthy();
    })
})
