export interface IKeyboardInput {
    isEnterKey(code: string): boolean;
    isBackspaceKey(code: string): boolean;
    isValidLetter(code: string): boolean;
    transformCodeToLetter(code: string): string;
}