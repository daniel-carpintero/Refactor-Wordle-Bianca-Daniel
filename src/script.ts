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

function handleKey(code: string){
    if(keyboardInput.isEnterKey(code)){
        const result = game.enterPressed();

        if(result.evaluation){
            result.evaluation.forEach((state, index) => {
                if(state === "right"){
                    _interface.changeBackgroundPosition(game.turn - 1, index, "rightLetter");
                }

                if(state === "misplaced"){
                    _interface.changeBackgroundPosition(game.turn - 1, index, "misplacedLetter");
                }

                if(state === "wrong"){
                    _interface.changeBackgroundPosition(game.turn - 1, index, "wrongLetter");
                }
                
            });
        }

        navigation.navigate(result.status);
    } else {
        const action = game.newKeyPressed(code);

        if(action != null){
             if(action.type === "add"){
                _interface.setNewLetter(action?.turn, action?.position, action.letter);
            }

            if(action.type === "delete"){
                _interface.deleteLetter(action.turn, action.position);
            }

            _interface.changeBackgroundKey(code);
        }
    }
}

Array.from(document.getElementsByClassName("key")).forEach(element => 
    element.addEventListener("click", (e)=>{
    handleKey((<HTMLButtonElement>e.target).value);
}));

document.addEventListener("keydown", (e)=>{
    handleKey(e.code);
});