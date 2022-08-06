import SpaceShuttle from "./SpaceShuttle.js";
import Missile from "./Missile.js";
import Vec from "./Vec.js";

export default class Player extends SpaceShuttle {
    constructor(config) {
        super( config );

        this.sprite_list = {
            normal: world.sprites.get("player"),
            left: world.sprites.get("playerLeft"),
            right: world.sprites.get("playerRight"),
        }

        this.set(
            world.info.width / 2,
            world.info.height - 80
        );

        this.targets = new Set();
        this.missles = [];

        this.friction = new Vec(1, 1);
        this.renderInstance = null;
    }

    onKeydown(e) {
        let { x, y } = this.acc.clone().divNum( 2 );

        if( e.key === "ArrowLeft" ) {
            this.sprite = this.sprite_list.left;
        } else if ( e.key === "ArrowRight" ) {
            this.sprite = this.sprite_list.right;
        }

        if( e.key === "ArrowLeft" || e.key === "ArrowRight" ) {
            this.friction.x = 1;
        } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            this.friction.y = 1;
        }

        if( e.key === "ArrowLeft" ) x = -1;
        if( e.key === "ArrowRight" ) x = 1;
        if( e.key === "ArrowUp" ) y = -1;
        if( e.key === "ArrowDown" ) y = 1;

        this.acc.set(x, y).multNum( 2 );
    }

    onKeyup(e) {
        let frictionRaw = .7;

        if( e.key === "ArrowLeft" || e.key === "ArrowRight" ) {
            this.sprite = this.sprite_list.normal;
            this.friction.x = frictionRaw;
        } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            this.friction.y = frictionRaw;
        }
    }

    update() {
        super.update();

        this.acc.mul( this.friction );
        this.vel.mul( this.friction );
    }

    renderTargetLine(c) {
        this.targets.forEach( target => {
            if( target.removed ) {
                this.offTarget( target );
                return;
            }

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

    offTarget( target ) {
        this.targets.delete( target );
    }

    fire() {
        const { x, y } = this;

        this.targets.forEach( target => {
            const missile = new Missile(this, {
                sprite: "laser", x, y,
                maxSpeed: 15
            });

            missile.setTarget( target )
            world.appendEntity( missile );
        });
    }

    shuttleDestroyed( target ) {
        this.targets.delete( target );
    }
}