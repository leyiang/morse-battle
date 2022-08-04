import Player from "./model/Player.js";
import Enemy from "./model/Enemy.js";
import { sprites } from "./sprites.js";
import World from "./model/World.js";

const screen = document.getElementById("screen");
const c = screen.getContext("2d");

const world = window.world = new World(800, 800);

screen.width = world.info.width;
screen.height = world.info.height;

sprites.load().then(() => {
    world.init();
    requestAnimationFrame(loop);
});

function backgroundLayer() {
    c.fillStyle = "#333";
    c.fillRect(0, 0, world.info.width, world.info.height);
}

const loop = () => {
    backgroundLayer();

    world.update();
    world.render(c);

    requestAnimationFrame(loop);
};
