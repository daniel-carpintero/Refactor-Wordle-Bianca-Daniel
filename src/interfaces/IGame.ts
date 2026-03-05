import { Game } from "../domain/Game.js";

export interface IGame {
    readonly currentWord: string;
    readonly turn: number;
    addLetter(letter: string): ReturnType<Game["addLetter"]>;
    enterPressed(): ReturnType<Game["enterPressed"]>;
    backspacePressed(): ReturnType<Game["backspacePressed"]>;
}