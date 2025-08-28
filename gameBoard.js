function gameBoard(){
    const matrix = Array.from({ length: 10}, () => Array(10).fill(0));

    function placeShip(ship, [y,x], direction){
       // const spots = findSpots([y,x], ship, direction);
        //const neighbours = findNeighbours(spots);
        if(matrix[y][x] !== 1){
            matrix[y][x] = 1;
        };
    }
    return {matrix, placeShip};
}
const gameBoard1 = gameBoard();
//gameBoard1.placeShip("destroyer", [0,0]);
//gameBoard1.placeShip("destroyer", [0,3])

//console.log(gameBoard1.matrix)


// I am not using this function actually.
function findSpotsToPlaceShip(ship, [y, x]){
    const length = 4; //ship.length
    const array = [];
    for(let i = 1; i <= length; i++){
        array.push([y - i, x]) //top
        array.push([y + i, x]) // bottom
        array.push([y, x - i]) // left
        array.push([y, x + i]) // right
    }   
    const filteredArray = array.filter(arrEl => {
        if(arrEl[0] > 10 || arrEl[0] < 0) return false;
        if(arrEl[1] > 10 || arrEl[1] < 0) return false;
        return true;
    })
    return filteredArray;
    
}

// Calculates if player can place ship at specific coordinates [x,y] takes the ship  as an argument and read its length. Also takes direction which ship will be placed on the board. 
function findSpots([y,x], ship, direction){
    let length = 4;
    const verticalArray = [[y,x]]
    const horizontalArray = [[y,x]]
    for(let i = 1; i < length; i++){
        verticalArray.push([y - i, x]);
        horizontalArray.push([y, x + i]);
    }
    if(direction === "vertical") {
        let outOfBoard = checkIfOutOfBoard(verticalArray)
        if(outOfBoard) return false
        console.log("tu")
        return verticalArray;
    } else {
    let outOfBoard = checkIfOutOfBoard(horizontalArray)
    if(outOfBoard) return false
    console.log(outOfBoard)
    console.log("tu2")
     return horizontalArray;
    }
}

function findNeighbours(array){
    arrayOfFields = []
    array.forEach(el => {
        arrayOfFields.push([el[0] + 1, el[1] - 1])
        arrayOfFields.push([el[0] + 1, el[1] ])
        arrayOfFields.push([el[0] + 1, el[1] + 1])
        arrayOfFields.push([el[0] - 1, el[1] -1])
        arrayOfFields.push([el[0] - 1, el[1] ])
        arrayOfFields.push([el[0] - 1, el[1] + 1])
        arrayOfFields.push([el[0], el[1] - 1])
        arrayOfFields.push([el[0], el[1] + 1])
    })
    arrayOfFields = Array.from(new Set(arrayOfFields.map(JSON.stringify)),JSON.parse);
    const filteredArray = arrayOfFields.filter(arrEl => arrEl[0] < 10 && arrEl[0] >= 0 && arrEl[1] < 10 && arrEl[1] >= 0)
    //.filter(arrEl => arrEl[0] !== array[0] && arrEl[1] !== array[1])
    console.log(filteredArray, "filteredArray")
    return filteredArray;
}

// Check if neighbours fields are occupied by other ship. If yes, 
function checkFields(array, board){
    return array.every(coords => {
        if(board.matrix[coords[0]][coords[1]] === 0){
            return true
        }
        console.log(coords, "zajęte koordy");
        return false;
    })
}

// Calculates if ship will be out of the board
function checkIfOutOfBoard(array){
    return array.some(arrEl => arrEl[0] > 9 || arrEl[0] < 0 || arrEl[1] > 9 || arrEl[1] < 0);
}
const arr = findSpots([4,9], "battleship", "vertical") 
console.log(arr, "Fields of ship to be placed")
const nei = findNeighbours(arr);
console.log(checkFields(nei, gameBoard1), "checkfield funkcja")
console.log(deleteShipFieldsFromNeighbours(arr, nei), "array without ship fields")


//console.log(gameBoard1.matrix)


function deleteShipFieldsFromNeighbours(arrayShip, arrayNeigh){
    arrayShip = arrayShip.map(el => JSON.stringify(el))
    arrayNeigh = arrayNeigh.map(el => JSON.stringify(el))
    console.log(arrayShip, "stringi")
    while(arrayShip.length !== 0){
        let shifted = arrayShip.shift()
        let index = -1;
        for(let i = 0; i < arrayNeigh.length; i++){
             let index = arrayNeigh.indexOf(shifted);
             if(index) {
                arrayNeigh.splice(index, 1);
                break};
        }
    }
    return arrayNeigh = arrayNeigh.map(el => JSON.parse(el));
}
//deleteShipFeildsFromNeighbours(findNeighbours())