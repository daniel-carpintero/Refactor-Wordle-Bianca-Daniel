import { GameStatus } from "../domain/GameStatus.js";
import { INavigationHandler } from "../interfaces/INavigationHandler.js";

export class NavigationHandler implements INavigationHandler{
    navigate(status: GameStatus) {
        if(status == GameStatus.WIN){
            location.assign("/winner");
        }

        if(status == GameStatus.LOSE){
            location.assign("/loser");
        }
    }
}