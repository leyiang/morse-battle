import MorseCodeMachine from "../utils/MorseCodeMachine.js";
import { sprites } from "../sprites.js";

export default class World {
    constructor(width, height) {
        this.info = {
            width, height
        }

        this.sprites = sprites;
        this.machine = new MorseCodeMachine();
        this.entities = [];
    }

    init() {
        this.machine.listen();
        this.machine.onTrigger(( state ) => {
            console.log( state );
        });
    }

    update() {
        this.entities.forEach( entity => {
            entity.update();
        });
    }

    render( c ) {
        this.entities.forEach( entity => {
            entity.render( c );
        });
    }

    appendEntity( entity ) {
        this.entities.push( entity );
    }
}