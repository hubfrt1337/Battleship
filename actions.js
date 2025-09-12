import { state, direction, loopClass, glowRedIfNoSpots, handlePickEvent, handleChangeEvent, player1, playerPc, carrier, battleship, cruiser, submarine, destroyer, startPlayerEvents, startPcEvents} from "./gameplay.js";
import { findNeighbours, deleteShipFieldsFromNeighbours } from "./neighboursFields.js";
import { findSpots } from "./findSpots.js";
import { computerBoardGenerator, carrierPc, battleshipPc, cruiserPc, submarinePc, destroyerPc } from "./computerBoardGenerator.js";
import { showPcDivs, showPlayerDivs } from "./DOMboards.js";
import { player } from "./player.js";
const random = document.querySelector(".random");
const info = document.querySelector(".announcement")

// It updates the board based on the coordinates given and returns if it was a hit or a miss;
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
    console.log(coords)
    console.log(board)
    board.receiveAttack(coords);
    // result is x or · depends by if it was hitted or missed
    const result = updateBoards(board.matrix, coords);
    // it updates the player's board on the DOM, select players fields because computer is attacking player
    const span = document.createElement("span");
    span.className = result === "x" ? "hit" : "miss";
    span.innerText = result;
    const playerFields = document.querySelectorAll(".field");
    playerFields.forEach(field => {
        if(field.dataset.value === JSON.stringify(coords)){
            field.appendChild(span)
        };
    });
    endGame(board);
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
let computerArrayOfMoves = [];

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

export function endGame(board){
    if(board.areAllSunk()){
        displayInfo(board)
        state.canClick = false;
        computerArrayOfMoves = [];
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
        context.receiveAttack(el)
        const field = document.querySelector(`div.${type}[data-value='${JSON.stringify(el)}']`);
        if(!field) return;
        const span = document.createElement("span")
        span.classList.add("miss")
        span.textContent = "·";
        field.textContent = "";
        field.appendChild(span)
    });
}
export function pickShip(ship){
    const ships = document.querySelectorAll(".ship");
    ships.forEach(s => s.classList.remove("picked"));
    ship.classList.add("picked");
}

// it glows the fields where player is trying to place a ship by mouseOn 
export function glowTheField(coords, currentShip, direction, target){
    const spots = findSpots(coords, currentShip, direction)
     if(!spots){
        const array = glowRedIfNoSpots(coords, currentShip, direction);
        loopClass(coords, array, "red")
        return;
    }
    for(let i = 0; i < spots.length; i++){
        const field = document.querySelector(`.field[data-value="${JSON.stringify(spots[i])}"]`);
        field.style.backgroundColor = "navy";
    }
     target.style.backgroundColor = "navy";
}

// it clear's glow made by player mouse event when player is trying to place ship
export function clearGlow(coords, currentShip, direction, target){
    const spots = findSpots(coords, currentShip, direction);
    if(!spots) {
        const array = glowRedIfNoSpots(coords, currentShip, direction);
        loopClass(coords, array, "clear")
        return;
    }
    for(let i = 0; i < spots.length; i++){
        const field = document.querySelector(`.field[data-value="${JSON.stringify(spots[i])}"]`);
        field.style.backgroundColor = "";
    }
}

// it generates random placement of ships for player board
export function addListener(board, carrier, battleship, cruiser, submarine, destroyer){
    random.addEventListener("click", () => {
        const array = computerBoardGenerator(board, carrier, battleship, cruiser, submarine, destroyer);
        showShipsOnPlayerBoard(array)
        const ships = document.querySelectorAll(".ship")
        state.canPlay = true;
        ships.forEach(ship => {
            ship.classList.add("used");
            ship.removeEventListener("click", handlePickEvent)
        })
    })
}

function showShipsOnPlayerBoard(array){
    array.forEach(([y,x]) => {
        const field = document.querySelector(`.field[data-value="${JSON.stringify([y,x])}"]`)
        field.classList.add("shipPlaced")
    })
}

// display info about end of the game also add event lister to play button which resets all game
function displayInfo(board){
    info.style.zIndex = "5"
    info.style.opacity = "1"
    const btn = document.createElement("button")
    btn.classList.add("btn-play")
    btn.textContent = "Play again"
    if(board.type == "pc"){
        info.textContent = "Game Over, You Won!"
        info.appendChild(btn)
    } else {
        info.textContent =  `Game Over, Try Again!`
        btn.textContent = "Play"
        info.appendChild(btn)
    }
    btn.addEventListener("click", () => {
        resetGame()
        console.log("oki")
        info.style.opacity = "0";
        setTimeout(() => {
            info.style.zIndex = "-2"
        }, 1000)
    })
}


function resetGame(){
    const ships = document.querySelectorAll(".ship")
    const carrier = document.querySelector(".carrier")
    ships.forEach(ship => {
        ship.classList.remove("picked", "used")
        ship.addEventListener("click", handlePickEvent)
    })
    carrier.classList.add("picked")
    playerPc.board.clearMatrix();
    player1.board.clearMatrix();
    resetShips();
    const arr = computerBoardGenerator(playerPc.board, carrierPc, 
    battleshipPc, cruiserPc, submarinePc, destroyerPc)
    console.log(arr)
    console.log(playerPc.board.matrix)
    showPcDivs(playerPc.board.matrix)
    showPlayerDivs(player1.board.matrix)
    state.canClick = true;
    const fields = document.querySelectorAll(".field")
    const pcFields = document.querySelectorAll(".pc-field")
    pushMoves();
    startPlayerEvents(fields);
    startPcEvents(pcFields)
}

function resetShips(){
    carrierPc.resetShip();
    battleshipPc.resetShip();
    cruiserPc.resetShip();
    submarinePc.resetShip();
    destroyerPc.resetShip();
    
    carrier.resetShip();
    battleship.resetShip();
    cruiser.resetShip();
    submarine.resetShip();
    destroyer.resetShip();
}