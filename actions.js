// It updates the board based on the coordinates given and returns if it was a hit or a miss;
import { state } from "./gameplay.js";
import { findNeighbours, deleteShipFieldsFromNeighbours } from "./neighboursFields.js";
export function updateBoards(matrix, coords){
    let number = matrix[coords[0]][coords[1]];
        if(Array.isArray(number)){
        number = matrix[coords[0]][coords[1]][0]
    }
    if(number === -2){
        return "·";
    }
    if(number === -1){
        return "x";
    }
}
// It switches functions based on if the ship was hit or missed;
export function switchTurn(currentTurn, result){
    if(currentTurn === "playerTurn"){
        if(result === "x") return "playerTurn";
        if(result === "·") return "pcTurn";
    }
    if(currentTurn === "pcTurn"){
        if(result === "x") return "pcTurn";
        if(result === "·") return "playerTurn";
    }
}
// It makes a random move for the computer and updates the board accordingly
export function computerMove(board){
    const coords = getRandomMove();
    board.receiveAttack(coords);
    // result is x or · depends by if it was hitted or missed
    const result = updateBoards(board.matrix, coords);
    // it updates the player's board on the DOM, select players fields because computer is attacking player
    const playerFields = document.querySelectorAll(".field");
    playerFields.forEach(field => {
        if(field.dataset.value === JSON.stringify(coords)){
            field.innerText = result;
        };
    });
    // if hitted a ship keep the turn to the computer
    if(switchTurn("pcTurn", result) === "pcTurn"){
        setTimeout(() => {
            computerMove(board);
        },1000); 
    }
    // if computer missed switch turn to player
    if(switchTurn("pcTurn", result) === "playerTurn"){
        state.canClick = true;
        return;
    } 
}
// it created and array with all possible moves for the computer;
const computerArrayOfMoves = [];

// this function pushes all possible moves to the array, it is written so moves can be reseted after game is over;
function pushMoves(){
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            computerArrayOfMoves.push([i,j])
        }
    }
}
pushMoves();

// it returns a random move from the array and removes it from the array so it won't be repeated
function getRandomMove(){
    const randomIndex = Math.floor(Math.random() * computerArrayOfMoves.length);
    const move = computerArrayOfMoves[randomIndex];
    computerArrayOfMoves.splice(randomIndex, 1);
    return move;
}

function endGame(board){
    if(board.areAllSunk()){
        alert("Game Over");
        state.canClick = false;
        return true;
    }
    return false;
}
export function dotAllNeighbours(array, type, context){
    if(type === "pc") {
        type = "pc-field"
    }
    if(type === "player") {
        type = "field"
    }
    const shipAndNeighbours = findNeighbours(array);
    console.log(shipAndNeighbours, "shipAndNeighbours");
    const neighboursOnly = deleteShipFieldsFromNeighbours(array, shipAndNeighbours);
    neighboursOnly.forEach( el => {
        console.log(el, "dotAllNeighbours");
        context.receiveAttack(el)
        const field = document.querySelector(`div.${type}[data-value='${JSON.stringify(el)}']`);
        console.log(field, "field");
        if(!field) return;
        field.innerText = "·";
    });
}