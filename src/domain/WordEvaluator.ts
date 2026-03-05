import { IWordEvaluator } from "./interfaces/IWordEvaluator.js";

export type LetterResult = "right" | "misplaced" | "wrong" | null;

export class WordEvaluator implements IWordEvaluator{
    
    constructor(private readonly maxWordSize: number){}
    
    evaluateWord(pickedWord: string, currentWord: string): LetterResult[] {
        const results: LetterResult[] = new Array(this.maxWordSize).fill("wrong");
        const pickedLetters = pickedWord.split("");

        for (let i = 0; i < this.maxWordSize; i++) {
            if (currentWord[i] === pickedLetters[i]) {
                results[i] = "right";
                pickedLetters[i] = "";
            }
        }

        for (let i = 0; i < this.maxWordSize; i++) {
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