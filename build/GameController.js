<<<<<<< HEAD
export class GameController {
    constructor(game, ui, navigation, keyboard) {
        this._game = game;
        this._interface = ui;
        this._navigation = navigation;
        this._keyboard = keyboard;
    }
    handleEnter() {
        const currentWord = this._game.actualWord;
        const result = this._game.enterPressed();
        if (result.evaluation && result.evaluatedTurn !== null) {
            result.evaluation.forEach((state, index) => {
                if (!state)
                    return;
                this._interface.setCellState(result.evaluatedTurn, index, state);
                const letter = currentWord[index];
                this._interface.setKeyState(letter, state);
            });
        }
        this._navigation.navigate(result.status);
    }
    handleBackspace() {
        const action = this._game.backspacePressed();
        if (action) {
            this._interface.clearLetter(action.turn, action.position);
        }
    }
    handleLetter(code) {
        const letter = this._keyboard.transformCodeToLetter(code);
        const action = this._game.addLetter(letter);
        if (action) {
            this._interface.setLetter(action.turn, action.position, action.letter);
        }
    }
    handleKey(code) {
        if (this._keyboard.isEnterKey(code)) {
            this.handleEnter();
        }
        else if (this._keyboard.isBackspaceKey(code)) {
            this.handleBackspace();
        }
        else if (this._keyboard.isValidLetter(code)) {
            this.handleLetter(code);
        }
    }
}
//# sourceMappingURL=GameController.js.map
=======
var GameController = /** @class */ (function () {
    function GameController(game, ui, navigation, keyboard) {
        this._game = game;
        this._ui = ui;
        this._navigation = navigation;
        this._keyboard = keyboard;
    }
    GameController.prototype.handleKey = function (code) {
        if (this._keyboard.isEnterKey(code)) {
            this._handleEnter();
            return;
        }
        if (this._keyboard.isBackspaceKey(code)) {
            this._handleBackspace();
            return;
        }
        if (this._keyboard.isValidLetter(code)) {
            this._handleLetter(code);
        }
    };
    GameController.prototype._handleEnter = function () {
        var _this = this;
        var currentWord = this._game.currentWord;
        var result = this._game.enterPressed();
        if (result.evaluation) {
            var evaluatedTurn_1 = this._game.turn - 1;
            result.evaluation.forEach(function (state, index) {
                if (!state)
                    return;
                _this._ui.setCellState(evaluatedTurn_1, index, state);
                var letter = currentWord[index];
                if (letter) {
                    _this._ui.setKeyState(letter, state);
                }
            });
        }
        this._navigation.navigate(result.status);
    };
    GameController.prototype._handleBackspace = function () {
        var action = this._game.backspacePressed();
        if (action) {
            this._ui.clearLetter(action.turn, action.position);
        }
    };
    GameController.prototype._handleLetter = function (code) {
        var letter = this._keyboard.transformCodeToLetter(code);
        var action = this._game.addLetter(letter);
        if (action) {
            this._ui.setLetter(action.turn, action.position, action.letter);
        }
    };
    return GameController;
}());
export { GameController };
>>>>>>> origin/refactor/bianca.craciun
