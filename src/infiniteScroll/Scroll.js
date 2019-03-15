import React, { Component } from "react";
import PropTypes from "prop-types";
import { Master } from "../react";
import ScrollLogic from "./ScrollLogic";

class Scroll extends Component {
    componentDidMount() {
        const nexContentData = this.props;
        ScrollLogic.getShoot(nexContentData);
    }

    render() {
        return (
            <Master number={0} />
        );
    }
}

Scroll.propTypes = {
    theme: PropTypes.string,
    url: PropTypes.string,
    type: PropTypes.string,
};

Scroll.defaultProps = {
    theme: "WhiteLabel",
    url: "/foo-foo",
    type: "",
};

export default Scroll;
