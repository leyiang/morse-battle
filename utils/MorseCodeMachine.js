export default class MorseCodeMachine {
    static TAP = 0;
    static PRESS = 1;

    constructor( holder = null, tapUnit = 50 ) {
        this.keyState = new Map();
        this.triggers = [];

        this.config = {
            tapUnit,
            pressUnit: tapUnit * 3
        };

        this.holder = holder;
        this._word_value = "";
    }

    get word() {
        return this._word_value;
    }

    set word( value ) {
        this.holder.innerText = value;
        this._word_value = value;
    }

    listen() {
        window.addEventListener("keydown", e => {
            const key = e.key;
            if( key !== " " ) return;

            if( ! this.keyState.has(key) ) {
                this.keyState.set( key, Date.now() );
            }
        });

        window.addEventListener("keyup", e => {
            const key = e.key;
            if( key !== " " ) return;

            if( this.keyState.has(key) ) {
                const timestamp = this.keyState.get( key );
                const delta = Date.now() - timestamp;

                if( delta > this.config.pressUnit ) {
                    this.word += "-";
                    this.emit( MorseCodeMachine.PRESS );
                } else if( delta > this.config.tapUnit ) {
                    this.word += ".";
                    this.emit( MorseCodeMachine.TAP );
                }

                // Remove the state
                this.keyState.delete( key );
            } else {
                // Something went wrong.
            }
        });
    }

    clear() {
        this.word = "";
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
            if( typeof callback === "function" ) callback( state, this.word );
        });
    }
}