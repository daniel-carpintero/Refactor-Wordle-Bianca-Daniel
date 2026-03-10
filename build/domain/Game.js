export class Game {
    constructor(pickedWord, maxWordSize, maxAttempts) {
        this._pickedWord = pickedWord;
        this._currentWord = "";
        this._currentPosition = 0;
        this._turn = 1;
        this._maxWordSize = maxWordSize;
        this._maxAttempts = maxAttempts;
    }
    get currentWord() {
        return this._currentWord;
    }
    resetCurrentWord() {
        this._currentWord = "";
    }
    appendLetter(letter) {
        this._currentWord += letter;
    }
    get currentPosition() {
        return this._currentPosition;
    }
    incrementCurrentPosition() {
        this._currentPosition++;
    }
    decrementCurrentPosition() {
        this._currentPosition--;
    }
    resetCurrentPosition() {
        this._currentPosition = 0;
    }
    get pickedWord() {
        return this._pickedWord;
    }
    get turn() {
        return this._turn;
    }
    incrementTurn() {
        this._turn++;
    }
    removeLastLetter() {
        this._currentWord = this._currentWord.slice(0, -1);
    }
    get maxWordSize() {
        return this._maxWordSize;
    }
    get maxAttempts() {
        return this._maxAttempts;
    }
}
//# sourceMappingURL=Game.js.map