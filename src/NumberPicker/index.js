import React, { Component } from "react";
import "./NumberPicker.css";

export default class NumberPicker extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            value: 1,
        };
    }

    componentDidMount() {
        const { value } = this.props;
        this.setState({ value: value });
    }

    handleChange = type => {
        const { change } = this.props;
        let value = parseInt(this.state.value);

        if (type === "add") {
            value += 1
        } else {
            value -= 1
        }

        this.setState({ value: value }, () => {
            change(value);
        });
    }

    render() {
        const { value } = this.state;

        return (
            <div className="number-wrapper">
                <input className="number-input" type="number" value={value} disabled />
                <span className="input-button add" onClick={() => this.handleChange("add")}></span>
                <span className="input-button remove" onClick={() => this.handleChange("remove")}></span>
            </div>
        );
    }
}