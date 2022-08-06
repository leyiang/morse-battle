import { sprites } from "./sprites.js";
import World from "./model/World.js";
import store from "./utils/store.js";


let currentPage = null;

go("ranking");

function go( page ) {
    const selector = "#" + page + "-page";

    if( page === "game" ) {
        world.again();
    }

    if( page === "ranking" ) {
        const list = store.get("ranking");
        list.sort((a, b) => {
            return b.score - a.score;
        });

        const inner = list.map( item => {
            return `<div class="ranking-item flex">
                <span>${ item.name }</span>
                <span class="score ml-auto">${ item.score }</span>
            </div>`;
        }).join('\n');

        document.querySelector(".ranking-list").innerHTML = inner;
    }

    if( currentPage ) {
        currentPage.classList.remove("active");
    }

    currentPage = document.querySelector( selector );
    currentPage.classList.add("active");
}

window.addEventListener("click", e => {
    const  rawTo = e.target.dataset.to;

    if( e.target.classList.contains("router") ) {
        go( e.target.dataset.to );
    }

    if( e.target.classList.contains("again-btn") ) {
        world.again();
    }
});

const screen = document.getElementById("screen");
const c = screen.getContext("2d");

const world = window.world = new World(480, 800);

screen.width = world.info.width;
screen.height = world.info.height;

sprites.load().then(() => {
    world.init();
    requestAnimationFrame(loop);
});

const loop = () => {
    world.update();
    world.render(c);

    requestAnimationFrame(loop);
};
