import { GameStatus } from "./GameStatus.js";
import { ActionType } from "./ActionType.js";
export class GameActions {
    constructor(game, evaluator) {
        this._game = game;
        this._wordEvaluator = evaluator;
    }
    isWordComplete() {
        return this._game.currentWord.length === this._game.maxWordSize;
    }
    isWinner() {
        return this._game.currentWord === this._game.pickedWord;
    }
    isLastTurn() {
        return this._game.turn === this._game.maxAttempts;
    }
    evaluateCurrentWord() {
        return this._wordEvaluator.evaluateWord(this._game.pickedWord, this._game.currentWord);
    }
    prepareNextTurn() {
        this._game.incrementTurn();
        this._game.resetCurrentPosition();
        this._game.resetCurrentWord();
    }
    addLetter(letter) {
        if (this._game.currentPosition >= this._game.maxWordSize) {
            return null;
        }
        const action = {
            type: ActionType.ADD,
            letter,
            position: this._game.currentPosition,
            turn: this._game.turn
        };
        this._game.incrementCurrentPosition();
        this._game.appendLetter(letter);
        return action;
    }
    enterPressed() {
        if (!this.isWordComplete()) {
            return { status: GameStatus.ONGOING, evaluation: null, evaluatedTurn: null };
        }
        const evaluation = this.evaluateCurrentWord();
        const evaluatedTurn = this._game.turn;
        const isWinner = this.isWinner();
        const isLastTurn = this.isLastTurn();
        if (isWinner) {
            return { status: GameStatus.WIN, evaluation, evaluatedTurn };
        }
        if (isLastTurn) {
            return { status: GameStatus.LOSE, evaluation, evaluatedTurn };
        }
        this.prepareNextTurn();
        return { status: GameStatus.ONGOING, evaluation, evaluatedTurn };
    }
    backspacePressed() {
        if (this._game.currentPosition <= 0) {
            return null;
        }
        this._game.decrementCurrentPosition();
        this._game.removeLastLetter();
        return {
            type: ActionType.DELETE,
            position: this._game.currentPosition,
            turn: this._game.turn
        };
    }
}
//# sourceMappingURL=GameActions.js.map