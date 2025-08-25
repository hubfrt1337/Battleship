export function factoryShip(length){
    let hitted = 0;
    let sunk = false;
    function hit() {
        if(this.hitted < this.length) {
            this.hitted++;
        }    
    }
    function isSunk() {
        return this.hitted === this.length;
    }
    return {length,hitted,sunk, hit, isSunk}
}