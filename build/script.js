import { Word } from "./Word.js";
import { Game } from "./Game.js";
import { KeyboardInput } from "./KeyboardInput.js";
import { NavigationHandler } from "./NavigationHandler.js";
import { Interface } from "./Interface.js";
import { GameController } from "./GameController.js";
import { WordEvaluator } from './WordEvaluator.js';
import { MAX_WORD_SIZE, MAX_ATTEMPTS } from "./env.js";
const navigation = new NavigationHandler();
const keyboardInput = new KeyboardInput();
const ui = new Interface();
const wordEvaluator = new WordEvaluator();
const wordCollection = new Word([
    "JUEGO", "TALAR", "BAILE", "ANDAR", "MONTE",
    "PLAYA", "PLATA", "ARBOL", "QUESO"
]);
const pickedWord = wordCollection.getRandomWord();
const game = new Game(pickedWord, wordEvaluator, MAX_WORD_SIZE, MAX_ATTEMPTS);
const controller = new GameController(game, ui, navigation, keyboardInput);
Array.from(document.getElementsByClassName("key")).forEach(element => {
    element.addEventListener("click", (e) => {
        controller.handleKey(e.target.value);
    });
});
document.addEventListener("keydown", (e) => {
    controller.handleKey(e.code);
});
//# sourceMappingURL=script.js.map