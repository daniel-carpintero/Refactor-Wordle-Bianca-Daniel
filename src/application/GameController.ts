import { Game } from "../domain/Game.js";
import { LetterResult } from "../domain/WordEvaluator.js";
import { IGame } from "../interfaces/IGame.js";
import { IInterface } from "../interfaces/IInterface.js";
import { IKeyboardInput } from "../interfaces/IKeyboardInput.js";
import { INavigationHandler } from "../interfaces/INavigationHandler.js";

export class GameController {
    private _game: IGame;
    private _interface: IInterface;
    private _navigation: INavigationHandler;
    private _keyboard: IKeyboardInput;

    constructor(game: Game, ui: IInterface, navigation: INavigationHandler, keyboard: IKeyboardInput) {
        this._game = game;
        this._interface = ui;
        this._navigation = navigation;
        this._keyboard = keyboard;
    }

    private handleEnter(): void {
        const currentWord = this._game.currentWord;
        const result = this._game.enterPressed();

        const evaluation = result.evaluation;
        const turn = result.evaluatedTurn;

        if (evaluation && turn !== null) {
            this._interface.renderEvaluation(turn, currentWord, evaluation);
        }

        this._navigation.navigate(result.status);
    }

    private handleBackspace(): void {
        const action = this._game.backspacePressed();

        if (action) {
            this._interface.clearLetter(action.turn, action.position);
        }
    }

    private handleLetter(code: string): void {
        const letter = this._keyboard.transformCodeToLetter(code);
        const action = this._game.addLetter(letter);

        if (action) {
            this._interface.setLetter(
                action.turn,
                action.position,
                action.letter
            );
        }
    }

    handleKey(code: string): void {
        if (this._keyboard.isEnterKey(code)) {
            this.handleEnter();
        } else if (this._keyboard.isBackspaceKey(code)) {
            this.handleBackspace();
        } else if (this._keyboard.isValidLetter(code)) {
            this.handleLetter(code);
        }
    }
}