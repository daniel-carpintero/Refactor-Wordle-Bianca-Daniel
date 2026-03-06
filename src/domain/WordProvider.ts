export class WordProvider {
    private readonly _words: string[];

    constructor(words: string[]) {
        this._words = words;
    }

    getRandomWord(): string {
        const randomIndex = Math.floor(Math.random() * this._words.length);
        return this._words[randomIndex];
    }
}