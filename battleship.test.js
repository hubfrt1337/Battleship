import { factoryShip } from "./battleship";
describe("Ship factory tests", () => {
    test("Expect length of carrier to be 5",() => {
        const carrier = factoryShip(5)
        expect(carrier.length).toBe(5)
    })
    test("expect hitted to start with value of 0", () => {
        const carrier = factoryShip(5)
        expect(carrier.hitted).toBe(0)
    })
    test("expect the hitted value to change to 2 after one hit", () => {
        const battleship = factoryShip(4);
        battleship.hit()
        battleship.hit()
        expect(battleship.hitted).toBe(2);
    })
    test("expect ship to return true if is sunk", () => {
        const destroyer = factoryShip(2);
        destroyer.hit()
        destroyer.hit()
        expect(destroyer.isSunk()).toBeTruthly();
    })
});