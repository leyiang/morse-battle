import SpaceShuttle from "./SpaceShuttle.js";
import Missile from "./Missile.js";
import { splice } from "../utils/shared.js";

export default class Player extends SpaceShuttle {
    constructor(config) {
        super( config );

        this.set(
            world.info.width / 2,
            world.info.height - 80
        );

        this.targets = new Set();
        this.missles = [];

        window.addEventListener("keydown", e => {
            let xDir = 0, yDir = 0;

            if( e.key === "ArrowLeft" ) {
                xDir = -1;
            }

            if( e.key === "ArrowRight" ) {
                xDir = 1;
            }

            if( e.key === "ArrowUp" ) {
                yDir = -1;
            }

            if( e.key === "ArrowDown" ) {
                yDir = 1;
            }

            this.acc.set(xDir, yDir).multNum( 10 );
        });

        window.addEventListener("keyup", e => {
            this.acc.set(0, 0);
        });

        this.renderInstance = null;
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

    render( renderQueue ) {
        this.renderInstance = (c) => {
            this.renderTargetLine(c);
            this.translateCenter(c, () => {
                c.drawImage(this.sprite, 0, 0, this.size.x, this.size.y );
            });
        };

        renderQueue.addRender( this.renderInstance );
    }

    aim( shuttle ) {
        if( shuttle === this ) return;

        if( shuttle instanceof SpaceShuttle ) {
            this.targets.add( shuttle );
        }
    }

    fire() {
        const { x, y } = this;

        this.targets.forEach( target => {
            const missile = new Missile(this, {
                sprite: "laser",
                x, y, maxSpeed: 15
            });

            missile.setTarget( target )
            world.appendEntity( missile );
        });
    }

    shuttleDestroyed( target ) {
        this.targets.delete( target );
    }
}