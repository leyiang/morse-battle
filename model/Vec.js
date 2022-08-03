export default class Vec {
    constructor(x, y) {
        this.set(x, y);
    }

    set(x = 0, y = 0) {
        this.x = x;
        this.y = y;

        return this;
    }

    add( vec ) {
        this.x += vec.x;
        this.y += vec.y;

        return this;
    }

    sub( vec ) {
        this.x -= vec.x;
        this.y -= vec.y;

        return this;
    }

    divNum(n) {
        this.x /= n;
        this.y /= n;

        return this;
    }

    multNum(n) {
        this.x *= n;
        this.y *= n;

        return this;
    }

    mag() {
        return Math.sqrt( this.x * this.x + this.y * this.y );
    }

    normalize() {
        this.divNum( this.mag() );
        return this;
    }

    copy( vec ) {
        this.set( vec.x, vec.y );
    }

    clone() {
        return new Vec(
            this.x,
            this.y
        );
    }

    setMag( mag ) {
        return this.normalize().multNum(mag);
    }
}