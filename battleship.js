export function factoryShip(length){
    let hitted = 0;
    let sunk = false;
    function hit() {
        return this.hitted++;
    }
    function isSunk() {
        return 
    }
    return {length,hitted,sunk, hit, isSunk}
}