export function factoryShip(length){
    let launching = false;
    let hitted = 0;
    let sunk = false;
    function hit() {
        if(hitted < length) {
            hitted++;
        }    
    }
    function isSunk() {
        if(hitted === length){
            return sunk = true;
        }
    }
    return {length,hitted,sunk, hit, isSunk, launching}
}