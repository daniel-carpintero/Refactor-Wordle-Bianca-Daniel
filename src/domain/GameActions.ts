import { IGame } from "../interfaces/IGame.js";
import { LetterAddAction } from "../types/letterAddAction.js";
import { IWordEvaluator } from "../interfaces/IWordEvaluator.js";
import { TurnResult } from "../types/TurnResult.js";
import { GameStatus } from "./GameStatus.js";
import { LetterDeleteAction } from "../types/letterDeleteAction.js";

export class GameActions {
    private readonly _game: IGame;
    private readonly _wordEvaluator: IWordEvaluator;

    constructor(game: IGame, evaluator: IWordEvaluator){
        this._game = game;
        this._wordEvaluator = evaluator;
    }
    
    addLetter(letter: string): LetterAddAction | null {
        if(this._game.currentPosition >= this._game.maxWordSize){
            return null;
        }

        const action: LetterAddAction = {
            type: "add",
            letter,
            position: this._game.currentPosition,
            turn: this._game.turn
        };

        this._game.incrementCurrentPosition();
        this._game.appendLetter(letter);

        return action;
    }

    enterPressed(): TurnResult {
        if(this._game.currentWord.length !== this._game.maxWordSize){
            return {status: GameStatus.ONGOING, evaluation: null, evaluatedTurn: null};
        }

        const isWinner = this._game.currentWord === this._game.pickedWord;
        const isLastTurn = this._game.turn === this._game.maxAttempts;

        const evaluation = this._wordEvaluator.evaluateWord(this._game.pickedWord, this._game.currentWord);
        const evaluatedTurn = this._game.turn;

        this._game.incrementTurn();
        this._game.resetCurrentPosition();
        this._game.resetCurrentWord();

        if (isWinner) {
            return { status: GameStatus.WIN, evaluation, evaluatedTurn };
        }

        if (isLastTurn) {
            return { status: GameStatus.LOSE, evaluation, evaluatedTurn };
        }

        return { status: GameStatus.ONGOING, evaluation, evaluatedTurn };
    }

    backspacePressed(): LetterDeleteAction | null {
        if (this._game.currentPosition <= 0) {
            return null;  
        }

        this._game.decrementCurrentPosition();
        this._game.removeLastLetter();

        return {
            type: "delete",
            position: this._game.currentPosition,
            turn: this._game.turn
        };
    }
}