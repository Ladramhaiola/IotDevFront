import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Navigation.css";

export default class Navigation extends Component {
    constructor(props) {
        super(props);
    }

    setContractsActive = event => {
        event.preventDefault();
        this.props.changePage("contracts");
    }

    setDevicesActive = event => {
        event.preventDefault();
        this.props.changePage("devices");
    }

    render() {
        const { isAuthenticated, currentPage, handleLogout } = this.props;

        return (
            <Navbar fluid collapseOnSelect>
                <Navbar.Header>
                    {isAuthenticated && (currentPage === "devices" || currentPage === "contracts")
                    ? <div>
                        <Navbar.Brand>
                            <Link to="/" onClick={this.setContractsActive}>Contracts</Link>
                        </Navbar.Brand>
                        <Navbar.Brand>
                            |
                        </Navbar.Brand>
                        <Navbar.Brand>
                            <Link to="/" onClick={this.setDevicesActive}>Devices</Link>
                        </Navbar.Brand>
                    </div>
                    : <Navbar.Brand>
                        <Link to="/">Supply-Chain-Demo</Link>
                    </Navbar.Brand>}        
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        {isAuthenticated
                        ? <Fragment>
                            <LinkContainer to="/settings">
                                <NavItem>Settings</NavItem>
                            </LinkContainer>
                            <NavItem onClick={handleLogout}>Logout</NavItem>
                        </Fragment>
                        : <Fragment>
                            <LinkContainer to="/signup">
                                <NavItem>Signup</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/login">
                                <NavItem>Login</NavItem>
                            </LinkContainer>
                        </Fragment>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>             
        );
    }
}
