import { IWordEvaluator } from "../interfaces/IWordEvaluator.js";

export type LetterResult = "right" | "misplaced" | "wrong" | null;

export class WordEvaluator implements IWordEvaluator{
    
    evaluateWord(pickedWord: string, currentWord: string): LetterResult[] {
        const results: LetterResult[] = new Array(pickedWord.length).fill("wrong");
        const pickedLetters = pickedWord.split("");

        for (let i = 0; i < pickedWord.length; i++) {
            if (currentWord[i] === pickedLetters[i]) {
                results[i] = "right";
                pickedLetters[i] = "";
            }
        }

        for (let i = 0; i < pickedWord.length; i++) {
            if (results[i] !== "right") {
                const indexInPicked = pickedLetters.indexOf(currentWord[i]);
                if (indexInPicked !== -1) {
                    results[i] = "misplaced";
                    pickedLetters[indexInPicked] = "";
                }
            }
        }

        return results;
    }
}