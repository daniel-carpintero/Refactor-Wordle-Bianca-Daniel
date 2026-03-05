import { IKeyboardInput } from "../interfaces/IKeyboardInput.js";

export class KeyboardInput implements IKeyboardInput {
    private readonly _validLetterCodes: string[] = [
        "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP",
        "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL",
        "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM",
        "Semicolon"
    ];

    isValidLetter(code: string): boolean {
        return this._validLetterCodes.includes(code);
    }

    isEnterKey(code: string): boolean {
        return code === "Enter";
    }

    isBackspaceKey(code: string): boolean {
        return code === "Backspace";
    }

    transformCodeToLetter(code: string): string {
        if (code === "Semicolon") return "Ñ";
        if (code.startsWith("Key")) return code.replace("Key", "");
        return "";
    }
}