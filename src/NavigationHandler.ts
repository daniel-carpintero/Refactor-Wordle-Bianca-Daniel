import { GameStatus } from "./GameStatus";

export class NavigationHandler {
    navigate(status: GameStatus) {
        if(status == GameStatus.WIN){
            location.assign("/winner");
        }

        if(status == GameStatus.LOSE){
            location.assign("/loser");
        }
    }
}