import {MAX_WORD_SIZE} from "./env.js";

export type LetterResult = "right" | "misplaced" | "wrong" | null;

export class WordEvaluator {
    evaluateWord(pickedWord: string, actualWord: string): LetterResult[] {
        const results: LetterResult[] = new Array(MAX_WORD_SIZE).fill("wrong");

        const pickedLetters = pickedWord.split("");

        for(let i = 0; i < MAX_WORD_SIZE; i++){
            if(actualWord[i] === pickedLetters[i]){
                results[i] = "right";
                pickedLetters[i] = "";
            }
        }

        for(let i = 0; i < MAX_WORD_SIZE; i++){
            if(results[i] !== "right"){
                const indexInPicked = pickedLetters.indexOf(actualWord[i]);
                if(indexInPicked !== -1){
                    results[i] = "misplaced";
                    pickedLetters[indexInPicked] = "";
                }
            }
        }

        return results;
    }
}