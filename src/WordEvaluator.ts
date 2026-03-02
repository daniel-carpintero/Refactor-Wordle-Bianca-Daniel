import {MAX_WORD_SIZE} from "./env.js";
import {Interface} from "./Interface.js";

export class WordEvaluator {
    checkRightLetters = (_pickedWord: string, _actualWord: string, _interface: Interface, _turn: number):void=>{
        for(let i=0; i<MAX_WORD_SIZE; i++){
            if (_pickedWord[i]==_actualWord[i]){
                _interface.changeBackgroundPosition(_turn, i, "rightLetter");
            }
        }
    }

    checkMisplacedLetters = (_pickedWord: string, _actualWord: string, _interface: Interface, _turn: number):void=> {
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
            if (numberOfCoincidences>0 && isMisplacedLetter) _interface.changeBackgroundPosition(_turn, i, "misplacedLetter");
            
        }
    }

    checkWrongLetters = (_pickedWord: string, _actualWord: string, _interface: Interface, _turn: number):void=>{
        let actualLetter = "";
        let pattern:RegExp;
        let numberOfCoincidences = 0;
        for (let i=0; i<MAX_WORD_SIZE; i++){
            actualLetter = _actualWord[i];
            pattern = new RegExp(actualLetter,"g");
            numberOfCoincidences = (_pickedWord.match(pattern)||[]).length;
            if (numberOfCoincidences==0) _interface.changeBackgroundPosition(_turn, i, "wrongLetter");
        }
    }
}