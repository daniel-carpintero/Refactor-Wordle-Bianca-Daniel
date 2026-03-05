import { LetterResult } from "../domain/WordEvaluator";

export interface IWordEvaluator {
    evaluateWord(pickedWord: string, actualWord: string): LetterResult[];
}