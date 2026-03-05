import { GameStatus } from "../domain/GameStatus.js";

export interface INavigationHandler {
    navigate(status: GameStatus): void;
}