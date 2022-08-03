import Player from "./model/Player.js";
import MorseCodeMachine from "./utils/MorseCodeMachine.js";

const screen = document.getElementById("screen");
const c = screen.getContext("2d");
const machine = new MorseCodeMachine();

const world = {
    w: 500,
    h: 800
};

screen.width = world.w;
screen.height = world.h;

machine.listen();

machine.onTrigger(( state ) => {
    console.log( state );
});

c.fillStyle = "#333";
c.fillRect(0, 0, world.w, world.h );

function loadImage( src ) {
    return new Promise((resolve) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.src = src;
    });
}

loadImage("./assets/player.png").then( playerImage => {
    const player = new Player(world, {
        normal: playerImage,
    });

    player.render( c );
});
