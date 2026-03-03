import { MAX_WORD_SIZE, MAX_ATTEMPTS } from "./env.js";
import { GameStatus } from "./GameStatus.js";
export class Game {
    constructor(pickedWord, _evaluator) {
        this._pickedWord = pickedWord;
        this._actualWord = "";
        this._actualPosition = 0;
        this._turn = 1;
        this._wordEvaluator = _evaluator;
    }
    get actualWord() {
        return this._actualWord;
    }
    get pickedWord() {
        return this._pickedWord;
    }
    get turn() {
        return this._turn;
    }
    addLetter(letter) {
        if (this._actualPosition >= MAX_WORD_SIZE) {
            return null;
        }
        const action = {
            type: "add",
            letter,
            position: this._actualPosition,
            turn: this._turn
        };
        this._actualPosition = this._actualPosition + 1;
        this._actualWord += letter;
        return action;
    }
    enterPressed() {
        if (this._actualWord.length !== MAX_WORD_SIZE) {
            return { status: GameStatus.ONGOING, evaluation: null, evaluatedTurn: null };
        }
        const isWinner = this._actualWord === this.pickedWord;
        const isLastTurn = this._turn === MAX_ATTEMPTS;
        const evaluation = this._wordEvaluator.evaluateWord(this._pickedWord, this._actualWord);
        const evaluatedTurn = this._turn;
        this._turn += 1;
        this._actualPosition = 0;
        this._actualWord = "";
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
            return {
                type: "delete",
                position: this._actualPosition,
                turn: this._turn
            };
        }
        return null;
    }
}
//# sourceMappingURL=Game.js.map