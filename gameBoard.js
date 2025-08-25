function gameBoard(){
    const matrix = Array.from({ length: 10}, () => Array(10).fill(0));

    function placeShip(ship, [y,x], direction){
        const spots = findSpots([y,x], ship, direction);
        if(matrix[y][x] !== 1){
            matrix[y][x] = 1;
        };
    }
    return {matrix, placeShip};
}
const gameBoard1 = gameBoard();
gameBoard1.placeShip("destroyer", [0,0]);
gameBoard1.placeShip("destroyer", [0,3])

//console.log(gameBoard1.matrix)

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

function findSpots([y,x], ship, direction){
    let length = 4;
    const verticalArray = []
    const horizontalArray = []
    for(let i = 1; i <= length; i++){
        verticalArray.push([y - i, x]);
        horizontalArray.push([y, x + i])
    }
    if(direction === "vertical") return verticalArray;
    else return horizontalArray;
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
    const filteredArray = arrayOfFields.filter(arrEl => {
        if(arrEl[0] > 10 || arrEl[0] < 0) return false;
        if(arrEl[1] > 10 || arrEl[1] < 0) return false;
        return true;
    })
    return filteredArray
}

const arr = findSpots([5,0], "destroyer", "vertical") 
console.log(findNeighbours(arr));
