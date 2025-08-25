export function factoryShip(length){
    let hitted = 0;
    let sunk = false;
    function hit() {
        if(hitted < length) {
            hitted++;
        }    
    }
    function isSunk() {
        return hitted === length;
    }
    return {length,hitted,sunk, hit, isSunk}
}