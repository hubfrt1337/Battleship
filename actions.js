export function updateBoards(matrix, coords){
    let number = matrix[coords[0]][coords[1]];
    if(Array.isArray(number)){
        number = matrix[coords[0]][coords[1]][0]
        console.log(number);
    }
    if(number === -2){
        return "·";
    }
    if(number === -1){
        return "x";
    }
}