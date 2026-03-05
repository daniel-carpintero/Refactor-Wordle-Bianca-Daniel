import { Game } from "./Game";
import { LetterResult } from "./WordEvaluator";
import { IGame } from "./interfaces/IGame";
import { IInterface } from "./interfaces/IInterface";
import { IKeyboardInput } from "./interfaces/IKeyboardInput";
import { INavigationHandler } from "./interfaces/INavigationHandler";

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

        if (result.evaluation && result.evaluatedTurn !== null) {
            result.evaluation.forEach((state: LetterResult, index: number) => {

                if (!state) return; 

                this._interface.setCellState(
                    result.evaluatedTurn!,
                    index,
                    state
                );

                const letter = currentWord[index];
                this._interface.setKeyState(letter, state);
            });
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