import { Request } from ".";
import { scroll } from "./config.json";

class Scroll {
    static init() {
        const { startPosition, percentage } = this.config;
        const seletor = "#app > div > div";
        const $SCREEN = window.innerHeight;
        const ELEMS = document.querySelectorAll(seletor);
        this.config.requestInProgress = false;
        this.config.logic = {
            seletor,
            elems: ELEMS,
            requestInProgress: false,
            currentVisible: 0,
            position: startPosition,
            maxval: (percentage * $SCREEN),
        };
    }

    static get estimate() {
        const { percentage } = this.config;
        const $WINDOW_HEIGHT = window.screen.height;
        const $SCROLL = window.scrollY;
        const $DOCUMENT_HEIGHT = document.body.offsetHeight;
        const DISPLACEMENT = $WINDOW_HEIGHT + $SCROLL;
        const REQUEST_POINT = $DOCUMENT_HEIGHT * percentage;
        return (DISPLACEMENT >= REQUEST_POINT);
    }

    static setActionScroll(config) {
        this.config = Object.assign(scroll, config);
        this.init();
        document.addEventListener("scroll", () => {
            const { quantity, logic, nextContent } = this.config;
            const { requestInProgress, position } = logic;
            if (this.estimate && !requestInProgress && position < quantity) {
                this.config.logic.requestInProgress = true;
                const NEXT_CONTENT = new Request(nextContent);
                NEXT_CONTENT.then(data => console.log(data));
            }
        });
    }
}

export default Scroll;