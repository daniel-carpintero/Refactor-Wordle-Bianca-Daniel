import { GameStatus } from "./GameStatus.js";
import { LetterResult } from "./WordEvaluator.js";
import { IWordEvaluator } from "./IWordEvaluator.js";

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
    private _pickedWord: string;
    private _actualWord: string;
    private _actualPosition: number;
    private _turn: number;
    private readonly _wordEvaluator: IWordEvaluator;
    
    constructor(pickedWord: string, _evaluator: IWordEvaluator, private readonly maxWordSize: number, private readonly maxAttempts: number){
        this._pickedWord = pickedWord;
        this._actualWord = "";
        this._actualPosition = 0;
        this._turn = 1;
        this._wordEvaluator = _evaluator;
    }

    get actualWord(): string{
        return this._actualWord;
    }

    get pickedWord(){
        return this._pickedWord;
    }

    get turn(){
        return this._turn;
    }

    addLetter(letter: string): LetterAddAction | null {
        if(this._actualPosition >= this.maxWordSize){
            return null;
        }

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

    enterPressed(): {status: GameStatus, evaluation: LetterResult[] | null, evaluatedTurn: number | null} {
        if(this._actualWord.length !== this.maxWordSize){
            return {status: GameStatus.ONGOING, evaluation: null, evaluatedTurn: null};
        }

        const isWinner = this._actualWord === this.pickedWord;
        const isLastTurn = this._turn === this.maxAttempts;

        const evaluation = this._wordEvaluator.evaluateWord(this._pickedWord, this._actualWord);
        const evaluatedTurn = this._turn;

        this._turn += 1;
        this._actualPosition = 0;
        this._actualWord = "";
        
        if(isWinner){
            return {status: GameStatus.WIN, evaluation, evaluatedTurn};
        }

        if(isLastTurn){
            return {status: GameStatus.LOSE, evaluation, evaluatedTurn};
        }
        
        return {status: GameStatus.ONGOING, evaluation, evaluatedTurn};
    }

    backspacePressed(): LetterDeleteAction | null{
        if (this._actualPosition > 0) {
            this._actualPosition -= 1;

            this._actualWord = this._actualWord.slice(0, -1);
            
            return {
                type: "delete",
                position: this._actualPosition,
                turn: this._turn
            };
        }

        return null;
    }
    
}