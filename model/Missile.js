import Entity from "./Entity.js";

export default class Missile extends Entity {
    constructor( x, y, spriteName ) {
        super(x, y, 9, 33);

        this.sprite = world.sprites.get( spriteName );
        this.target = null;
        this.rotate = null;
    }

    setTarget( target ) {
        this.target = target;
    }

    track() {
        this.angle = Math.atan2( this.y - this.target.y, this.x - this.target.x ) + Math.PI / 2;

        const dist = this.target.clone().sub( this );

        if( dist.mag() < 10 ) {
            return this.explode();
        }

        const dir = this.target.clone()
            .sub( this )
            .normalize()
            .multNum( .8 );

        this.acc.copy( dir );
    }

    render( c ) {
        this.translateCenter(c, () => {
            c.drawImage( this.sprite, 0, 0 );
        });
    }

    update() {
        super.update();
        if( this.vel.mag() > 15 ) this.vel.setMag(15);
        if( this.target ) this.track();
    }

    explode() {
        this.target = null;
        this.acc.set();
        this.vel.set();
        console.log( "BOOOOM" );
    }
}