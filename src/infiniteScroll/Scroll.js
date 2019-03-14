
let flag = false;
let startPoint = 1;
const END_POINT = 5; // configurable
const PORCENTAJE = 0.75; // configurable

const container_class = "#app > div > div";
const screen = window.innerHeight;
const minval = ((1 - PORCENTAJE) * screen);
const maxval = (PORCENTAJE * screen);
let $ELEMS = document.querySelectorAll(container_class);
let currentVisible = 0;


function requestArticle() {
    const $ARTICLE_CLONE = document.querySelector("#app > div > div:nth-child(1)").cloneNode(true);
    const $CONTAINER_ARTICLE = document.querySelector("#app > div");
    $CONTAINER_ARTICLE.append($ARTICLE_CLONE);
    $ELEMS = document.querySelectorAll(container_class);
    flag = false;
    startPoint++;
}

function currentElement() {
    [].forEach.call($ELEMS, ($elemento, idx) => {
        const bottomElement = $elemento.getBoundingClientRect().bottom;
        const topElement = $elemento.getBoundingClientRect().top;
        if (maxval < bottomElement && maxval >= topElement && currentVisible !== idx) {
            currentVisible = idx;
            console.log("El $elemento es visible :D", idx);
            // cambio de url
            const REFERENCE = "demo";
            window.history.pushState({ title: idx }, REFERENCE, `/workshop-javascript/views/react-${idx}`);
        }
    });
}

document.addEventListener("scroll", () => {
    /**
	 * Calculos del scroll
	 */
    const WINDOW_HEIGHT = window.screen.height;
 	const SCROLL = window.scrollY;
 	const $DOCUMENT_HEIGHT = document.body.offsetHeight;
    const DESPLAZO = WINDOW_HEIGHT + SCROLL;
    const REQUEST_POINT = $DOCUMENT_HEIGHT * PORCENTAJE;
    currentElement();
    if (DESPLAZO >= REQUEST_POINT && !flag && startPoint < END_POINT) {
        flag = true;
        console.log("Valor de flag => ", flag);
        requestArticle();
        console.groupCollapsed("%cTengo que pedir un articulo", "color:white");
        console.log("Valor de flag => ", flag);
        console.log("Solicitando articulo");
        console.log("Se agrego un nuevo articulo");
        console.groupEnd();
    }
});
