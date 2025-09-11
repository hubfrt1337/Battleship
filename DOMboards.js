const playerBoard = document.querySelector(".js-player-board");
const pcBoard = document.querySelector(".js-pc-board");
export const carrierBox = document.querySelector(".carrier");
const battleshipBox = document.querySelector(".battleship");
const cruiserBox = document.querySelector(".cruiser");
const submarineBox = document.querySelector(".submarine");
const destroyerBox = document.querySelector(".destroyer");
const field = document.querySelector(".field");

  function createDiv(name) {
    const boardDiv = document.createElement("div");

    boardDiv.className = name;
    boardDiv.innerText = "";

    return boardDiv;
  }

 export function showPlayerDivs(board) {
    playerBoard.innerHTML = ``;
    for (let i = 0; i < board.length ; i++) {
      for(let j = 0; j < board[i].length; j++){
            const boardDiv = createDiv("field");
            boardDiv.dataset.value = `[${i},${j}]`;
            playerBoard.appendChild(boardDiv);
      }
    }
  }
  export function showPcDivs(board) {
    pcBoard.innerHTML = ``;
    for (let i = 0; i < board.length ; i++) {
      for(let j = 0; j < board[i].length; j++){
            const boardDiv = createDiv("pc-field");
            boardDiv.dataset.value = `[${i},${j}]`;
            pcBoard.appendChild(boardDiv);
      }
    }
  }




