import SpaceShuttle from "./SpaceShuttle.js";
import { isolate } from "../utils/shared.js";

export default class Enemy extends SpaceShuttle {
    constructor( config, letter, code ) {
        super( config );

        this.letter = letter;
        this.code = code;

        this.setSprite( config.sprite );
        // this.acc.set( Math.random(), Math.random() ).setMag(.1);
    }

    render( renderQueue ) {
        const radius = Math.min( this.size.x, this.size.y ) / 2;
        this.renderInstance = (c) => {
            this.translateCenter(c, () => {
                c.drawImage( this.sprite, 0, 0, this.size.x, this.size.y );

                // isolate(c, () => {
                //     c.fillStyle = "pink";
                //     c.globalAlpha = .5;
                //     c.arc(0, 0, radius, 0, Math.PI * 2);
                //     c.fill();
                // })

                c.fillStyle = "#000";
                c.font = "bold 20px Arial";

                c.fillText(this.letter, this.size.x / 2 - 7, 19);
            });
        };

        renderQueue.addRender( this.renderInstance );
    }

    explode() {
        world.removeEntity( this );
        this.acc.set();
        this.vel.set();
    }
}