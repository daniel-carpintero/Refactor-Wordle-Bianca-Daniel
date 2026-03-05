import { Word } from "./domain/Word.js";
import { Game } from "./domain/Game.js";
import { KeyboardInput } from "./infrastructure/KeyboardInput.js";
import { NavigationHandler } from "./infrastructure/NavigationHandler.js";
import { Interface } from "./infrastructure/Interface.js";
import { GameController } from "./application/GameController.js";
import { WordEvaluator } from "./domain/WordEvaluator.js";
import { MAX_WORD_SIZE, MAX_ATTEMPTS } from "./config/env.js";

const navigation = new NavigationHandler();
const keyboardInput = new KeyboardInput();
const ui = new Interface();
const wordEvaluator = new WordEvaluator(MAX_WORD_SIZE);

const wordCollection = new Word([
    "JUEGO", "TALAR", "BAILE", "ANDAR", "MONTE",
    "PLAYA", "PLATA", "ARBOL", "QUESO"
]);

const pickedWord = wordCollection.getRandomWord();

const game: Game = new Game(pickedWord, wordEvaluator, MAX_WORD_SIZE, MAX_ATTEMPTS);

const controller = new GameController(
    game,
    ui,
    navigation,
    keyboardInput
);

Array.from(document.getElementsByClassName("key")).forEach(element => {
    element.addEventListener("click", (event) => {
        controller.handleKey((event.target as HTMLButtonElement).value);
    });
});

document.addEventListener("keydown", (event) => {
    controller.handleKey(event.code);
});