import { GameStatus } from "./GameStatus.js";
import { LetterResult } from "./WordEvaluator.js";
import { IWordEvaluator } from "../interfaces/IWordEvaluator.js";
import { ILetterAddAction } from "../types/ILetterAddAction.js";
import { ILetterDeleteAction } from "../types/ILetterDeleteAction.js";
import { IGame } from "../interfaces/IGame";

export type KeyAction = ILetterAddAction | ILetterDeleteAction | null;

export class Game implements IGame{
    private _pickedWord: string;
    private _currentWord: string;
    private _currentPosition: number;
    private _turn: number;
    private readonly _wordEvaluator: IWordEvaluator;
    
    constructor(pickedWord: string, _evaluator: IWordEvaluator, private readonly maxWordSize: number, private readonly maxAttempts: number){
        this._pickedWord = pickedWord;
        this._currentWord = "";
        this._currentPosition = 0;
        this._turn = 1;
        this._wordEvaluator = _evaluator;
    }

    get currentWord(): string {
        return this._currentWord;
    }

    get pickedWord(): string {
        return this._pickedWord;
    }

    get turn(): number {
        return this._turn;
    }

    addLetter(letter: string): ILetterAddAction | null {
        if(this._currentPosition >= this.maxWordSize){
            return null;
        }

        const action: ILetterAddAction = {
            type: "add",
            letter,
            position: this._currentPosition,
            turn: this._turn
        };

        this._currentPosition++;
        this._currentWord += letter;

        return action;
    }

    enterPressed(): {status: GameStatus, evaluation: LetterResult[] | null, evaluatedTurn: number | null} {
        if(this._currentWord.length !== this.maxWordSize){
            return {status: GameStatus.ONGOING, evaluation: null, evaluatedTurn: null};
        }

        const isWinner = this._currentWord === this.pickedWord;
        const isLastTurn = this._turn === this.maxAttempts;

        const evaluation = this._wordEvaluator.evaluateWord(this._pickedWord, this._currentWord);
        const evaluatedTurn = this._turn;

        this._turn++;
        this._currentPosition = 0;
        this._currentWord = "";

        if (isWinner) {
            return { status: GameStatus.WIN, evaluation, evaluatedTurn };
        }

        if (isLastTurn) {
            return { status: GameStatus.LOSE, evaluation, evaluatedTurn };
        }

        return { status: GameStatus.ONGOING, evaluation, evaluatedTurn };
    }

    backspacePressed(): ILetterDeleteAction | null {
    if (this._currentPosition <= 0) {
        return null;  
    }

    this._currentPosition -= 1;
    this._currentWord = this._currentWord.slice(0, -1);

    return {
        type: "delete",
        position: this._currentPosition,
        turn: this._turn
    };
}
}