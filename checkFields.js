// Checks whether neighboring fields are unoccupied by other ships.
// Returns true if all are free, false if any are occupied.

export function checkFields(array, matrix){
    return array.every(coords => {
        if(matrix[coords[0]][coords[1]] === 0){
            return true
        }
        console.log(coords, "zajęte koordy");
        return false;
    })
}