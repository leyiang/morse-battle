import MorseCodeMachine from "../utils/MorseCodeMachine.js";
import { sprites } from "../sprites.js";
import { random, randomInt, splice } from "../utils/shared.js";
import RenderQueue from "../utils/RenderQueue.js";
import Enemy from "./Enemy.js";
import Player from "./Player.js";

export default class World {
    constructor(width, height) {
        this.info = {
            width, height
        }

        this.renderQueue = new RenderQueue();
        this.sprites = sprites;
        this.machine = new MorseCodeMachine(
            document.getElementById("current-morse-code")
        );

        this.entities = [];
        this.enemies = [];
        this.player = null;

        this.status = {
            life: 10,
            rocket: 0,
        }
    }

    init() {
        ["life", "rocket"].forEach( key => {
            Object.defineProperty(this, key, {
                get() {
                    return this.status[ key ]
                },
                set( val ) {
                    this.status[ key ] = val;
                    document.querySelector(`.${ key }-status`).innerText = val;
                }
            })
        });

        this.machine.listen();
        this.machine.onTrigger(( state, word ) => {
            this.enemies.forEach( enemy => {
                if( enemy.code === word ) {
                    this.player.aim( enemy );
                } else {
                    this.player.offTarget( enemy );
                }
            });
        });

        this.player = new Player({
            sprite: "player",
            maxSpeed: 10,
        });

        this.appendEntity( this.player );

        this.addEnemy();

        setInterval(() => {
            this.addEnemy();
        }, 5000 );

        window.addEventListener("keydown", e => {
            if( e.key === "Enter" ) {
                this.machine.clear();
                this.player.fire();
            }

            if( e.key === "E" ) {
                this.enemies.forEach( enemy => {
                    if( e.key === enemy.letter ) {
                        this.player.aim( enemy );
                    }
                });
            }
        });
    }

    update() {
        this.entities.forEach( entity => {
            entity.update();
        });
    }

    render( c ) {
        this.renderQueue.render( c );
    }

    appendEntity( entity ) {
        this.entities.push( entity );
        entity.render(this.renderQueue);
    }

    removeEntity( entity ) {
        splice( this.entities, entity );
        splice( this.enemies, entity );

        this.renderQueue.removeRender( entity.renderInstance );
    }

    getLetter() {
        const alphabet = {
            'a': '.-',    'b': '-...',  'c': '-.-.', 'd': '-..',
            'e': '.',     'f': '..-.',  'g': '--.',  'h': '....',
            'i': '..',    'j': '.---',  'k': '-.-',  'l': '.-..',
            'm': '--',    'n': '-.',    'o': '---',  'p': '.--.',
            'q': '--.-',  'r': '.-.',   's': '...',  't': '-',
            'u': '..-',   'v': '...-',  'w': '.--',  'x': '-..-',
            'y': '-.--',  'z': '--..', '9': '----.', '0': '-----',
            '1': '.----', '2': '..---', '3': '...--', '4': '....-',
            '5': '.....', '6': '-....', '7': '--...', '8': '---..',
        }

        let letter = random( Object.keys(alphabet) );
        let code = alphabet[ letter ];

        console.log( code, letter );
        return [letter, code];
    }

    addEnemy() {
        const types = [
            {
                name: "enemyShip",
                sprite: world.sprites.get("enemyShip"),
                maxSpeed: 2,
            },
            {
                name: "enemyUFO",
                sprite: world.sprites.get("enemyUFO"),
                maxSpeed: 2,
            },
        ];

        const type = random( types );
        const {width, height} = type.sprite;

        const x = randomInt( world.info.width - width/2, width );
        const y = -1 * height;

        const [letter, code] = this.getLetter();
        const enemy = new Enemy({ sprite: type.name, x, y, maxSpeed: type.maxSpeed }, letter, code);
        this.enemies.push( enemy );
        this.appendEntity( enemy );
    }

    slip( target ) {
        this.life --;
        console.log( this.life );
    }
}