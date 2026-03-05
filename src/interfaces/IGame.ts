import { GameStatus } from "../domain/GameStatus.js";
import { ILetterAddAction } from "../types/letterAddAction.js";
import { LetterResult } from '../domain/WordEvaluator';
import { ILetterDeleteAction } from "../types/letterDeleteAction.js";

export interface IGame {
    readonly currentWord: string;
    readonly turn: number;
    addLetter(letter: string): ILetterAddAction | null;
    enterPressed(): {status: GameStatus; evaluation: LetterResult[] | null; evaluatedTurn: number | null;};
    backspacePressed(): ILetterDeleteAction | null;
}