import { Game } from "./Game";
import { Interface } from "./Interface";
import { KeyboardInput } from "./KeyboardInput";
import { NavigationHandler } from "./NavigationHandler";

export class GameController {
    private _game: Game;
    private _interface: Interface;
    private _navigation: NavigationHandler;
    private _keyboard: KeyboardInput;

    constructor(_game: Game, _interface: Interface, _navigation: NavigationHandler, _keyboard: KeyboardInput){
        this._game = _game;
        this._interface = _interface;
        this._navigation = _navigation;
        this._keyboard = _keyboard;
    }

    handleKey(code: string){
        if(this._keyboard.isEnterKey(code)){
            const result = this._game.enterPressed();

            if(result.evaluation){
                result.evaluation.forEach((state, index) => {
                    if(state === "right"){
                        this._interface.changeBackgroundPosition(this._game.turn - 1, index, "rightLetter");
                    }

                    if(state === "misplaced"){
                       this._interface.changeBackgroundPosition(this._game.turn - 1, index, "misplacedLetter");
                    }

                    if(state === "wrong"){
                        this._interface.changeBackgroundPosition(this._game.turn - 1, index, "wrongLetter");
                    }
                    
                });
            }

            this._navigation.navigate(result.status);
        } else if(this._keyboard.isBackspaceKey(code)){

            const action = this._game.backspacePressed();

            if(action != null){
                this._interface.deleteLetter(action.turn, action.position);
            }

            return;
        } else if(this._keyboard.isValidLetter(code)){
            const letter = this._keyboard.transformCodeToLetter(code);
            const action = this._game.addLetter(letter);

            if(action != null){
                this._interface.setNewLetter(action.turn, action.position, action.letter);
                this._interface.changeBackgroundKey(code);
            }
        }
    }

}