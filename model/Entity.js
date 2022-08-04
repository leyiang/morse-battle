import { isFunc, isolate } from "../utils/shared.js";
import Vec from "./Vec.js";

export function defineEntityConfig( config ) {
    if( typeof config === "string" ) {
        return {
            sprite: config,
        }
    }

    return config;
}

export default class Entity extends Vec {
    constructor( config ) {
        super( config.x, config.y );

        config = defineEntityConfig( config );

        this.angle = null;
        this.size = new Vec();
        this.vel = new Vec();
        this.acc = new Vec();
        this.renderIndex = 10;

        this.setSprite( config.sprite );
    }

    update() {
        this.vel.add( this.acc );
        this.add( this.vel );
    }

    setSprite( name ) {
        this.sprite = world.sprites.get( name );

        this.size.set(
           this.sprite.width,
           this.sprite.height
        );
    }

    /**
     * @param c Context2D
     * @param callback
     */
    translateCenter( c, callback ) {
        const { x, y } = this;
        const { x: w, y: h } = this.size;

        isolate(c, () => {
            c.translate( x - w/2, y - h/2 );

            if( this.angle ) {
                c.translate(w/2, h/2);
                c.rotate( this.angle );
                c.translate(-w/2, -h/2);
            }

            if( isFunc(callback) ) {
                callback();
            }
        });
    }
}