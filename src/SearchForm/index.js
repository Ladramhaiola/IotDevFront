import React from "react";
import { Glyphicon, FormControl, FormGroup } from "react-bootstrap";
import "./SearchForm.css";

export default ({
    controlId,
    value,
    placeholder,
    onChange,
}) =>
    <form className="search-form">
        <FormGroup controlId={controlId}>
            <FormControl 
                type = "text"
                value = {value}
                placeholder = {placeholder}
                onChange = {onChange}
            />
            <FormControl.Feedback />
        </FormGroup>
    </form>