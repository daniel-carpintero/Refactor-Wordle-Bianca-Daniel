import { Word } from "./Word.js";
import { Game } from "./Game.js";
import { KeyboardInput } from "./KeyboardInput.js";
import { NavigationHandler } from "./NavigationHandler.js";
import { Interface } from "./Interface.js";
import { GameController } from "./GameController.js";

const navigation = new NavigationHandler();
const keyboardInput = new KeyboardInput();
const ui = new Interface();

const wordsCollection: Word = new Word(["JUEGO","TALAR","BAILE","ANDAR","MONTE","PLAYA","PLATA", "ARBOL","QUESO"]);

const pickedWord: string = wordsCollection.getRandomWord();
console.log(pickedWord); 

const game: Game = new Game(pickedWord);

const controller = new GameController(
    game,
    ui,
    navigation,
    keyboardInput
);

Array.from(document.getElementsByClassName("key")).forEach(element =>
    element.addEventListener("click", (e) => {
        controller.handleKey((e.target as HTMLButtonElement).value);
    })
);

document.addEventListener("keydown", (e) => {
    controller.handleKey(e.code);
});