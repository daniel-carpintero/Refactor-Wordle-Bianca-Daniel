import { MAX_WORD_SIZE, MAX_ATTEMPTS } from "./env.js";
import { GameStatus } from "./GameStatus.js";
export class Game {
    constructor(pickedWord, evaluator) {
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
        if (this._currentPosition >= MAX_WORD_SIZE) {
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
    backspacePressed() {
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
//# sourceMappingURL=Game.js.map