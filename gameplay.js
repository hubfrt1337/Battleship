import { factoryShip } from "./battleship.js";
import { computerBoardGenerator, carrierPc , battleshipPc, cruiserPc, destroyerPc, submarinePc } from "./computerBoardGenerator.js";
import { player } from "./player.js";
import { showPcDivs, showPlayerDivs, carrierBox } from "./DOMboards.js";
import { updateBoards, switchTurn, computerMove, endGame, pickShip, glowTheField, clearGlow, addListener} from "./actions.js";
import { findSpots } from "./findSpots.js";


const carrier = factoryShip(5)
const battleship = factoryShip(4)
const cruiser = factoryShip(3)
const submarine = factoryShip(3)
const destroyer = factoryShip(2)
const player1 = player();
player1.board.type = "player";
const playerPc = player();
playerPc.board.type = "pc";
computerBoardGenerator(playerPc.board, carrierPc, battleshipPc, cruiserPc, submarinePc, destroyerPc);
showPlayerDivs(player1.board.matrix);
showPcDivs(playerPc.board.matrix);


 let currentShip = carrier;
 let direction = "horizontal";
const fields = document.querySelectorAll(".field");
const pcFields = document.querySelectorAll(".pc-field");
// click event on player board
fields.forEach(field => {
  field.addEventListener("click", (e) => { 
    const coords = JSON.parse(e.target.dataset.value);
    // if ship is not launched check if it is possible to place it on specific coordinates and place it
    if(currentShip.launching === false) {
      if(player1.board.placeShip(coords, currentShip, direction)){
        const spots = findSpots(coords, currentShip, direction);
        loopClass(coords, spots, "add")
        const currentShipBox = document.querySelector(".ship.picked");
        currentShipBox.classList.remove("picked")
        currentShipBox.classList.add("used")
        currentShipBox.removeEventListener("click", handlePickEvent)
      } // if the ship can't be placed make the fields red for 0.5sec
        else {
        const spots = findSpots(coords, currentShip, direction);
        // if ship is not out of board use this
        if(spots){
          loopClass(coords, spots, "red")
          setTimeout(() => {
            loopClass(coords, spots, "clear")
          }, 500);
        } // if the ship will be out ouf board use special method to display fields red color 
        else {
          const array = glowRedIfNoSpots(coords, currentShip, direction)
          loopClass(coords, array, "red")
            setTimeout(() => {
            loopClass(coords, array, "clear")
          }, 500);
        }
      }
    }
    // jesli statek bedzie postawiony po prostu musze wyłaczyc go to na dole niepotrzebne bedzie
    /* else {
        const spots = findSpots(coords, currentShip, direction);
        loopClass(coords, spots, "red")
        setTimeout(() => {
          loopClass(coords, spots, "clear")
        }, 500);
    } */
  })
})  


const playerBoard = document.querySelector(".js-player-board");
playerBoard.addEventListener("mouseover", (e) => {
  if(!e.target.classList.contains("field")) return;
  const coords = JSON.parse(e.target.dataset.value);
  glowTheField(coords, currentShip, direction, e.target);
  if(currentShip.launching ===  true){
    clearGlow(coords, currentShip, direction, e.target)
  }
})
playerBoard.addEventListener("mouseout", (e) => {
  if(!e.target.classList.contains("field")) return;
  const coords = JSON.parse(e.target.dataset.value);
  clearGlow(coords, currentShip, direction, e.target);
});

// Add event listener to pc fields so player can interact with them
// canClick flag to prevent multiple clicks while it is pc turn
export const state = {
  canClick: true,
};
pcFields.forEach(field => {
  field.addEventListener("click", (e) => { 
    // if false user can't click because it is pc turn
    if(!state.canClick) return;
    // get coordinates from data-value attribute convert to array from string
    const coords = JSON.parse(e.target.dataset.value);
    // if attack was on the same field return whole function and do nothing
    if(!playerPc.board.receiveAttack(coords)){
      console.log("You already clicked this field");
        return;
    } 
    
    const result = updateBoards(playerPc.board.matrix, coords);
    // result is either "x" or "·"
    const span = document.createElement("span");
    span.className = result === "x" ? "hit" : "miss";
    span.innerText = result;
    e.target.appendChild(span);
    // display result on the field
    //
    
    // check if game is over after player move
    endGame(playerPc.board) 
    

    // if game is not over switch turn based on result
    // if result is x keep the turn to the player
    if(switchTurn("playerTurn", result) === "playerTurn"){
      return;
    }
    // pc turns on the bottom
    // pc turns on the bottom
    // if result is · switch to pc turn and make a move after 1 second
    if(switchTurn("playerTurn", result) === "pcTurn"){
      state.canClick = false;
      setTimeout(() => {
        computerMove(player1.board);
      },1000);
    };
  });
});
export function handlePickEvent(e){
  const ship = e.currentTarget;
  pickShip(ship)
  currentShip = shipNameToShipObject(ship.dataset.name)
 }
  document.querySelectorAll(".ship").forEach(ship => {
    ship.addEventListener("click", handlePickEvent);
  });

  

// ship fields are interactive to size them based on field size
let field = document.querySelector(".field");
let size = window.getComputedStyle(field)
const shipFields = document.querySelectorAll(".shipField")
  shipFields.forEach(div => {
  div.style.width = size.width;
  div.style.height = size.height;
});
window.addEventListener("resize", () => {
  field = document.querySelector(".field");
  let size = window.getComputedStyle(field)
  shipFields.forEach(div => {
  div.style.width = size.width;
  div.style.height = size.height;
});
  });

  function shipNameToShipObject(name){
    switch(name){
        case "carrier": return currentShip = carrier;
        case "battleship": return currentShip = battleship;
        case "cruiser": return currentShip = cruiser;
        case "submarine": return currentShip = submarine;
        case "destroyer": return currentShip = destroyer;
    }
};

export function loopClass(coords, spots, method){
spots.forEach(([y,x]) => {
    const field = document.querySelector(`.field[data-value='${JSON.stringify([y,x])}']`);
    if(method === "add"){
      field.classList.add("shipPlaced")
    } else if(method === "red"){
      field.style.backgroundColor = "red"
    } else if(method === "clear"){
      field.style.backgroundColor = ""
    }
  });
}

export function glowRedIfNoSpots(coords, ship, direction){
  const array = [coords]
  for(let i = 1; i < ship.length; i ++){
    if(direction === "horizontal"){
      if(coords[1] + i <= 9){
        array.push([coords[0], coords[1] + i])
      }
    } 
    else if(direction === "vertical"){
      if(coords[0] - i >= 0){
        array.push([coords[0] - i, coords[1]])
      }
    }
  }
  return array;
}

addListener(player1.board, carrier, battleship, cruiser, submarine, destroyer)