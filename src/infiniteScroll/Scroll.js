import React from "react";
import ReactDOM from "react-dom";

import { Master } from "../react";
import { Request } from ".";
import { scroll } from "./config.json";

class Scroll {
    static init() {
        const { startPosition, percentage, uri } = this.config;
        const seletor = "#app > div";
        const $SCREEN = window.innerHeight;
        const ELEMS = document.querySelectorAll(seletor);
        this.config.requestInProgress = false;
        this.config.uris = [uri];
        this.config.titles = ["Articulo Principal"];
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

    static getNextContent(response) {
        const { success, data } = response;
        if (success) {
            // Modificar y ver la merjor opcion
            const APP = document.querySelector("#app");
            const DIV = document.createElement("div");
            DIV.className = "row";
            APP.appendChild(DIV);
            ReactDOM.hydrate(<Master {...data} />, DIV);
            // Modificar y ver la merjor opcion
            const seletor = "#app > div";
            const ELEMS = document.querySelectorAll(seletor);
            this.config.logic.requestInProgress = false;
            this.config.logic.position += 1;
            this.config.nextContent.url = data.nextContent;
            this.config.logic.elems = ELEMS;
            this.config.uris.push(data.uri);
            this.config.titles.push(data.title);
        }
    }

    static currentElement() {
        const {
            elems,
            maxval,
            currentVisible,
        } = this.config.logic;
        const { uris, titles } = this.config;
        if (elems) {
            [].forEach.call(elems, ($elemento, idx) => {
                const bottomElement = $elemento.getBoundingClientRect().bottom;
                const topElement = $elemento.getBoundingClientRect().top;
                if (maxval < bottomElement && maxval >= topElement && currentVisible !== idx) {
                    this.config.logic.currentVisible = idx;
                    const REFERENCE = `nextContent-${idx}`;
                    document.title = `.:: ⚙️ ${titles[idx]} ⚙️ ::.`;
                    window.history.pushState({ title: idx }, REFERENCE, uris[idx]);
                }
            });
        }
    }

    static setActionScroll(config) {
        this.config = Object.assign(scroll, config);
        this.init();
        document.addEventListener("scroll", () => {
            const { quantity, logic, nextContent } = this.config;
            const { requestInProgress, position } = logic;
            this.currentElement();
            if (this.estimate && !requestInProgress && position < quantity) {
                this.config.logic.requestInProgress = true;
                const NEXT_CONTENT = new Request(nextContent);
                NEXT_CONTENT.then(data => this.getNextContent(data));
            }
        });
    }
}

export default Scroll;