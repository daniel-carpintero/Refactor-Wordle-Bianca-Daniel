import { createGameController } from "./application/GameFactory.js";

const controller = createGameController();

Array.from(document.getElementsByClassName("key")).forEach(element => {
    element.addEventListener("click", (event) => {
        controller.handleKey((event.target as HTMLButtonElement).value);
    });
});

document.addEventListener("keydown", (event) => {
    controller.handleKey(event.code);
});