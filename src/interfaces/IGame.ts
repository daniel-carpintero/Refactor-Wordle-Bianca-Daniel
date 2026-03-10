export interface IGame {
    readonly currentWord: string;
    resetCurrentWord(): void;
    appendLetter(letter: string): void;
    removeLastLetter(): void;

    readonly currentPosition: number;
    incrementCurrentPosition(): void;
    decrementCurrentPosition(): void;
    resetCurrentPosition(): void;

    readonly pickedWord: string;

    readonly turn: number;
    incrementTurn(): void;

    readonly maxWordSize: number;
    readonly maxAttempts: number;
}