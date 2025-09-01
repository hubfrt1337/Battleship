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

function computerMove(){
    const coords = getRandomMove();
}

const computerArrayOfMoves = [];
for(let i = 0; i < 10; i++){
    for(let j = 0; j < 10; j++){
        computerArrayOfMoves.push([i,j])
    }
}
function getRandomMove(){
    const randomIndex = Math.floor(Math.random() * computerArrayOfMoves.length);
    const move = computerArrayOfMoves[randomIndex];
    computerArrayOfMoves.splice(randomIndex, 1);
    return move;
}