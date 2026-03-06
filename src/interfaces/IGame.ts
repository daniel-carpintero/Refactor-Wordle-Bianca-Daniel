import { GameStatus } from "../domain/GameStatus.js";
import { LetterResult } from '../domain/WordEvaluator.js';
import { LetterAddAction } from "../types/letterAddAction.js";
import { LetterDeleteAction } from "../types/letterDeleteAction.js";


export interface IGame {
    readonly currentWord: string;
    readonly turn: number;
    addLetter(letter: string): LetterAddAction | null;
    enterPressed(): {status: GameStatus; evaluation: LetterResult[] | null; evaluatedTurn: number | null;};
    backspacePressed(): LetterDeleteAction | null;
}