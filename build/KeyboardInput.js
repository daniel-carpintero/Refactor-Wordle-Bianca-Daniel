export class KeyboardInput {
    constructor() {
        this._validLetterCodes = [
            "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP",
            "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL",
            "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM",
            "Semicolon"
        ];
    }
    isValidLetter(code) {
        return this._validLetterCodes.includes(code);
    }
    isEnterKey(code) {
        return code === "Enter";
    }
    isBackspaceKey(code) {
        return code === "Backspace";
    }
    transformCodeToLetter(code) {
        if (code === "Semicolon")
            return "Ñ";
        if (code.startsWith("Key"))
            return code.replace("Key", "");
        return "";
    }
}
//# sourceMappingURL=KeyboardInput.js.map