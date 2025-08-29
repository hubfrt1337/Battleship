import { factoryShip } from "./battleship.js";
const carrier = factoryShip(5);
const battleship = factoryShip(4)
const cruiser = factoryShip(3);
const submarine = factoryShip(3)
const destroyer = factoryShip(2);
export function computerBoardGenerator(board){
    if(!carrier.launching){
        let placed = false;
        while(!placed){
            placed = board.placeShip(randomCoords(), carrier, randomDirection())
        }
        carrier.launching = true;
    }
    if(!battleship.launching){
        let placed = false;
        while(!placed){
            placed = board.placeShip(randomCoords(), battleship, randomDirection())
        }
        battleship.launching = true;
    }
    if(!cruiser.launching){
        let placed = false;
        while(!placed){
            placed = board.placeShip(randomCoords(), cruiser, randomDirection())
        }
        cruiser.launching = true;
    }
    if(!submarine.launching){
        let placed = false;
        while(!placed){
            placed = board.placeShip(randomCoords(), submarine, randomDirection())
        }
        submarine.launching = true;
    }
    if(!destroyer.launching){
        let placed = false;
        while(!placed){
            placed = board.placeShip(randomCoords(), destroyer, randomDirection())
        }
        destroyer.launching = true;
    }

    console.log(board.matrix)
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
