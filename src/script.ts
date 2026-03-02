import {Word} from "./Word.js";
import {Game} from "./Game.js";
import { KeyboardInput } from "./KeyboardInput.js";
import { NavigationHandler } from "./NavigationHandler.js";
import { Interface } from "./Interface.js";

const navigation = new NavigationHandler();
const keyboardInput = new KeyboardInput();
const _interface = new Interface();

const wordsCollection: Word = new Word(["JUEGO", "TALAR", "BAILE", "ANDAR", "MONTE", "PLAYA", "PLATA", "ARBOL", "QUESO"]);

const pickedWord: string = wordsCollection.getRandomWord();
console.log(pickedWord);

const game: Game = new Game(pickedWord, keyboardInput);

function handleKey(code: string) {
    if (keyboardInput.isEnterKey(code)) {
        const result = game.enterPressed();

        if (result.evaluation) {
            const evaluatedTurn = game.turn - 1;

            result.evaluation.forEach((state, index) => {
                if (state) {
                    _interface.setCellState(evaluatedTurn, index, state);
                }
            });
        }

        navigation.navigate(result.status);
        return;
    }

    const action = game.newKeyPressed(code);
    if (!action) return;

    if (action.type === "add") {
        _interface.setLetter(action.turn, action.position, action.letter);
    }

    if (action.type === "delete") {
        _interface.clearLetter(action.turn, action.position);
    }
}

Array.from(document.getElementsByClassName("key")).forEach(element => 
    element.addEventListener("click", (e)=>{
    handleKey((<HTMLButtonElement>e.target).value);
}));

document.addEventListener("keydown", (e)=>{
    handleKey(e.code);
});