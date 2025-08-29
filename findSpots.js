// Calculates if player can place ship at specific coordinates [x,y] takes the ship  as an argument and read its length. Also takes direction which ship will be placed on the board.

export function findSpots([y,x], ship, direction){
    let length = ship.length;
    const verticalArray = [[y,x]]
    const horizontalArray = [[y,x]]
    for(let i = 1; i < length; i++){
        verticalArray.push([y - i, x]);
        horizontalArray.push([y, x + i]);
    }
    if(direction === "vertical") {
        let outOfBoard = checkIfOutOfBoard(verticalArray)
        if(outOfBoard) return false
        return verticalArray;
    } else {
        let outOfBoard = checkIfOutOfBoard(horizontalArray)
        if(outOfBoard) return false
        return horizontalArray;
    }
}

function checkIfOutOfBoard(array){
    return array.some(arrEl => arrEl[0] > 9 || arrEl[0] < 0 || arrEl[1] > 9 || arrEl[1] < 0);
}