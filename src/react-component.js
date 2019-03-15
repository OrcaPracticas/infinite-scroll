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
            percentage: 0.80,
            nextContent: {
                "url": "http://local.televisa.com:3000/data.json",
                "type": "ArticlePage"
            }
        };
        Scroll.setActionScroll(CONFIG);
    }
};

ReactDOM.hydrate(
    <Master number={9} title="Articulo 1" />,
    document.getElementById("app"),
);
