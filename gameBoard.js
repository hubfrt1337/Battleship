import { factoryShip } from "./battleship.js";
import { findSpots } from "./findSpots.js";
import { findNeighbours } from "./neighboursFields.js";
import { checkFields } from "./checkFields.js";
import { dotAllNeighbours } from "./actions.js";
export function gameBoard(type){
    let matrix = Array.from({ length: 10}, () => Array(10).fill(0));
    // set gameboard with 0 ships placed
    let ships = 0;
    function placeShip([y,x], ship, direction){
        // returns array of coordinates if ship is inside the board or false if ship is out of the board
        const spots = findSpots([y,x], ship, direction);
        // it returns array of the ship coordinates and all of it neighbours
        let neighbours = findNeighbours(spots);
        // it checks if all fields are empty and returns true or false. if are not empty return false because ship cannot be placed there
        const result = checkFields(neighbours,matrix);
        // if result is true change matrix values to [1, ship] where 1 means occupied by a ship and ship is the ship object
        if(result){
            spots.forEach(([y,x]) => {
                matrix[y][x] = [1, ship]
                // if ship is placed set lanuching to true
                ship.launching = true;
            })
            // if ship is placed increase ships counter by 1
            ships++;
            return spots;
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
        if(coords === -2 || coords[0] === -1){
            return false;
        }
        // if field is occupied by a ship
        if(coords[0] === 1){
            matrix[y][x][1].hit();
            matrix[y][x][1].coords.push([y,x]);
            console.log(matrix[y][x][1])
            if(matrix[y][x][1].isSunk()){
                ships--;
                dotAllNeighbours(matrix[y][x][1].coords, this.type, this);
            }
            return matrix[y][x][0] = -1;
        }
    }
    function areAllSunk(){
        if(!ships) return true;
    }
    function clearMatrix(){
        this.matrix = Array.from({ length: 10}, () => Array(10).fill(0));
    }
    return {matrix, placeShip, receiveAttack, areAllSunk, get ships(){return ships}, type, clearMatrix};
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





