import { isFunc, isolate } from "../utils/shared.js";
import Vec from "./Vec.js";

export default class Entity extends Vec {
    constructor(x, y, w, h) {
        super(x, y);

        this.size = new Vec(w, h);
        this.angle = null;

        this.vel = new Vec();
        this.acc = new Vec();
    }

    update() {
        this.vel.add( this.acc );
        this.add( this.vel );
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