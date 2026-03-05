import { Word } from "../domain/Word";
import { Game } from "../domain/Game";
import { KeyboardInput } from "../infrastructure/KeyboardInput";
import { NavigationHandler } from "../infrastructure/NavigationHandler";
import { Interface } from "../infrastructure/Interface";
import { GameController } from "./GameController";
import { WordEvaluator } from "../domain/WordEvaluator.js";
import { MAX_WORD_SIZE, MAX_ATTEMPTS } from "../config/env";

export function createGameController(): GameController {
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

    return new GameController(
        game,
        ui,
        navigation,
        keyboardInput
    );
}