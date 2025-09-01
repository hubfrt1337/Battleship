const playerBoard = document.querySelector(".js-player-board");
const pcBoard = document.querySelector(".js-pc-board");

  function createDiv(name) {
    const boardDiv = document.createElement("div");

    boardDiv.className = name;
    boardDiv.innerText = "0";

    return boardDiv;
  }

 export function showPlayerDivs(board) {
    for (let i = 0; i < board.length ; i++) {
      for(let j = 0; j < board[i].length; j++){
            const boardDiv = createDiv("field");
            boardDiv.dataset.value = `[${i},${j}]`;
            playerBoard.appendChild(boardDiv);
      }
    }
  }
  export function showPcDivs(board) {
    for (let i = 0; i < board.length ; i++) {
      for(let j = 0; j < board[i].length; j++){
            const boardDiv = createDiv("pc-field");
            boardDiv.dataset.value = `[${i},${j}]`;
            pcBoard.appendChild(boardDiv);
      }
    }
  }
