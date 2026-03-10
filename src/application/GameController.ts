import { IGame } from "../interfaces/IGame.js";
import { IGameActions } from "../interfaces/IGameActions.js";
import { IGameUI } from "../interfaces/IGameUI.js";
import { IKeyboardInput } from "../interfaces/IKeyboardInput.js";
import { INavigationHandler } from "../interfaces/INavigationHandler.js";

export class GameController {
    private _game: IGame
    private _gameActions: IGameActions;
    private _interface: IGameUI;
    private _navigation: INavigationHandler;
    private _keyboard: IKeyboardInput;

    constructor(game: IGame, gameActions: IGameActions, ui: IGameUI, navigation: INavigationHandler, keyboard: IKeyboardInput) {
        this._game = game;
        this._gameActions = gameActions;
        this._interface = ui;
        this._navigation = navigation;
        this._keyboard = keyboard;
    }

    private handleEnter(): void {
        const currentWord = this._game.currentWord;
        const result = this._gameActions.enterPressed();

        const evaluation = result.evaluation;
        const turn = result.evaluatedTurn;

        if (evaluation && turn !== null) {
            this._interface.renderEvaluation(turn, currentWord, evaluation);
        }

        this._navigation.navigate(result.status);
    }

    private handleBackspace(): void {
        const action = this._gameActions.backspacePressed();

        if (action) {
            this._interface.clearLetter(action.turn, action.position);
        }
    }

    private handleLetter(code: string): void {
        const letter = this._keyboard.transformCodeToLetter(code);
        const action = this._gameActions.addLetter(letter);

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