import React from "react";
import ReactDOM from "react-dom";

import { Request } from ".";
import { scroll } from "./config.json";

class Scroll {
    static get init() {
        const {
            startPosition, percentage,
            uri, container, nextContent,
        } = this.config;
        const $SCREEN = window.innerHeight;
        const $ELEMENTS = document.querySelectorAll(container);
        this.config.requestInProgress = false;
        this.config.uris = [uri];
        this.config.titles = [nextContent.title];
        this.config.logic = {
            elements: $ELEMENTS,
            requestInProgress: false,
            currentVisible: 0,
            position: startPosition,
            maxval: (percentage * $SCREEN),
        };
        return this.config;
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
        const {
            container, logic,
            subContainer, component: Component,
        } = this.config;
        if (success) {
            // Modificar y ver la merjor opcion
            const $APP = document.querySelector(container);
            const $TAG = document.createElement(subContainer);
            $TAG.className = "row";
            $TAG.id = `Infinite-Scroll-Item-${logic.position}`;
            $APP.appendChild($TAG);
            ReactDOM.hydrate(<Component {...data} />, $TAG);
            // Modificar y ver la merjor opcion
            const $ELEMENTS = document.querySelectorAll(`${container} > [id^=Infinite-Scroll-Item-]`);
            this.config.logic.requestInProgress = false;
            this.config.logic.position += 1;
            this.config.nextContent.url = data.nextContent;
            this.config.logic.elements = $ELEMENTS;
            this.config.uris.push(data.uri);
            this.config.titles.push(data.title);
        }
    }

    static currentElement() {
        const {
            elements,
            maxval,
            currentVisible,
        } = this.config.logic;
        const { uris, titles } = this.config;
        if (elements) {
            const $ELEMENTS = [...elements];
            $ELEMENTS.forEach(($element, idx) => {
                const BOTTOM_ELEMENT = $element.getBoundingClientRect().bottom;
                const TOP_ELEMENT = $element.getBoundingClientRect().top;
                if (maxval < BOTTOM_ELEMENT && maxval >= TOP_ELEMENT && currentVisible !== idx) {
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

        const { container, component } = this.init;
        if (container && component) {
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
        } else {
            console.error("Error. . .");
        }
    }
}

export default Scroll;
