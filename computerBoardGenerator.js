import { factoryShip } from "./battleship.js";
export const carrierPc = factoryShip(5);
export const battleshipPc = factoryShip(4)
export const cruiserPc = factoryShip(3);
export const submarinePc = factoryShip(3)
export const destroyerPc = factoryShip(2);
export function computerBoardGenerator(board, carrierEl, battleshipEl, cruiserEl, submarineEl, destroyerEl){
    if(!carrierEl.launching){
        let placed = false;
        while(!placed){
            placed = board.placeShip(randomCoords(), carrierEl, randomDirection())
        }
        carrierEl.launching = true;
    }
    if(!battleshipEl.launching){
        let placed = false;
        while(!placed){
            placed = board.placeShip(randomCoords(), battleshipEl, randomDirection())
        }
        battleshipEl.launching = true;
    }
    if(!cruiserEl.launching){
        let placed = false;
        while(!placed){
            placed = board.placeShip(randomCoords(), cruiserEl, randomDirection())
        }
        cruiserEl.launching = true;
    }
    if(!submarineEl.launching){
        let placed = false;
        while(!placed){
            placed = board.placeShip(randomCoords(), submarineEl, randomDirection())
        }
        submarineEl.launching = true;
    }
    if(!destroyerEl.launching){
        let placed = false;
        while(!placed){
            placed = board.placeShip(randomCoords(), destroyerEl, randomDirection())
        }
        destroyerEl.launching = true;
    }
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
