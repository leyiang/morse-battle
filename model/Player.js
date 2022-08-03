import SpaceShuttle from "./SpaceShuttle.js";
import Missile from "./Missile.js";

export default class Player extends SpaceShuttle {
    constructor( spriteName ) {
        super( 0, 0, 99, 75 );
        this.set(
            world.info.width / 2,
            world.info.height - 80
        );

        this.sprite = world.sprites.get( spriteName );

        this.targets = [];
        this.missles = [];
    }

    renderTargetLine(c) {
        this.targets.forEach( target => {
            c.beginPath();
            c.moveTo( this.x, this.y );
            c.lineTo( target.x, target.y );
            c.strokeStyle = "#999";
            c.stroke();
            c.closePath();
        });
    }

    render( c ) {
        this.renderTargetLine(c);
        this.translateCenter(c, () => {
            c.drawImage(this.sprite, 0, 0, this.size.x, this.size.y );
        });
    }

    aim( shuttle ) {
        if( shuttle === this ) return;

        if( shuttle instanceof SpaceShuttle ) {
            this.targets.push( shuttle );
        }
    }

    fire() {
        const { x, y } = this;

        this.targets.forEach( target => {
            const missile = new Missile( x, y, "laser" );
            missile.setTarget( target )
            world.appendEntity( missile );
        });
    }
}