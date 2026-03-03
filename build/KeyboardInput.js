<<<<<<< HEAD
export class KeyboardInput {
    constructor() {
        this._validLetterCodes = ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Semicolon"];
    }
    get validLetterCodes() {
        return this._validLetterCodes;
    }
    set validLetterCodes(letters) {
        this._validLetterCodes = letters;
    }
    isValidLetter(code) {
        return this._validLetterCodes.includes(code);
    }
    isEnterKey(code) {
        return code == "Enter";
    }
    isBackspaceKey(code) {
        return code == "Backspace";
    }
    transformCodeToLetter(code) {
        if (code === "Semicolon")
            return "Ñ";
        return code.startsWith("Key")
            ? code.replace("Key", "").toUpperCase()
            : "";
    }
}
//# sourceMappingURL=KeyboardInput.js.map
=======
var KeyboardInput = /** @class */ (function () {
    function KeyboardInput() {
        this._validLetterCodes = [
            "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP",
            "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL",
            "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM",
            "Semicolon"
        ];
    }
    KeyboardInput.prototype.isValidLetter = function (code) {
        return this._validLetterCodes.includes(code);
    };
    KeyboardInput.prototype.isEnterKey = function (code) {
        return code === "Enter";
    };
    KeyboardInput.prototype.isBackspaceKey = function (code) {
        return code === "Backspace";
    };
    KeyboardInput.prototype.transformCodeToLetter = function (code) {
        if (code === "Semicolon")
            return "Ñ";
        if (code.startsWith("Key"))
            return code.replace("Key", "");
        return "";
    };
    return KeyboardInput;
}());
export { KeyboardInput };
>>>>>>> origin/refactor/bianca.craciun
