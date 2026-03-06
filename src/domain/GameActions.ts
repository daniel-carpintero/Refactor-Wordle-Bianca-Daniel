import { IGame } from "../interfaces/IGame.js";
import { LetterAddAction } from "../types/letterAddAction.js";
import { IWordEvaluator } from "../interfaces/IWordEvaluator.js";

export class GameActions {
    private readonly _maxWordSize: number;
    private readonly _maxAttempts: number;
    private readonly _game: IGame;
    private readonly _wordEvaluator: IWordEvaluator;

    constructor(game: IGame, maxWordSize: number, maxAttempts: number, evaluator: IWordEvaluator){
        this._game = game;
        this._maxWordSize = maxWordSize;
        this._maxAttempts = maxAttempts;
        this._wordEvaluator = evaluator;
    }
    
    addLetter(letter: string): LetterAddAction | null {
        if(this._game.currentPosition >= this.maxWordSize){
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

    enterPressed(): TurnResult {
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

    backspacePressed(): LetterDeleteAction | null {
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