import { createGameController } from "./application/GameFactory.js";
const controller = createGameController();
Array.from(document.getElementsByClassName("key")).forEach(element => {
    element.addEventListener("click", (event) => {
        controller.handleKey(event.target.value);
    });
});
document.addEventListener("keydown", (event) => {
    controller.handleKey(event.code);
});
//# sourceMappingURL=script.js.map