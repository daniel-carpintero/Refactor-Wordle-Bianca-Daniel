import {MAX_WORD_SIZE, MAX_ATTEMPTS} from "./env.js";
import { GameStatus } from "./GameStatus.js";
import {Interface} from "./Interface.js";
import { KeyboardInput } from './KeyboardInput';
import { LetterResult, WordEvaluator } from "./WordEvaluator.js";

export class Game {
    private _pickedWord: string
    private _actualWord: string
    private _actualPosition: number
    private _turn: number
    private _keyboardInput: KeyboardInput
    private _wordEvaluator: WordEvaluator
    
    private _interface: Interface
    constructor(pickedWord: string, keyboardInput: KeyboardInput){
        this._pickedWord = pickedWord;
        this._actualWord = "";
        this._actualPosition = 0;
        this._turn = 1;
        this._keyboardInput = keyboardInput
        this._interface = new Interface();
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

    get interface() {
        return this._interface;
    }
    set interface(i) {
        this._interface = i;
    }

    newLetter(code: string):void{
        let letter: string = this._keyboardInput.transformCodeToLetter(code);
        this._interface.setNewLetter(this.turn, this.actualPosition, letter);
        this._actualPosition = this._actualPosition + 1;
        this._actualWord += letter;
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

    backspacePressed():void{
        if (this._actualPosition > 0) {
            this._actualPosition -= 1;
            this._interface.deleteLetter(this._turn, this._actualPosition);
        }
    }

    newKeyPressed(code: string):void{ 
        if (this._keyboardInput.isValidLetter(code) && this._actualPosition < MAX_WORD_SIZE) this.newLetter(code);
        if (this._keyboardInput.isBackspaceKey(code)) this.backspacePressed();
        this._interface.changeBackgroundKey(code);
    }
    
}