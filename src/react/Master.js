import React from "react";
import PropTypes from "prop-types";
import { Card } from ".";

const Master = (props) => {
    const { number } = props;
    const RENDER = [];

    for (let i = 0; i <= number; i += 1) {
        const COLOR = Math.floor(Math.random() * 16777215).toString(16);
        const IMG = `http://via.placeholder.com/306x229/${COLOR}/FFFFFF/?text=Card ${i}`;
        RENDER.push(<Card title={`Card ${i}`} image={IMG} key={`card-${i}`} />);
    }

    return (
        <div className="row">
            <h1 className="title-demo">Articulos</h1>
            {RENDER}
        </div>
    );
};

Master.propTypes = {
    number: PropTypes.number.isRequired,
};

export default Master;
