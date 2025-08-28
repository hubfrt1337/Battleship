import { factoryShip } from "./battleship.js";
import { findSpots } from "./findSpots.js";
import { findNeighbours } from "./neighboursFields.js";
import { checkFields } from "./checkFields.js";
export function gameBoard(){
    const matrix = Array.from({ length: 10}, () => Array(10).fill(0));

    function placeShip([y,x], ship, direction){
        const spots = findSpots([y,x], ship, direction);
        let neighbours = findNeighbours(spots);
        const result = checkFields(neighbours,matrix);
        if(result){
            spots.forEach(([y,x]) => {
                matrix[y][x] = 1
            })
        }
        else return false; // some infomartion to user
        //neighbours = deleteShipFieldsFromNeighbours(spots, neighbours)
    }
    function receiveAttack([y,x]){
        const coords = matrix[y][x];
        // if field is empty
        if(coords === 0){
            return matrix[y][x] = -2;
        }
        //if field was hitted before
        if(coords === -2 || coords === -1){
            return "Hit again"
        }
        // if field is occupied by a ship
        if(coords === 1){
            return matrix[y][x] = -1;
        }
    }
    return {matrix, placeShip, receiveAttack};
}

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





