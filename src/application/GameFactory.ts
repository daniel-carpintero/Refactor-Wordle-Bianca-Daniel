import { WordProvider } from "../domain/WordProvider.js";
import { IGame } from "../interfaces/IGame.js";
import { Game } from "../domain/Game.js";
import { KeyboardInput } from "../infrastructure/KeyboardInput.js";
import { NavigationHandler } from "../infrastructure/NavigationHandler.js";
import { Interface } from "../infrastructure/Interface.js";
import { GameController } from "./GameController.js";
import { WordEvaluator } from "../domain/WordEvaluator.js";
import { MAX_WORD_SIZE, MAX_ATTEMPTS } from "../config/env.js";
import { GameActions } from "../domain/GameActions.js";

export function createGameController(): GameController {
    const navigation = new NavigationHandler();
    const keyboardInput = new KeyboardInput();
    const ui = new Interface();
    const wordEvaluator = new WordEvaluator(MAX_WORD_SIZE);

    const wordCollection = new WordProvider([
        "JUEGO", "TALAR", "BAILE", "ANDAR", "MONTE",
        "PLAYA", "PLATA", "ARBOL", "QUESO"
    ]);
    
    const pickedWord = wordCollection.getRandomWord();

    const game: IGame = new Game(pickedWord, MAX_WORD_SIZE, MAX_ATTEMPTS);
    const gameActions = new GameActions(game, wordEvaluator);

    return new GameController(
        game,
        gameActions,
        ui,
        navigation,
        keyboardInput
    );
}