import SpaceShuttle from "./SpaceShuttle.js";

export default class Enemy extends SpaceShuttle {
    constructor( spriteName ) {
        super(100, 100, 98, 50);
        this.sprite = world.sprites.get( spriteName );
        this.acc.set( Math.random(), Math.random() ).normalize().multNum(.01);
    }

    update() {
        super.update();
        if( this.vel.mag() > 5 ) this.vel.setMag(5);
    }

    render( c ) {
        this.translateCenter(c, () => {
            c.drawImage( this.sprite, 0, 0, this.size.x, this.size.y );
        });
    }
}