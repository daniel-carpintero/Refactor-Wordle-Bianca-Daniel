import { Game } from "./Game";
import { Interface, CellState } from "./Interface";
import { KeyboardInput } from "./KeyboardInput";
import { NavigationHandler } from "./NavigationHandler";

export class GameController {
    private _game: Game;
    private _interface: Interface;
    private _navigation: NavigationHandler;
    private _keyboard: KeyboardInput;

    constructor(
        game: Game,
        ui: Interface,
        navigation: NavigationHandler,
        keyboard: KeyboardInput
    ) {
        this._game = game;
        this._interface = ui;
        this._navigation = navigation;
        this._keyboard = keyboard;
    }

    private handleEnter(): void {
        const currentWord = this._game.actualWord;
        const result = this._game.enterPressed();

        if (result.evaluation && result.evaluatedTurn !== null) {
            result.evaluation.forEach((state, index) => {

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
        }

        if (this._keyboard.isBackspaceKey(code)) {
            this.handleBackspace();
        }

        if (this._keyboard.isValidLetter(code)) {
            this.handleLetter(code);
        }
    }
}