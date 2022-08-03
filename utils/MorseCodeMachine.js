export default class MorseCodeMachine {
    static TAP = 0;
    static PRESS = 1;

    /**
     * @param tapUnit (ms)
     */
    constructor( tapUnit = 50 ) {
        this.keyState = new Map();
        this.triggers = [];

        this.config = {
            tapUnit,
            pressUnit: tapUnit * 3
        };
    }

    listen() {
        window.addEventListener("keydown", e => {
            const key = e.key;

            if( ! this.keyState.has(key) ) {
                this.keyState.set( key, Date.now() );
            }
        });

        window.addEventListener("keyup", e => {
            const key = e.key;

            if( this.keyState.has(key) ) {
                const timestamp = this.keyState.get( key );
                const delta = Date.now() - timestamp;

                if( delta > this.config.pressUnit ) {
                    this.emit( MorseCodeMachine.PRESS );
                } else if( delta > this.config.tapUnit ) {
                    this.emit( MorseCodeMachine.TAP );
                }

                // Remove the state
                this.keyState.delete( key );
            } else {
                // Something went wrong.
            }
        });
    }

    onTrigger( callback ) {
        if( typeof callback === "function" ) {
            this.triggers.push( callback );
        }
    }

    emit( type ) {
        this.triggers.forEach( callback => {
            // ture => press, false => tap
            const state = type === MorseCodeMachine.PRESS;
            if( typeof callback === "function" ) callback( state );
        });
    }
}