import { sprites } from "./sprites.js";
import World from "./model/World.js";

const screen = document.getElementById("screen");
const c = screen.getContext("2d");

const world = window.world = new World(480, 800);

screen.width = world.info.width;
screen.height = world.info.height;

sprites.load().then(() => {
    world.init();
    requestAnimationFrame(loop);
});

const loop = () => {
    world.update();
    world.render(c);

    requestAnimationFrame(loop);
};
