import { GameStatus } from "./GameStatus.js";
export class Game {
<<<<<<< HEAD
    constructor(pickedWord, evaluator) {
=======
    constructor(pickedWord, _evaluator, maxWordSize, maxAttempts) {
        this.maxWordSize = maxWordSize;
        this.maxAttempts = maxAttempts;
>>>>>>> origin/refactor/daniel.carpintero
        this._pickedWord = pickedWord;
        this._currentWord = "";
        this._currentPosition = 0;
        this._turn = 1;
        this._wordEvaluator = evaluator;
    }
    get currentWord() {
        return this._currentWord;
    }
    get pickedWord() {
        return this._pickedWord;
    }
    get turn() {
        return this._turn;
    }
    addLetter(letter) {
<<<<<<< HEAD
        if (this._currentPosition >= MAX_WORD_SIZE) {
=======
        if (this._actualPosition >= this.maxWordSize) {
>>>>>>> origin/refactor/daniel.carpintero
            return null;
        }
        const action = {
            type: "add",
            letter,
            position: this._currentPosition,
            turn: this._turn
        };
        this._currentPosition++;
        this._currentWord += letter;
        return action;
    }
    enterPressed() {
<<<<<<< HEAD
        if (this._currentWord.length !== MAX_WORD_SIZE) {
            return { status: GameStatus.ONGOING, evaluation: null, evaluatedTurn: null };
        }
        const isWinner = this._currentWord === this._pickedWord;
        const isLastTurn = this._turn === MAX_ATTEMPTS;
        const evaluation = this._wordEvaluator.evaluateWord(this._pickedWord, this._currentWord);
=======
        if (this._actualWord.length !== this.maxWordSize) {
            return { status: GameStatus.ONGOING, evaluation: null, evaluatedTurn: null };
        }
        const isWinner = this._actualWord === this.pickedWord;
        const isLastTurn = this._turn === this.maxAttempts;
        const evaluation = this._wordEvaluator.evaluateWord(this._pickedWord, this._actualWord);
>>>>>>> origin/refactor/daniel.carpintero
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
    backspacePressed() {
        if (this._actualPosition > 0) {
            this._actualPosition -= 1;
            this._actualWord = this._actualWord.slice(0, -1);
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
