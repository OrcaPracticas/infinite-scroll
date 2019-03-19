import React from "react";
import ReactDOM from "react-dom";
import { Master } from "./react";
import Scroll from "./infiniteScroll/Scroll";

document.onreadystatechange = () => {
    const { readyState } = document;
    if (readyState === "complete") {
        const CONFIG = {
            article_start: 1,
            article_quantity: 5,
            uri: "/",
            component: Master,
            container: "#Article-container",
            subContainer: "div",
            nextContent: {
                title: "Articulo Principal",
                url: "http://local.televisa.com:3000/data1.json",
                type: "ArticlePage",
            },
        };
        Scroll.setActionScroll(CONFIG);
    }
};

ReactDOM.hydrate(
    <div className="row" id="Infinite-Scroll-Item-0">
        <Master number={9} title="Articulo Principal" idBanner="ban01_728x90" />
    </div>,
    document.getElementById("Article-container"),
);
