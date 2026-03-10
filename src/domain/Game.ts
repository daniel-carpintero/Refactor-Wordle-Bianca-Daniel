import { LetterAddAction } from "../types/letterAddAction.js";
import { LetterDeleteAction } from "../types/letterDeleteAction.js";
import { IGame } from "../interfaces/IGame.js";

export type KeyAction = LetterAddAction | LetterDeleteAction | null;

export class Game implements IGame{
    private _pickedWord: string;
    private _currentWord: string;
    private _currentPosition: number;
    private _turn: number;  
    private readonly _maxWordSize: number;
    private readonly _maxAttempts: number;
    
    constructor(pickedWord: string, maxWordSize: number, maxAttempts: number){
        this._pickedWord = pickedWord;
        this._currentWord = "";
        this._currentPosition = 0;
        this._turn = 1;
        this._maxWordSize = maxWordSize;
        this._maxAttempts = maxAttempts;
    }

    get currentWord(): string {
        return this._currentWord;
    }

    set currentWord(currentWord: string) {
        this._currentWord = currentWord;
    }

    resetCurrentWord(): void {
        this._currentWord = "";
    }

    appendLetter(letter: string): void {
        this._currentWord += letter;
    }

    get currentPosition(): number {
        return this._currentPosition;
    }

    set currentPosition(currentPosition: number) {
        this._currentPosition = currentPosition;
    }

    incrementCurrentPosition(): void {
        this._currentPosition++;
    }

    decrementCurrentPosition(): void {
        this._currentPosition--;
    }

    resetCurrentPosition(): void {
        this._currentPosition = 0;
    }

    get pickedWord(): string {
        return this._pickedWord;
    }

    get turn(): number {
        return this._turn;
    }

    incrementTurn(): void {
        this._turn++;
    }

    removeLastLetter(): void {
        this._currentWord = this._currentWord.slice(0, -1);
    }

    get maxWordSize(): number {
        return this._maxWordSize;
    }

    get maxAttempts(): number {
        return this._maxAttempts;
    }
}