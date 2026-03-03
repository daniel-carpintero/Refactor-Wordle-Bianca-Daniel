import { BoardRenderer } from "./BoardRenderer.js";
import { KeyboardRenderer } from "./KeyboardRenderer.js";
var GameUI = /** @class */ (function () {
    function GameUI() {
        this._board = new BoardRenderer();
        this._keyboard = new KeyboardRenderer();
    }
    GameUI.prototype.setLetter = function (turn, position, letter) {
        this._board.setLetter(turn, position, letter);
    };
    GameUI.prototype.clearLetter = function (turn, position) {
        this._board.clearLetter(turn, position);
    };
    GameUI.prototype.setCellState = function (turn, position, state) {
        this._board.setCellState(turn, position, state);
    };
    GameUI.prototype.setKeyState = function (letter, state) {
        this._keyboard.setKeyState(letter, state);
    };
    return GameUI;
}());
export { GameUI };
