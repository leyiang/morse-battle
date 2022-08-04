import SpriteSheet from "./utils/SpriteSheet.js";

const sprites = new SpriteSheet();

sprites.add("player", "./assets/player.png");
sprites.add("playerLeft", "./assets/playerLeft.png");
sprites.add("playerRight", "./assets/playerRight.png");
sprites.add("enemyShip", "./assets/enemyShip.png");
sprites.add("laser", "./assets/laserRed.png");
sprites.add("laserShot", "./assets/laserRedShot.png");
sprites.add("enemyUFO", "./assets/enemyUFO.png");

export { sprites };