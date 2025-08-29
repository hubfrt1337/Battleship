import { factoryShip } from "./battleship";
import { gameBoard } from "./gameBoard";
describe("tests for gameBoard factory", () => {
    let destroyer;
    let submarine;
    let gameBoard1;
    beforeEach(() => {
        destroyer = factoryShip(2);
        submarine = factoryShip(3);
        gameBoard1 = gameBoard();
    })

    test("Place destroyer at [0,0] and [1,0] coordinates", () => {
        gameBoard1.placeShip([1,0], destroyer, "vertical");
        expect(gameBoard1.matrix[0][0][0]).toBe(1)
        expect(gameBoard1.matrix[1][0][0]).toBe(1)
    })
    test("Can't place a ship near to the other ship", () =>{
        gameBoard1.placeShip([0,5], submarine, "horizontal")
        expect(gameBoard1.placeShip([0,8], destroyer, "horizontal")).toBeFalsy();
    })
    test("Change spot value to -2 if missed a shot", () => {
        gameBoard1.placeShip([0,0], destroyer, "horizontal")
        expect(gameBoard1.receiveAttack([5,5])).toBe(-2)
    })
    test("Change spot value to -1 if hitted a ship", () => {
        gameBoard1.placeShip([0,0], destroyer, "horizontal")
        expect(gameBoard1.receiveAttack([0,0])).toBe(-1);
    })
    test("Cant hit the same spot twice", () => {
        gameBoard1.placeShip([0,0], submarine, "horizontal");
        gameBoard1.receiveAttack([0,0])
        expect(gameBoard1.receiveAttack([0,0])).toBe("Hit again");
    })
    test("Report when all ships are sunk should return true", () => {
        expect(gameBoard1.areAllSunk()).toBeTruthy();
    })
    test("Expect isSunk method to return true if the ship is sunk", () => {
        destroyer.hit();
        destroyer.hit()
        expect(destroyer.isSunk()).toBeTruthy();
    })
    test("Ship value should be 1 if only one ship is placed on the board", () => {
        gameBoard1.placeShip([0,0], destroyer, "horizontal");
        console.log(destroyer)
        //console.log(gameBoard1.ships, "statki")
        expect(gameBoard1.ships).toBe(1)
    })
    test("returns false if all ships aren't sunk", () => {
        gameBoard1.placeShip([0,0], destroyer, "horizontal")
        expect(gameBoard1.areAllSunk()).toBeFalsy();
    })
})
