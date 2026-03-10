import { LetterAddAction } from "../types/letterAddAction.js";
import { LetterDeleteAction } from "../types/letterDeleteAction.js";
import { TurnResult } from "../types/TurnResult.js";

export interface IGameActions {
    addLetter(letter: string): LetterAddAction | null;
    enterPressed(): TurnResult;
    backspacePressed(): LetterDeleteAction | null;
}