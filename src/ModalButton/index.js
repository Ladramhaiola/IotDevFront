import React from 'react';
import { Button, Glyphicon } from "react-bootstrap";

export default class ModalButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button onClick={this.props.handleModalButtonClick}><Glyphicon glyph="plus"/> Create Device</Button>
        );
    }
}