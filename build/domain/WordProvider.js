export class WordProvider {
    constructor(words) {
        this._words = words;
    }
    getWord() {
        const randomIndex = Math.floor(Math.random() * this._words.length);
        return this._words[randomIndex];
    }
}
//# sourceMappingURL=WordProvider.js.map