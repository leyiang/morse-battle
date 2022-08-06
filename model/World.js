import { sprites } from "../sprites.js";
import { random, randomInt, splice } from "../utils/shared.js";
import RenderQueue from "../utils/RenderQueue.js";
import Enemy from "./Enemy.js";
import Player from "./Player.js";
import MorseCodeMachine from "../utils/MorseCodeMachine.js";
import Timer from "../utils/Timer.js";
import store from "../utils/store.js";

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
        this.stopped = false;
        this.level = 1;
        this.name = "ABC";

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
                    if( this.stopped ) return;

                    if( key === "rocket" ) {
                        // if( val >= 5 ) {
                        //     setTimeout(() => {
                        //         this.win();
                        //     });
                        // }

                        if( val > this.level * 5 ) {
                            this.levelUp();
                        }
                    }

                    if( val <= 0 && key === "life" ) {
                        this.lose();
                    }

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

        this.setUpGame();
    }

    // this.levelUp();

    setUpGame() {
        this.rocket = 0;
        this.life = 10;
        this.entities = [];
        this.enemies = [];
        this.renderQueue.queue = [];

        this.player = new Player({
            sprite: "player",
            maxSpeed: 10,
        });

        this.appendEntity( this.player );
        this.addEnemy();
        this.initListener();
    }

    initListener() {
        let time = 0;
        let lastTime = Date.now();
        this.timer = new Timer();
        this.timer.update = (delta) => {
            time += (delta * 1000);
            if( this.stopped ) return;

            let singleTime = 3000 - this.level * 100;

            if( singleTime < 50 ) {
                singleTime = 50;
            }

            if( time >= singleTime ) {
                let now = Date.now();
                console.log( now - lastTime );
                lastTime = now;
                this.addEnemy();
                time = 0;
            }
        }
        this.timer.start();

        this.onKeydown = e => {
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

            this.player.onKeydown(e);
        }

        this.onKeyup = e => {
            this.player.onKeyup(e);
        }

        window.addEventListener("keydown", this.onKeydown);
        window.addEventListener("keyup", this.onKeyup);
    }

    update() {
        if( this.stopped ) return;

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

        return [letter, code];
    }

    addEnemy() {
        const types = [
            {
                name: "enemyShip",
                sprite: world.sprites.get("enemyShip"),
                maxSpeed: 1.5 + (world.level - 1) * .1,
            },
            {
                name: "enemyUFO",
                sprite: world.sprites.get("enemyUFO"),
                maxSpeed: 1 + (world.level - 1) * .2,
            },
        ];

        const type = random( types );
        const {width, height} = type.sprite;

        const x = randomInt( world.info.width - width/2, width );
        const y = 0 - height/2;

        const [letter, code] = this.getLetter();
        const enemy = new Enemy({ sprite: type.name, x, y, maxSpeed: type.maxSpeed }, letter, code);
        this.enemies.push( enemy );
        this.appendEntity( enemy );
    }

    slip( target ) {
        this.life --;
    }

    win() {
        document.querySelector(".score-wrap").innerText = this.rocket;
        document.querySelector(".win-modal").classList.add("show");
        this.save();
        this.stop();
    }

    lose() {
        document.querySelector(".score-wrap").innerText = this.rocket;
        document.querySelector(".lose-modal").classList.add("show");
        this.save();
        this.stop();
    }

    stop() {
        this.stopped = true;

        window.removeEventListener("keydown", this.onKeydown );
        window.removeEventListener("keyup", this.onKeyup );

        this.timer.stop();
        clearInterval( this.intervalID );
    }

    again() {
        this.stop();
        document.querySelectorAll(".modal").forEach( modal => {
            modal.classList.remove("show")
        });

        this.stopped = false;
        this.setUpGame();
    }

    levelUp() {
        const wrap = document.querySelector(".level-wrap");
        wrap.classList.add("show");

        wrap.addEventListener("animationend", () => {
            wrap.classList.remove("show");
        });

        this.level ++;
    }

    save() {
        const list = store.get("ranking", []);

        list.push({
            name: this.name,
            score: this.rocket,
        });

        store.set("ranking", list);
    }
}