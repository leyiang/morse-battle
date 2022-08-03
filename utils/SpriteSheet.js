import { isFunc, isolate, loadImage } from "./shared.js";

export default class SpriteSheet {
    constructor() {
        this.sheet = new Map();
        this.promises = [];
    }

    loadSprite( src, callback ) {
        return new Promise((resolve) => {
            loadImage( src ).then( image => {
                if( isFunc(callback) ) {
                    callback( image );
                }

                resolve();
            });
        });
    }

    add( name, src ) {
        const promise = this.loadSprite(src, (image) => {
            this.sheet.set( name, image );
        });


        this.promises.push( promise );
    }

    load() {
        return Promise.all( this.promises ).then(() => {
            this.promises = [];
        });
    }

    get( name ) {
        return this.sheet.get( name );
    }
}