import React from 'react';
import { Button, Glyphicon } from "react-bootstrap";

export default ({
    onClick,
    text,
    ...props
}) =>
    <Button {...props} onClick={onClick}>
        <Glyphicon glyph="plus"/> {text}
    </Button>;