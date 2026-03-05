export class Word {
    constructor(words) {
        this._words = words;
    }
    getRandomWord() {
        const randomIndex = Math.floor(Math.random() * this._words.length);
        return this._words[randomIndex];
    }
}
//# sourceMappingURL=Word.js.map