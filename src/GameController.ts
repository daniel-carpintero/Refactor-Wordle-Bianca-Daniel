import { Game } from "./Game";
import { Interface, CellState } from "./Interface";
import { KeyboardInput } from "./KeyboardInput";
import { NavigationHandler } from "./NavigationHandler";
import { LetterResult } from "./WordEvaluator";
import { GameStatus } from "./GameStatus";

interface IGame {
    readonly currentWord: string;
    readonly turn: number;
    addLetter(letter: string): ReturnType<Game["addLetter"]>;
    enterPressed(): ReturnType<Game["enterPressed"]>;
    backspacePressed(): ReturnType<Game["backspacePressed"]>;
}

interface IInterface {
    setLetter(turn: number, position: number, letter: string): void;
    clearLetter(turn: number, position: number): void;
    setCellState(turn: number, position: number, state: NonNullable<LetterResult>): void;
    setKeyState(letter: string, state: NonNullable<LetterResult>): void;
}

interface IKeyboardInput {
    isEnterKey(code: string): boolean;
    isBackspaceKey(code: string): boolean;
    isValidLetter(code: string): boolean;
    transformCodeToLetter(code: string): string;
}

interface INavigationHandler {
    navigate(status: GameStatus): void;
}

export class GameController {
    private _game: IGame;
    private _interface: IInterface;
    private _navigation: INavigationHandler;
    private _keyboard: IKeyboardInput;

    constructor(game: Game, ui: Interface, navigation: NavigationHandler, keyboard: KeyboardInput) {
        this._game = game;
        this._interface = ui;
        this._navigation = navigation;
        this._keyboard = keyboard;
    }

    private handleEnter(): void {
        const currentWord = this._game.currentWord;
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
        } else if (this._keyboard.isBackspaceKey(code)) {
            this.handleBackspace();
        } else if (this._keyboard.isValidLetter(code)) {
            this.handleLetter(code);
        }
    }
}