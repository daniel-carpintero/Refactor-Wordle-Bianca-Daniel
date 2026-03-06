export class GameController {
    constructor(game, ui, navigation, keyboard) {
        this._game = game;
        this._interface = ui;
        this._navigation = navigation;
        this._keyboard = keyboard;
    }
    handleEnter() {
        const currentWord = this._game.currentWord;
        const result = this._game.enterPressed();
        const evaluation = result.evaluation;
        const turn = result.evaluatedTurn;
        if (evaluation && turn !== null) {
            this._interface.renderEvaluation(turn, currentWord, evaluation);
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