export function factoryShip(length){
    let launching = false;
    let hitted = 0;
    let coords = [];
    let sunk = false;
    function hit() {
        if(hitted < length) {
            this.hitted++;
        }    
    }
    function isSunk() {
        console.log(this.hitted, length, "isSunk");
        if(this.hitted === length){
            sunk = true;
            return true;
        }
    }
    return {length,hitted,get sunk() {return sunk}, hit, isSunk, launching, coords};
}