import { LetterResult } from "../domain/WordEvaluator.js";

export interface IInterface {
    setLetter(turn: number, position: number, letter: string): void;
    clearLetter(turn: number, position: number): void;
    setCellState(turn: number, position: number, state: NonNullable<LetterResult>): void;
    setKeyState(letter: string, state: NonNullable<LetterResult>): void;
    renderEvaluation(turn: number, currentWord: string, evaluation: LetterResult[]): void;
}