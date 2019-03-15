import React from "react";
import ReactDOM from "react-dom";
import { Master } from "./react";

ReactDOM.hydrate(
    <Master number={8} />,
    document.getElementById("app"),
);
