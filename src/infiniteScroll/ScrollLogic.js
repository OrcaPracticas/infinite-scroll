import config from "./config.json";

class ScrollLogic {
    static set data(nextContentData) {
        if (Object.values(nextContentData).length > 1) {
            this.logicData = nextContentData;
        } else {
            const containerClass = "#app > div > div";
            const SCREEN = window.innerHeight;
            const PERCENTAGE = config.percentage;
            const ELEMS = document.querySelectorAll(containerClass);
            this.logicData = {
                nexContent: nextContentData,
                containerClass,
                elems: ELEMS,
                requestInProgress: false,
                currentVisible: 0,
                articleStart: config.article_start,
                articleQuantity: config.article_quantity,
                percentage: PERCENTAGE,
                minval: ((1 - PERCENTAGE) * SCREEN),
                maxval: (PERCENTAGE * SCREEN),
            };
        }
    }

    static get data() {
        return this.logicData;
    }

    static requestArticle() {
        const {
            containerClass: CONTAINER_CLASS,
        } = this.data;
        const $ARTICLE_CLONE = document.querySelector(CONTAINER_CLASS).cloneNode(true);
        const $CONTAINER_ARTICLE = document.querySelector("#app > div");
        $CONTAINER_ARTICLE.append($ARTICLE_CLONE);
        const currentData = this.data;
        currentData.requestInProgress = true;
        currentData.elems = document.querySelectorAll(CONTAINER_CLASS);
        currentData.requestInProgress = false;
        currentData.articleStart += 1;
        this.data = currentData;
    }

    static currentElement() {
        const {
            elems,
            maxval,
            currentVisible,
        } = this.data;
        if (elems) {
            [].forEach.call(elems, ($elemento, idx) => {
                const bottomElement = $elemento.getBoundingClientRect().bottom;
                const topElement = $elemento.getBoundingClientRect().top;
                if (maxval < bottomElement && maxval >= topElement && currentVisible !== idx) {
                    const currentData = this.data;
                    currentData.currentVisible = idx;
                    this.data = currentData;
                    console.log("El elemento es visible :D", idx);
                    const REFERENCE = "demo";
                    window.history.pushState({ title: idx }, REFERENCE, `/workshop-javascript/views/react-${idx}`);
                }
            });
        }
    }

    static getShoot(nextContentData) {
        this.data = { nextContentData };
        document.addEventListener("scroll", () => {
            const {
                percentage: PERCENTAGE,
                articleStart: ARTICLE_START,
                articleQuantity: ARTICLE_QUANTITY,
                requestInProgress: REQUESTINPROGRESS,
            } = this.data;
            const WINDOW_HEIGHT = window.screen.height;
            const SCROLL = window.scrollY;
            const $DOCUMENT_HEIGHT = document.body.offsetHeight;
            const DESPLAZO = WINDOW_HEIGHT + SCROLL;
            const REQUEST_POINT = $DOCUMENT_HEIGHT * PERCENTAGE;
            this.currentElement();
            if (DESPLAZO >= REQUEST_POINT
                && !REQUESTINPROGRESS
                && ARTICLE_START < ARTICLE_QUANTITY) {
                const currentData = this.data;
                currentData.requestInProgress = true;
                this.data = currentData;
                this.requestArticle();
            }
        });
    }
}
export default ScrollLogic;
