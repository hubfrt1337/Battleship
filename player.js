import { gameBoard } from "./gameBoard.js";
export function player(type){
    const board = gameBoard(type)
    return { board }
}