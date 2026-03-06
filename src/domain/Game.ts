import { LetterAddAction } from "../types/letterAddAction.js";
import { LetterDeleteAction } from "../types/letterDeleteAction.js";
import { IGame } from "../interfaces/IGame.js";

export type KeyAction = LetterAddAction | LetterDeleteAction | null;

export class Game implements IGame{
    private _pickedWord: string;
    private _currentWord: string;
    private _currentPosition: number;
    private _turn: number;  
    
    constructor(pickedWord: string){
        this._pickedWord = pickedWord;
        this._currentWord = "";
        this._currentPosition = 0;
        this._turn = 1;
    }

    get currentWord(): string {
        return this._currentWord;
    }

    get currentPosition(): number {
        return this._currentPosition;
    }

    get pickedWord(): string {
        return this._pickedWord;
    }

    get turn(): number {
        return this._turn;
    }
}