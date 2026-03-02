import {Word} from "./Word.js";
import {Game} from "./Game.js";
import { KeyboardInput } from "./KeyboardInput.js";
import { NavigationHandler } from "./NavigationHandler.js";
import { WordEvaluator } from "./WordEvaluator.js";

const navigation = new NavigationHandler();
const keyboardInput = new KeyboardInput();
const wordsCollection: Word = new Word(["JUEGO", "TALAR", "BAILE", "ANDAR", "MONTE", "PLAYA", "PLATA", "ARBOL", "QUESO"]);
const pickedWord: string = wordsCollection.getRandomWord();
console.log(pickedWord);

const game: Game = new Game(pickedWord, keyboardInput);

Array.from(document.getElementsByClassName("key")).forEach(element => element.addEventListener("click", (e)=>{
    if(keyboardInput.isEnterKey((<HTMLButtonElement>e.target).value)){
        const result = game.enterPressed();

        if(result.evaluation){
            result.evaluation.forEach((state, index) => {
                if(state === "right"){
                    game.interface.changeBackgroundPosition(game.turn - 1, index, "rightLetter");
                }

                if(state === "misplaced"){
                    game.interface.changeBackgroundPosition(game.turn - 1, index, "misplacedLetter");
                }

                if(state === "wrong"){
                    game.interface.changeBackgroundPosition(game.turn - 1, index, "wrongLetter");
                }
                
            });
        }

        navigation.navigate(result.status);
    } else {
        game.newKeyPressed((<HTMLButtonElement>e.target).value);
    }
}));

document.addEventListener("keydown", (e)=>{
    if(keyboardInput.isEnterKey(e.code)){
        const result = game.enterPressed();

        if(result.evaluation){
            result.evaluation.forEach((state, index) => {
                if(state === "right"){
                    game.interface.changeBackgroundPosition(game.turn - 1, index, "rightLetter");
                }

                if(state === "misplaced"){
                    game.interface.changeBackgroundPosition(game.turn - 1, index, "misplacedLetter");
                }

                if(state === "wrong"){
                    game.interface.changeBackgroundPosition(game.turn - 1, index, "wrongLetter");
                }
                
            });
        }

        navigation.navigate(result.status);
    } else {
        game.newKeyPressed(e.code);
    }
});