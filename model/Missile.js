import Entity from "./Entity.js";

export default class Missile extends Entity {
    constructor( from, config ) {
        super( config );

        this.target = null;
        this.rotate = null;
        this.from = from;
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

    render( renderQueue ) {
        this.renderInstance = (c) => {
            this.translateCenter(c, () => {
                c.drawImage( this.sprite, 0, 0 );
            });
        };

        renderQueue.addRender( this.renderInstance, 9 );
    }

    update() {
        super.update();
        if( this.vel.mag() > 15 ) this.vel.setMag(15);
        if( this.target ) this.track();
    }

    missionComplete() {
        this.target.explode();
        this.from.shuttleDestroyed( this.target );
        this.target = null;
    }

    explode() {
        this.missionComplete();

        this.acc.set();
        this.vel.set();
        this.setSprite( "laserShot", 56, 54 );

        setTimeout(() => {
            world.removeEntity( this );
        }, 40);
    }
}