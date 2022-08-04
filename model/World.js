import MorseCodeMachine from "../utils/MorseCodeMachine.js";
import { sprites } from "../sprites.js";
import { splice } from "../utils/shared.js";
import RenderQueue from "../utils/RenderQueue.js";

export default class World {
    constructor(width, height) {
        this.info = {
            width, height
        }

        this.renderQueue = new RenderQueue();
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
        this.renderQueue.render( c );

        // this.entities.forEach( entity => {
        //     entity.render( c );
        // });
    }

    appendEntity( entity ) {
        this.entities.push( entity );
        entity.render(this.renderQueue);
    }

    removeEntity( entity ) {
        splice( this.entities, entity );
        this.renderQueue.removeRender( entity.renderInstance );
    }
}