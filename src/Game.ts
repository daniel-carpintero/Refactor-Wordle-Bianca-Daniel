import {MAX_WORD_SIZE, MAX_ATTEMPTS} from "./env.js";
import { GameStatus } from "./GameStatus.js";
import { KeyboardInput } from './KeyboardInput';
import { LetterResult, WordEvaluator } from "./WordEvaluator.js";

export interface LetterAddAction {
    type: "add";
    letter: string;
    position: number;
    turn: number;
}

export interface LetterDeleteAction {
    type: "delete";
    position: number;
    turn: number;
}

export type KeyAction = LetterAddAction | LetterDeleteAction | null;

export class Game {
    private _pickedWord: string
    private _actualWord: string
    private _actualPosition: number
    private _turn: number
    private _keyboardInput: KeyboardInput
    private _wordEvaluator: WordEvaluator
    
    constructor(pickedWord: string, keyboardInput: KeyboardInput){
        this._pickedWord = pickedWord;
        this._actualWord = "";
        this._actualPosition = 0;
        this._turn = 1;
        this._keyboardInput = keyboardInput
        this._wordEvaluator = new WordEvaluator();
    }

    get pickedWord(){
        return this._pickedWord;
    }
    
    set pickedWord(word){
        this._pickedWord = word;
    }

    get actualWord(){
        return this._actualWord;
    }
    set actualWord(word){
        this._actualWord = word;
    }

    get actualPosition(){
        return this._actualPosition;
    }
    set actualPosition(num){
        this._actualPosition = num;
    }

    get turn(){
        return this._turn;
    }
    set turn(num){
        this._turn = num;
    }

    newLetter(code: string): LetterAddAction {
        let letter: string = this._keyboardInput.transformCodeToLetter(code);
        
        const action: LetterAddAction = {
            type: "add",
            letter,
            position: this._actualPosition,
            turn: this._turn
        };

        this._actualPosition = this._actualPosition + 1;
        this._actualWord += letter;

        return action;
    }

    enterPressed(): {status: GameStatus, evaluation: LetterResult[] | null} {
        if (this._actualWord.length == MAX_WORD_SIZE){
            const isWinner = this._actualWord === this.pickedWord;
            const isLastTurn = this._turn === MAX_ATTEMPTS;

            const evaluation = this._wordEvaluator.evaluateWord(this._pickedWord, this._actualWord);

            this._turn = this._turn + 1;
            this._actualPosition = 0;
            this._actualWord = "";
            
            if(isWinner){
                return {status: GameStatus.WIN, evaluation};
            }

            if(isLastTurn){
                return {status: GameStatus.LOSE, evaluation};
            }
        }

        return {status: GameStatus.ONGOING, evaluation: null};
    }

    backspacePressed(): LetterDeleteAction | null{
        if (this._actualPosition > 0) {
            this._actualPosition -= 1;
            
            return {
                type: "delete",
                position: this._actualPosition,
                turn: this._turn
            };
        }

        return null;
    }

    newKeyPressed(code: string): KeyAction { 
        if (this._keyboardInput.isValidLetter(code) && this._actualPosition < MAX_WORD_SIZE) return this.newLetter(code);
        if (this._keyboardInput.isBackspaceKey(code)) return this.backspacePressed();
        return null;
    }
    
}