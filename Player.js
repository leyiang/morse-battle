export default class Player {
    constructor( world, sprites ) {
        this.sprites = sprites;

        this.info = {
            x: 0,
            y: 0,
            w: 99,
            h: 75
        }

        this.info.x = world.w / 2 - this.info.w / 2;
        this.info.y = world.h - this.info.h - 80;
    }

    render( c ) {
        const { x, y } = this.info;
        c.drawImage( this.sprites.normal, x, y );
    }
}