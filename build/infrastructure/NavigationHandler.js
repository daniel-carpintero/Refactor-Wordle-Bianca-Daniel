import { GameStatus } from "../domain/GameStatus.js";
export class NavigationHandler {
    navigate(status) {
        if (status == GameStatus.WIN) {
            location.assign("/winner");
        }
        if (status == GameStatus.LOSE) {
            location.assign("/loser");
        }
    }
}
//# sourceMappingURL=NavigationHandler.js.map