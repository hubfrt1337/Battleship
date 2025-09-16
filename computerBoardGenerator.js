import { factoryShip } from "./battleship.js";
export const carrierPc = factoryShip(5);
export const battleshipPc = factoryShip(4)
export const cruiserPc = factoryShip(3);
export const submarinePc = factoryShip(3)
export const destroyerPc = factoryShip(2);
export function computerBoardGenerator(board, carrierEl, battleshipEl, cruiserEl, submarineEl, destroyerEl){
    let arrayOfShips = []
    if(!carrierEl.launching){
        let placed = false;
        while(!placed){
            // if board functions end succesfully it return array of ship coords; It is equal to true so it stops while loop
            placed = board.placeShip(randomCoords(), carrierEl, randomDirection())
        }
        // We push spots to arrayOfShips so later we can display Player Board on screen
        arrayOfShips = arrayOfShips.concat(placed)
    }
    if(!battleshipEl.launching){
        let placed = false;
        while(!placed){
            placed = board.placeShip(randomCoords(), battleshipEl, randomDirection())
        }
        arrayOfShips = arrayOfShips.concat(placed)
    }
    if(!cruiserEl.launching){
        let placed = false;
        while(!placed){
            placed = board.placeShip(randomCoords(), cruiserEl, randomDirection())
        }
        arrayOfShips = arrayOfShips.concat(placed)
    }
    if(!submarineEl.launching){
        let placed = false;
        while(!placed){
            placed = board.placeShip(randomCoords(), submarineEl, randomDirection())
        }
        arrayOfShips = arrayOfShips.concat(placed)
    }
    if(!destroyerEl.launching){
        let placed = false;
        while(!placed){
            placed = board.placeShip(randomCoords(), destroyerEl, randomDirection())
        }
        arrayOfShips = arrayOfShips.concat(placed)
    }
    return arrayOfShips;
}


function randomCoords(){
    const y = Math.floor(Math.random() * 10);
    const x = Math.floor(Math.random() * 10);
    return [y,x]
}
function randomDirection(){
    const random = Math.floor(Math.random() * 9)
    if(random < 5 ){
        return "horizontal"
    } else {
        return "vertical"
    }
}
