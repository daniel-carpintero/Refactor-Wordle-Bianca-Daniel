
export interface IGame {
    currentWord: string;
    resetCurrentWord(): void;
    appendLetter(letter: string): void;
    removeLastLetter(): void;

    currentPosition: number;
    incrementCurrentPosition(): void;
    decrementCurrentPosition(): void;
    resetCurrentPosition(): void;

    readonly pickedWord: string;

    readonly turn: number;
    incrementTurn(): void;

    maxWordSize: number;
    maxAttempts: number;
}