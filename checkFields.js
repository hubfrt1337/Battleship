// Checks whether neighboring fields are unoccupied by other ships.
// Returns true if all are free, false if any are occupied.

export function checkFields(array, matrix){
    if(!Array.isArray(array)) return false;
    return array.every(coords => {
        if(matrix[coords[0]][coords[1]] === 0){
            return true
        }
        return false;
    })
}