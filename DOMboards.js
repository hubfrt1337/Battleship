const playerBoard = document.querySelector(".js-player-board");
const pcBoard = document.querySelector(".js-pc-board");

  function createDiv(name) {
    const boardDiv = document.createElement("div");

    boardDiv.className = name;
    boardDiv.innerText = "X";

    return boardDiv;
  }

 export function showPlayerDivs(board) {
    for (let i = 0; i < board.length ; i++) {
      for(let j = 0; j < board[i].length; j++){
        console.log(board[i][j], typeof board[i])
            playerBoard.appendChild(createDiv("field"));
      }
    }
  }
  export function showPcDivs(board) {
    for (let i = 0; i < board.length ; i++) {
      for(let j = 0; j < board[i].length; j++){
        console.log(board[i][j], typeof board[i])
            pcBoard.appendChild(createDiv("pc-field"));
      }
    }
  }
