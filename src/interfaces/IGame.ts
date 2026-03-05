import { Game } from "../domain/Game";

export interface IGame {
    readonly currentWord: string;
    readonly turn: number;
    addLetter(letter: string): ReturnType<Game["addLetter"]>;
    enterPressed(): ReturnType<Game["enterPressed"]>;
    backspacePressed(): ReturnType<Game["backspacePressed"]>;
}