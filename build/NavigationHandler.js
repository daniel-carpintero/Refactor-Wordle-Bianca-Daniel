import { GameStatus } from "./GameStatus.js";
var DEFAULT_ROUTES = {
    win: "/winner",
    lose: "/loser"
};
var NavigationHandler = /** @class */ (function () {
    function NavigationHandler(routes) {
        if (routes === void 0) { routes = DEFAULT_ROUTES; }
        this._routes = routes;
    }
    NavigationHandler.prototype.navigate = function (status) {
        if (status === GameStatus.WIN) {
            location.assign(this._routes.win);
        }
        if (status === GameStatus.LOSE) {
            location.assign(this._routes.lose);
        }
    };
    return NavigationHandler;
}());
export { NavigationHandler };
