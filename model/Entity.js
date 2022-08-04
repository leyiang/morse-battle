import { isFunc, isolate } from "../utils/shared.js";
import Vec from "./Vec.js";

export function defineEntityConfig( config ) {
    const defaultConfig = {
        x: 0, y: 0, w: 0, h: 0, maxSpeed: 2, sprite: null
    }

    if( typeof config === "string" ) {
        defaultConfig.sprite = config;
        return defaultConfig;
    }

    return {
        ...defaultConfig,
        ...config
    }
}

export default class Entity extends Vec {
    constructor( config ) {
        super( config.x, config.y );

        this.config = defineEntityConfig( config );

        this.angle = null;
        this.size = new Vec();
        this.vel = new Vec();
        this.acc = new Vec();

        this.setSprite( this.config.sprite );
    }

    update() {
        this.vel.add( this.acc );
        this.vel.limit( this.config.maxSpeed );

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

    collide( entity ) {
        let r = Math.min( this.size.x, this.size.y ) / 2;
        let r1 = Math.min( entity.size.x, entity.size.y ) / 2;

        const dist = entity.clone().sub( this );

        return dist.mag() < r + r1;
    }
}