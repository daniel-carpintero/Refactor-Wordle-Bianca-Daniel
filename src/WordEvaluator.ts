import {MAX_WORD_SIZE} from "./env.js";
import {Interface} from "./Interface.js";

export type LetterResult = "right" | "misplaced" | "wrong" | null;

export class WordEvaluator {
    checkRightLetters (_pickedWord: string, _actualWord: string, results: LetterResult[]): void {
        for(let i=0; i<MAX_WORD_SIZE; i++){
            if (_pickedWord[i]==_actualWord[i]){
                results[i] = "right";
            }
        }
    }

    checkMisplacedLetters = (_pickedWord: string, _actualWord: string, results: LetterResult[]):void=> {
        let actualLetter: string = "";
        let pattern: RegExp;
        let numberOfCoincidences: number = 0;
        let isMisplacedLetter: boolean;
        for (let i=0; i<MAX_WORD_SIZE; i++){
            isMisplacedLetter = true;
            actualLetter = _actualWord[i];
            pattern = new RegExp(actualLetter,"g");
            numberOfCoincidences = (_pickedWord.match(pattern)||[]).length;
            if (_pickedWord[i]==_actualWord[i]) isMisplacedLetter=false;
            if (numberOfCoincidences>0 && isMisplacedLetter) results[i] = "misplaced";
            
        }
    }

    checkWrongLetters = (_pickedWord: string, _actualWord: string, results: LetterResult[]):void=>{
        let actualLetter = "";
        let pattern:RegExp;
        let numberOfCoincidences = 0;
        for (let i=0; i<MAX_WORD_SIZE; i++){
            actualLetter = _actualWord[i];
            pattern = new RegExp(actualLetter,"g");
            numberOfCoincidences = (_pickedWord.match(pattern)||[]).length;
            if (numberOfCoincidences==0) results[i] = "wrong";
        }
    }

    evaluateWord(pickedWord: string, actualWord: string): LetterResult[]{
        const results: LetterResult[] = new Array(MAX_WORD_SIZE).fill(null);
        this.checkRightLetters(pickedWord, actualWord, results);
        this.checkMisplacedLetters(pickedWord, actualWord, results);
        this.checkWrongLetters(pickedWord, actualWord, results);

        return results;
    }
}