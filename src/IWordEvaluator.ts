import { LetterResult } from "./WordEvaluator";

export interface IWordEvaluator {
    evaluateWord(pickedWord: string, actualWord: string): LetterResult[];
}