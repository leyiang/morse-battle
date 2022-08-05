import SpaceShuttle from "./SpaceShuttle.js";
import { isolate, randomInt } from "../utils/shared.js";

export default class Enemy extends SpaceShuttle {
    constructor( config, letter, code ) {
        super( config );

        this.letter = letter;
        this.code = code;
        this.removed = false;

        this.setSprite( config.sprite );
        this.acc.set( randomInt(2), randomInt(10) ).setMag(.1);
    }

    update() {
        super.update();

        if( this.x < 0 || this.x > world.info.width + this.size.x || this.y > world.info.height + this.size.y ) {
            world.slip( this );
            this.remove()
        }
    }

    render( renderQueue ) {
        const radius = Math.min( this.size.x, this.size.y ) / 2;
        this.renderInstance = (c) => {
            this.translateCenter(c, () => {
                c.drawImage( this.sprite, 0, 0, this.size.x, this.size.y );
            });

            isolate(c, () => {
                let width = 100;
                let height = 50;

                c.translate( this.x - width/2, this.y - this.size.y / 2 - height - 10);

                c.fillStyle = "#EEE";
                c.fillRect( 0, 0, width, height );

                c.fillStyle = "#000";
                c.font = "bold 20px Arial";
                c.fillText(this.letter.toUpperCase(), width / 2 - 10, 20);

                c.fillStyle = "#000";
                c.font = "bold 20px Courier New";
                let codeWidth = this.code.length * 14;
                c.fillText(this.code, width / 2 - codeWidth/2, 40);
            })
        };

        renderQueue.addRender( this.renderInstance );
    }

    explode() {
        this.remove();
    }

    remove() {
        world.removeEntity( this );
        this.removed = true;
        this.acc.set();
        this.vel.set();
    }
}