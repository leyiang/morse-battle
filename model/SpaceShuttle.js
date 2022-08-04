import { isFunc, isolate } from "../utils/shared.js";
import Entity from "./Entity.js";

export default class SpaceShuttle extends Entity {
    constructor( config ) {
        super( config );
    }

    getDefaultSprite() {
        if( this.sprites instanceof Image ) return this.sprites;
        return this.sprites?.idle;
    }

    getCorrectSprite( type = null ) {
        if( type ) {

        } else {
            return this.getDefaultSprite();
        }
    }
}