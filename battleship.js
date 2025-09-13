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
    function resetShip(){
        launching = false;
        hitted = 0;
        coords = [];
        sunk = false;
    }
    return {length,
        get hitted() {return hitted},
        set hitted (val) {return hitted = val},
        get sunk() {return sunk},
        hit, 
        isSunk, 
        get launching() {return launching},
        set launching(val) {launching = val},
        get coords(){return coords},
        set coords(val){return coords = val},
         resetShip};
}