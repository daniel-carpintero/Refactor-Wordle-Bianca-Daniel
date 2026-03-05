import { GameStatus } from "../GameStatus";

export interface INavigationHandler {
    navigate(status: GameStatus): void;
}