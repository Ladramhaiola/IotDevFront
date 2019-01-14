import React from 'react';
import { Modal, FormGroup, Form, FormControl, ControlLabel, Col, Row, Button } from "react-bootstrap";
import Api from "../../Api";
import LoaderButton from "../../LoaderButton";
import "./styles.css";

export default class CrateContractModal extends React.Component {
    constructor(props) {
        super(props);

        this.handleChanges = this.handleChanges.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            contractID: "",
            deviceID: "",
            hostname: "",
            privateKey: "",
            isLoading: false,
            contracts: [],
        };
    }


    getOptions () {
        return this.props.contracts.map((contract, i) => {
            return { value: contract.contractID, id: (i + 1) }
        });
    }


    handleChanges = event => {
        event.preventDefault();

        this.setState({ [event.target.id]: event.target.value });
    }


    handleClose() {
        this.props.toggle();
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });

        try {
            console.log(this.state);
        } catch (e) {
            this.setState({ isLoading: false });
        }
        
    }

    // TODO: functional validation
    validateForm() {
        return this.state.hostname.length > 0 && this.state.deviceID.length > 0 && this.state.privateKey > 0;
    }

    async componentDidMount() {
        try {
            let contracts = await Api.getAllContracts();

            this.setState({ contracts: contracts.data.contracts, contractID: contracts.data.contracts[0].contractID });
        } catch (e) {
            alert(e);
        }
    }

    render() {
        const { contracts } = this.state;

        return (
        <Modal show={true} onHide={this.handleClose} bsSize="large">
            <Modal.Header closeButton>
                <Modal.Title>Create new device</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form horizontal>

                    <FormGroup controlId="deviceID">
                        <Col componentClass={ControlLabel} sm={3}>Device ID</Col>
                        <Col sm={5}>
                            <FormControl 
                                type="text" 
                                placeholder="IoTbx00000000007" 
                                onChange={this.handleChanges} 
                                value={this.state.deviceID} 
                                autoFocus
                            />
                            <FormControl.Feedback />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="hostname">
                        <Col componentClass={ControlLabel} sm={3}>Host Name</Col>
                        <Col sm={5}>
                            <FormControl 
                                type="text" 
                                placeholder="https://boxchain-devices.net:3001" 
                                onChange={this.handleChanges} 
                                value={this.state.hostname}
                            />
                            <FormControl.Feedback />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="privateKey">
                        <Col componentClass={ControlLabel} sm={3}>Private Key</Col>
                        <Col sm={5}>
                            <FormControl 
                                type="text"
                                placeholder="TDUJKABYUBEIYKJABYUCFAVJ" 
                                onChange={this.handleChanges} 
                                value={this.state.privateKey}
                            />
                            <FormControl.Feedback />
                        </Col>
                        <Col sm={4}>
                            <Button>Generate key</Button>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="deviceID">
                        <Col componentClass={ControlLabel} sm={3}>Contract ID</Col>
                        <Col sm={3}>
                            <FormControl 
                                componentClass="select"
                                placeholder={contracts.length > 0 ? contracts[0].contractID : "CNTRCT0412"} 
                                value={this.state.contractID}
                                onChange={this.handleChanges}    
                            >
                                {
                                    [{}].concat(contracts).map(
                                        (contract, i) =>
                                        i === 0
                                        ? null
                                        : <option value={contract.contractID} key={i}>{contract.contractID}</option>
                                    )
                                }

                            </FormControl> 
                        </Col>
                    </FormGroup>

                    <div className="modal-submit">
                        <Row>
                            <Col sm={4}></Col>
                            <Col sm={4}>
                                <LoaderButton
                                    block
                                    bsSize="large"
                                    disabled={!this.validateForm()}
                                    type="submit"
                                    isLoading={this.state.isLoading}
                                    text="Create device"
                                    loadingText="Submitting..."
                                />
                            </Col>
                            <Col sm={4}></Col>
                        </Row>
                    </div>

                </Form>
            </Modal.Body>
        </Modal>
        );
    }
}
