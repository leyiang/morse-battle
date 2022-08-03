import Player from "./model/Player.js";
import Enemy from "./model/Enemy.js";
import MorseCodeMachine from "./utils/MorseCodeMachine.js";
import { sprites } from "./sprites.js";
import World from "./model/World.js";

const screen = document.getElementById("screen");
const c = screen.getContext("2d");

const world = window.world = new World( 500, 500 );

screen.width = world.info.width;
screen.height = world.info.height;

let player, enemy;
sprites.load().then(() => {
    enemy = new Enemy("enemyShip");
    player = new Player("player");

    world.appendEntity( player );
    world.appendEntity( enemy );

    start();
});

const start = () => {
    player.aim( enemy );

    requestAnimationFrame( loop );
}

window.addEventListener("keydown", e => {
    if( e.key === "Enter" ) {
        player.fire();
    }
});

function backgroundLayer() {
    c.fillStyle = "#333";
    c.fillRect(0, 0, world.info.width, world.info.height );
}

const loop = () => {
    backgroundLayer();

    world.update();
    world.render( c );

    requestAnimationFrame( loop );
};
