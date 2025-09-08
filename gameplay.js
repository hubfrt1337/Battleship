import { factoryShip } from "./battleship.js";
import { computerBoardGenerator } from "./computerBoardGenerator.js";
import { player } from "./player.js";
import { showPcDivs, showPlayerDivs, carrierBox } from "./DOMboards.js";
import { updateBoards, switchTurn, computerMove, endGame, pickShip, glowTheField, clearGlow} from "./actions.js";
import { findSpots } from "./findSpots.js";


export const carrier = factoryShip(5)
export const battleship = factoryShip(4)
export const cruiser = factoryShip(3)
export const submarine = factoryShip(3)
export const destroyer = factoryShip(2)
const player1 = player();
player1.board.type = "player";
const playerPc = player();
playerPc.board.type = "pc";
computerBoardGenerator(playerPc.board);
showPlayerDivs(player1.board.matrix);
showPcDivs(playerPc.board.matrix);
console.log(player1.board.matrix)
console.log(playerPc.board.matrix)

export let currentShip = carrier;
export let direction = "horizontal";
const fields = document.querySelectorAll(".field");
const pcFields = document.querySelectorAll(".pc-field");
fields.forEach(field => {
  field.addEventListener("click", (e) => { 
    const coords = JSON.parse(e.target.dataset.value);
    console.log(e.target, coords)
    if(currentShip.launching === false) {
      if(player1.board.placeShip(coords, currentShip, direction)){
        const spots = findSpots(coords, currentShip, direction);
        spots.forEach(([y,x]) => {
          const field = document.querySelector(`.field[data-value='${JSON.stringify([y,x])}']`);
          field.classList.add("shipPlaced")
        });
       // e.target.style.backgroundColor = "";
        currentShip.launching = true;
        console.log(currentShip)
      }
    } else {
        e.target.style.backgroundColor = "red";
        setTimeout(() => {
          e.target.style.backgroundColor = "";
        }, 500);
    }
  })
})  


const playerBoard = document.querySelector(".js-player-board");
playerBoard.addEventListener("mouseover", (e) => {
  if(!e.target.classList.contains("field")) return;
  const coords = JSON.parse(e.target.dataset.value);
  glowTheField(coords, currentShip, direction, e.target);
})
playerBoard.addEventListener("mouseout", (e) => {
  if(!e.target.classList.contains("field")) return;
  e.target.style.backgroundColor = "";
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
    console.log(player1.board.ships, "player board ships")
    console.log(playerPc.board.ships, "pc board ships")

    // if game is not over switch turn based on result
    // if result is x keep the turn to the player
    if(switchTurn("playerTurn", result) === "playerTurn"){
      console.log("Player's turn");
      return;
    }
    // pc turns on the bottom
    // pc turns on the bottom
    // if result is · switch to pc turn and make a move after 1 second
    if(switchTurn("playerTurn", result) === "pcTurn"){
      state.canClick = false;
      console.log("PC's turn");
      setTimeout(() => {
        computerMove(player1.board);
      },1000);
    };
  });
});
  document.querySelectorAll(".ship").forEach(ship => {
    ship.addEventListener("click", (e) => {
      pickShip(ship);
      currentShip = shipNameToShipObject(ship.dataset.name);
    });
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