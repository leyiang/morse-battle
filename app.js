import Player from "./model/Player.js";
import Enemy from "./model/Enemy.js";
import { sprites } from "./sprites.js";
import World from "./model/World.js";

const screen = document.getElementById("screen");
const c = screen.getContext("2d");

const world = window.world = new World(800, 800);

screen.width = world.info.width;
screen.height = world.info.height;

let player, enemy, boss;
sprites.load().then(() => {
    enemy = new Enemy({
        sprite: "enemyShip",
        x: 100,
        y: 100,
        maxSpeed: 5,
    });

    boss = new Enemy({
        sprite: "enemyUFO",
        x: 400,
        y: 100,
        maxSpeed: 2,
    });

    player = new Player("player");

    world.appendEntity(player);
    world.appendEntity(enemy);
    world.appendEntity(boss);

    start();
});

const start = () => {
    player.aim(enemy);
    player.aim(boss);

    requestAnimationFrame(loop);
}

window.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        player.fire();
    }
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
