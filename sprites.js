import SpriteSheet from "./utils/SpriteSheet.js";

const sprites = new SpriteSheet();

sprites.add("player", "assets/images/player.png");
sprites.add("playerLeft", "assets/images/playerLeft.png");
sprites.add("playerRight", "assets/images/playerRight.png");
sprites.add("enemyShip", "assets/images/enemyShip.png");
sprites.add("laser", "assets/images/laserRed.png");
sprites.add("laserShot", "assets/images/laserRedShot.png");
sprites.add("enemyUFO", "assets/images/enemyUFO.png");

export { sprites };