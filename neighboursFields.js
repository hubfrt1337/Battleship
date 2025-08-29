// It identifies the neigbours fields of a ship
// The returned array also includes own ship's fields
export function findNeighbours(array){
    if(!Array.isArray(array)) return false;
    let arrayOfFields = []
    array.forEach(el => {
        arrayOfFields.push([el[0] + 1, el[1] - 1])
        arrayOfFields.push([el[0] + 1, el[1] ])
        arrayOfFields.push([el[0] + 1, el[1] + 1])
        arrayOfFields.push([el[0] - 1, el[1] -1])
        arrayOfFields.push([el[0] - 1, el[1] ])
        arrayOfFields.push([el[0] - 1, el[1] + 1])
        arrayOfFields.push([el[0], el[1] - 1])
        arrayOfFields.push([el[0], el[1] + 1])
    })
    arrayOfFields = Array.from(new Set(arrayOfFields.map(JSON.stringify)),JSON.parse);
    const filteredArray = arrayOfFields.filter(arrEl => arrEl[0] < 10 && arrEl[0] >= 0 && arrEl[1] < 10 && arrEl[1] >= 0)
    return filteredArray;
}

// It removes ship fields from neighbours fields and returns array of it
export function deleteShipFieldsFromNeighbours(arrayShip, arrayNeigh){
    arrayShip = arrayShip.map(el => JSON.stringify(el))
    arrayNeigh = arrayNeigh.map(el => JSON.stringify(el))
    console.log(arrayShip, "stringi")
    while(arrayShip.length !== 0){
        let shifted = arrayShip.shift()
        let index = -1;
        for(let i = 0; i < arrayNeigh.length; i++){
             let index = arrayNeigh.indexOf(shifted);
             if(index) {
                arrayNeigh.splice(index, 1);
                break};
        }
    }
    return arrayNeigh = arrayNeigh.map(el => JSON.parse(el));
}