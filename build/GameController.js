export class GameController {
    constructor(game, ui, navigation, keyboard) {
        this._game = game;
        this._interface = ui;
        this._navigation = navigation;
        this._keyboard = keyboard;
    }
    handleKey(code) {
        if (this._keyboard.isEnterKey(code)) {
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
            return;
        }
        if (this._keyboard.isBackspaceKey(code)) {
            const action = this._game.backspacePressed();
            if (action) {
                this._interface.clearLetter(action.turn, action.position);
            }
            return;
        }
        if (this._keyboard.isValidLetter(code)) {
            const letter = this._keyboard.transformCodeToLetter(code);
            const action = this._game.addLetter(letter);
            if (action) {
                this._interface.setLetter(action.turn, action.position, action.letter);
            }
        }
    }
}
//# sourceMappingURL=GameController.js.map