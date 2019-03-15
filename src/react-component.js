import React from "react";
import ReactDOM from "react-dom";
import { Master } from "./react";
import Scroll from "./infiniteScroll/Scroll";

document.onreadystatechange = () => {
    const { readyState } = document;
    if (readyState === "complete") {
        // const CONFIG = {
        //     url: "http://local.televisa.com:3000/data.json",
        //     type: "ArticlePage",
        // };
        // const REQUEST = new Request(CONFIG);
        // REQUEST.then(data => console.log(data));
        Scroll.setActionScroll();
    }
};

ReactDOM.hydrate(
    <Master number={9} title="Articulo 1" />,
    document.getElementById("app"),
);
