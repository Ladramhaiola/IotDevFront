import React from 'react';
import { Modal, FormGroup, Form, FormControl, ControlLabel, Col, Row, Glyphicon } from "react-bootstrap";
import Api from "../../Api";
import NumberPicker from "../../NumberPicker";
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
            toDeliver: "",
            deviceID: "",
            pickupAddress: "",
            deliveryAddress: "",
            temperatureFrom: "",
            temperatureTo: "",
            humidityFrom: "",
            humidityTo: "",
            deliveryDueDate: "",
            contractStatus: "",
            isLoading: false,
            devices: [],
        };
    }


    getOptions () {
        return this.props.devices.map((device, i) => {
            return { value: device.iotdeviceID, id: (i + 1) }
        });
    }


    handleChanges = event => {
        event.preventDefault();

        this.setState({ [event.target.id]: event.target.value });
        console.log(this.state);
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
        return this.state.contractID.length > 0 && this.state.deviceID.length > 0;
    }

    async componentDidMount() {
        try {
            let devices = await Api.getAllDevices();

            this.setState({ devices: devices.data.devices, deviceID: devices.data.devices[0].iotdeviceID });
        } catch (e) {
            alert(e);
        }
    }

    render() {
        const devices = this.state.devices;

        return (
        <Modal show={true} onHide={this.handleClose} bsSize="large">
            <Modal.Header closeButton>
                <Modal.Title>Create new contract</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form horizontal>

                    <FormGroup controlId="contractID">
                        <Col componentClass={ControlLabel} sm={3}>Contract ID</Col>
                        <Col sm={5}>
                            <FormControl 
                                type="text" 
                                placeholder="CNTRCT0417" 
                                onChange={this.handleChanges} 
                                value={this.state.contractID} 
                                autoFocus
                            />
                            <FormControl.Feedback />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="toDeliver">
                        <Col componentClass={ControlLabel} sm={3}>To deliver</Col>
                        <Col sm={5}>
                            <FormControl 
                                type="text" 
                                placeholder="Pharma goods" 
                                onChange={this.handleChanges} 
                                value={this.state.toDeliver} 
                            />
                            <FormControl.Feedback />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="deviceID">
                        <Col componentClass={ControlLabel} sm={3}>Device ID</Col>
                        <Col sm={3}>
                            <FormControl 
                                componentClass="select"
                                placeholder={devices.length > 0 ? devices[0] : "IoTbx00000000005"} 
                                value={this.state.deviceID}
                                onChange={this.handleChanges}    
                            >
                                {
                                    [{}].concat(devices).map(
                                        (device, i) =>
                                        i === 0
                                        ? null
                                        : <option value={device.iotdeviceID} key={i}>{device.iotdeviceID}</option>
                                    )
                                }

                            </FormControl> 
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="pickupAddress">
                        <Col componentClass={ControlLabel} sm={3}>Pickup Address</Col>
                        <Col sm={8}>
                            <FormControl 
                                componentClass="textarea"
                                value={this.state.pickupAddress}
                                onChange={this.handleChanges}
                                placeholder="Street address, Postal code, City, State, Country." />
                            <FormControl.Feedback />                        
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="deliveryAddress">
                        <Col componentClass={ControlLabel} sm={3}>Delivery Address</Col>
                        <Col sm={8}>
                            <FormControl 
                                componentClass="textarea"
                                value={this.state.deliveryAddress}
                                onChange={this.handleChanges}
                                placeholder="Street address, Postal code, City, State, Country." />
                            <FormControl.Feedback />                        
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={3}>Temperature conditions</Col>
                        <Col sm={3}>
                                    <NumberPicker
                                        value={12}
                                        change={(value) => {this.setState({ temperatureFrom: value });}}
                                    />
                        </Col>
                        <Col sm={3}>
                                    <NumberPicker 
                                        value={12}
                                        change={(value) => {this.setState({ temperatureTo: value });}}
                                    />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={3}>Humidity conditions</Col>
                        <Col sm={3}>
                                    <NumberPicker
                                        value={60}
                                        change={(value) => {this.setState({ humidityFrom: value });}}
                                    />
                        </Col>
                        <Col sm={3}>
                                    <NumberPicker 
                                        value={70}
                                        change={(value) => {this.setState({ humidityTo: value });}}
                                    />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="deliveryDueDate">
                        <Col componentClass={ControlLabel} sm={3}>Delivery due date</Col>
                        <Col sm={3}>
                            <FormControl 
                                type="text" 
                                placeholder="2018/09/05" 
                                onChange={this.handleChanges} 
                                value={this.state.deliveryDueDate} 
                            />
                            <FormControl.Feedback />
                        </Col>
                        <Glyphicon glyph="calendar" bsSize="large" className="calendar-glyph" />
                    </FormGroup>

                    <FormGroup controlId="contractStatus">
                        <Col componentClass={ControlLabel} sm={3}>Contract status</Col>
                        <Col sm={3}>
                            <FormControl 
                                componentClass="select"
                                placeholder="In Progress" 
                                value={this.state.contractStatus}
                                onChange={this.handleChanges}    
                            >
                                <option value="In Progress">In Progress</option>
                                <option value="On Hold">On Hold</option>
                                <option value="Done">Done</option>
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
                                    text="Create contract"
                                    loadingText="Creating..."
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
