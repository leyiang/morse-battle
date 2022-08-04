import SpaceShuttle from "./SpaceShuttle.js";
import { defineEntityConfig } from "./Entity.js";

export default class Enemy extends SpaceShuttle {
    constructor( config ) {
        // spriteName, x, y, w, h
        super( config );
        this.setSprite( config.sprite );
        this.acc.set( Math.random(), Math.random() ).normalize().multNum(.01);
    }

    update() {
        super.update();
        if( this.vel.mag() > 5 ) this.vel.setMag(5);
    }

    getLetter() {
        return "E";
    }

    render( renderQueue ) {
        this.renderInstance = (c) => {
            this.translateCenter(c, () => {
                c.drawImage( this.sprite, 0, 0, this.size.x, this.size.y );

                c.fillStyle = "#000";
                c.font = "bold 20px Arial";

                let letter = this.getLetter();
                c.fillText(letter, this.size.x / 2 - 7, 19);
            });
        };

        renderQueue.addRender( this.renderInstance );
    }

    explode() {
        world.removeEntity( this );
    }
}