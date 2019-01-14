import React, { Component } from 'react';
import { Modal, Button, Col, Row } from "react-bootstrap";
import "./styles.css";

export default class DeleteDevice extends Component {
    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClose() {
        this.props.toggle(this.props.contractID, "no");
    }

    handleSubmit(answer) {
        this.props.toggle(answer);
    }

    render() {
        return (
            <Modal show={true} onHide={this.handleClose} bsSize="small">
                <Modal.Header closeButton>
                    <Modal.Title>Do you want to delete {this.props.deviceID}?</Modal.Title>
                </Modal.Header>
                <Modal.Body className="ask-modal-body">
                    <Button className="ask-btn">Yes</Button>
                    <Button className="ask-btn">No</Button>
                </Modal.Body>
            </Modal>
        );
    }
}