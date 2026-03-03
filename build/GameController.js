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
