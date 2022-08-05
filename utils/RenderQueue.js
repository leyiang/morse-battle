import { splice } from "./shared.js";

export default class RenderQueue {
    constructor() {
        this.queue = [];
    }

    render( c ) {
        c.clearRect(0, 0, c.canvas.width, c.canvas.height );
        this.queue.forEach( render => {
            render( c );
        });
    }

    getInsertIndex( render, renderIndex ) {
        let index = 0;

        for(; index < this.queue.length; index ++ ) {
            if( renderIndex < this.queue[index].renderIndex ) {
                return index;
            }
        }

        return index;
    }

    addRender( render, renderIndex=10 ) {
        render.renderIndex = renderIndex;
        render.index = this.getInsertIndex( render, renderIndex );
        this.queue.splice(render.index, 0, render );
    }

    removeRender( render ) {
        splice( this.queue, render );
    }
}