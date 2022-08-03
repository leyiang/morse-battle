import Player from "./Player.js";

const screen = document.getElementById("screen");
const c = screen.getContext("2d");

const world = {
    w: 500,
    h: 800
};

screen.width = world.w;
screen.height = world.h;

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
