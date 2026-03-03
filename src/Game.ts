import { MAX_WORD_SIZE, MAX_ATTEMPTS } from "./env.js";
import { GameStatus } from "./GameStatus.js";
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
    private _pickedWord: string;
    private _currentWord: string;
    private _currentPosition: number;
    private _turn: number;
    private _wordEvaluator: WordEvaluator;

    constructor(pickedWord: string, evaluator: WordEvaluator) {
        this._pickedWord = pickedWord;
        this._currentWord = "";
        this._currentPosition = 0;
        this._turn = 1;
        this._wordEvaluator = evaluator;
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
        if (this._currentPosition >= MAX_WORD_SIZE) {
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

    enterPressed(): { status: GameStatus; evaluation: LetterResult[] | null; evaluatedTurn: number | null } {
        if (this._currentWord.length !== MAX_WORD_SIZE) {
            return { status: GameStatus.ONGOING, evaluation: null, evaluatedTurn: null };
        }

        const isWinner = this._currentWord === this._pickedWord;
        const isLastTurn = this._turn === MAX_ATTEMPTS;
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

    backspacePressed(): LetterDeleteAction | null {
        if (this._currentPosition <= 0) {
            return null;
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