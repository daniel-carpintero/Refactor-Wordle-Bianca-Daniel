import { GameStatus } from "../domain/GameStatus";

export interface INavigationHandler {
    navigate(status: GameStatus): void;
}