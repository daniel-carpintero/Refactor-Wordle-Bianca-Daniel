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
    private _currentWord: string;
    private _currentPosition: number;
    private _turn: number;
<<<<<<< HEAD
    private _wordEvaluator: WordEvaluator;
    
    constructor(pickedWord: string, evaluator: WordEvaluator, private readonly maxWordSize: number, private readonly maxAttempts: number){
=======
    private readonly _wordEvaluator: IWordEvaluator;
    
    constructor(pickedWord: string, _evaluator: IWordEvaluator, private readonly maxWordSize: number, private readonly maxAttempts: number){
>>>>>>> origin/refactor/daniel.carpintero
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

    addLetter(letter: string): LetterAddAction | null {
        if(this._currentPosition >= this.maxWordSize){
            return null;
        }

        const action: LetterAddAction = {
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

    backspacePressed(): LetterDeleteAction | null{
        if (this._currentPosition > 0) {
            this._currentPosition -= 1;

            this._currentWord = this._currentWord.slice(0, -1);
            
            return {
                type: "delete",
                position: this._currentPosition,
                turn: this._turn
            };
        }

        this._currentPosition--;
        this._currentWord = this._currentWord.slice(0, -1);

        return {
            type: "delete",
            position: this._currentPosition,
            turn: this._turn
        };
    }
}