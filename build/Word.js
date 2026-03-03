export class Word {
    constructor(wordsArray) {
        this._words = wordsArray;
    }
    get Words() {
        return this._words;
    }
    set Words(wordsArray) {
        this._words = wordsArray;
    }
    getRandomWord() {
        const min = 0;
        const max = this._words.length - 1;
        return this._words[Math.floor(Math.random() * (max - min + 1))];
    }
}
//# sourceMappingURL=Word.js.map