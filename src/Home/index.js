import React from "react";
import { PageHeader, Table, Button, Glyphicon, FormControl, FormGroup } from "react-bootstrap";
import ModalButton from "../ModalButton";
import Api from "../Api";
import "./Home.css";

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            isLoading: true,
            devices: [],
            contracts: [],
            searchValue: "",
        };
    }

    async componentDidMount() {
        if (!this.props.isAuthenticated) {
            return;
        }

        try {
            let response = await Promise.all([Api.getAllDevices(), Api.getAllContracts()]);
            let devices = response[0].data.devices;
            let contracts = response[1].data.contracts;
            this.setState({ devices , contracts});
        } catch (e) {
            alert(e);
        }

        this.setState({ isLoading: false });
    }

    filterDevices() {
        let input = this.state.searchValue;

        if (input !== "") {
            return this.state.devices.filter(device => {
                return device.iotdeviceID.toUpperCase().indexOf(input.toUpperCase()) > -1;
            });
        }
        return this.state.devices;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    }

    handleModalButtonClick() {

    }

    renderDevicesList(devices) {
        return [{}].concat(devices).map(
            (device, i) =>
                i === 0
                ? null
                : <tr key={i}>
                    <td>{device.iotdeviceID}</td>
                    <td>{device.hostname}</td>
                    <td>{device.privateKey}</td>
                    <td>Not Assigned</td>
                    <td><Button><Glyphicon glyph="edit"/></Button></td>
                    <td><Button><Glyphicon glyph = "trash"/></Button></td>
                </tr>
        );
    }

    renderContractsList(contracts) {
        return [{}].concat(contracts).map(
            (contract, i) =>
                i === 0
                ? null
                : <tr>
                    <td>{contract.contractID}</td>
                    <td>{contract.toDeliver}</td>
                    <td>{contract.deviceID}</td>
                    <td>{contract.pickupAddress}</td>
                    <td>{contract.deliveryAddress}</td>
                    <td>{contract.temperature}</td>
                    <td>{contract.humidity}</td>
                    <td>{contract.deliveryDueDate}</td>
                    <td>{contract.contractStatus}</td>
                    <td><Button><Glyphicon glyph="edit"/></Button></td>
                    <td><Button><Glyphicon glyph="floppy-remove"/></Button></td>
                </tr>
        )
    }

    renderLander() {
        return (
            <div className="lander">
                <h1>Matoffo's IoT Devices</h1>
                <p>Device & Contracts manageent app</p>
            </div>
        );
    }

    renderContracts() {
        return (
            <div className="devices">
                <PageHeader>Contracts Management</PageHeader>
                <div>
                    <form className="search-form">
                        <FormGroup controlId="searchValue">
                            <FormControl
                                type = "text"
                                value = {this.state.searchValue}
                                placeholder = "Contract ID / CNTRCT0412"
                                onChange = {this.handleChange}
                            />
                            <FormControl.Feedback/>
                        </FormGroup>
                    </form>
                    <ModalButton />         
                </div>
                <Table condensed hover responsive>
                    <thead>
                        <tr>
                            <th>Contract ID</th>
                            <th>To deliver</th>
                            <th>Device ID</th>
                            <th>Pickup address</th>
                            <th>Delivery address</th>
                            <th>Temperature</th>
                            <th>Humidity</th>
                            <th>Delivery due date</th>
                            <th>Contract status</th>
                            <th>Edit status</th>
                            <th>Archive</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!this.state.isLoading && this.renderContractsList(this.state.contracts)}
                    </tbody>
                </Table>
            </div>
        )
    }

    renderDevices() {
        const filteredDevices = this.filterDevices();

        return (
            <div className="devices">
                <PageHeader>IoT Devices Management</PageHeader>
                <div>
                    <form className="search-form">
                        <FormGroup controlId="searchValue">
                            <FormControl
                                type = "text"
                                value = {this.state.searchValue}
                                placeholder = "Device ID / IoTbx00000000001"
                                onChange = {this.handleChange}
                            />
                            <FormControl.Feedback/>
                        </FormGroup>
                    </form>
                    <ModalButton />
                </div>
                <Table condensed hover responsive>
                    <thead>
                        <tr>
                            <th>Device ID</th>
                            <th>Host Name</th>
                            <th>Private Key</th>
                            <th>Contract ID</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!this.state.isLoading && this.renderDevicesList(filteredDevices)}
                    </tbody>
                </Table>
            </div>
        );
    }

    render() {
        return (
            <div className="Home">
                {this.props.isAuthenticated ? (this.props.currentPage === "devices" ? this.renderDevices() : this.renderContracts()) : this.renderLander()}
            </div>
        );
    }
}