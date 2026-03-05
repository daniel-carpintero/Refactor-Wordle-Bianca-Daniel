import { LetterResult } from "../domain/WordEvaluator.js";

export interface IWordEvaluator {
    evaluateWord(pickedWord: string, actualWord: string): LetterResult[];
}