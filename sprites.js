import SpriteSheet from "./utils/SpriteSheet.js";

const sprites = new SpriteSheet();

sprites.add("player", "./assets/player.png");
sprites.add("enemyShip", "./assets/enemyShip.png");
sprites.add("laser", "./assets/laserRed.png");

export { sprites };
