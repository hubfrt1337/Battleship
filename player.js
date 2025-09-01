import { gameBoard } from "./gameBoard.js";
export function player(){
    const board = gameBoard()
    return { board }
}