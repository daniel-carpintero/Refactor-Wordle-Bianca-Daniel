import { IWordProvider } from "../interfaces/IWordProvider";

export class WordProvider implements IWordProvider{
    private readonly _words: string[];

    constructor(words: string[]) {
        this._words = words;
    }

    getWord(): string {
        const randomIndex = Math.floor(Math.random() * this._words.length);
        return this._words[randomIndex];
    }
}