import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card } from ".";

class Master extends Component {
    componentDidMount() {
        const { idBanner } = this.props;
        banners.newBanner(idBanner);
    }

    render() {
        const { number, title, idBanner } = this.props;
        const RENDER = [];

        for (let i = 0; i <= number; i += 1) {
            const COLOR = Math.floor(Math.random() * 16777215).toString(16);
            const IMG = `http://via.placeholder.com/306x229/${COLOR}/FFFFFF/?text=Card ${i}`;
            RENDER.push(<Card title={`Card ${i}`} image={IMG} key={`card-${i}`} />);
        }

        return (
            <React.Fragment>
                <h1 className="title-demo">{title}</h1>
                <div id={idBanner} />
                {RENDER}
            </React.Fragment>
        );
    }
}

Master.propTypes = {
    number: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    idBanner: PropTypes.string.isRequired,
};

export default Master;
