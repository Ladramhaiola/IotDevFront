import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Routes from "./Routes";
import logo from './logo.svg';
import './App.css';
import Api from './Api';
import Navigation from "./Navigation";

class App extends Component {
    constructor(props) {
        super(props);

        this.handlePageChange = this.handlePageChange.bind(this);

        this.state = {
            isAuthenticated: false,
            isAuthenticating: true,
            currentPage: "devices",
        };
    }

    userHasAuthenticated = authenticated => {
        this.setState({ isAuthenticated: authenticated });
    }

    handleLogout = async event => {
        await Api.logout();
        this.userHasAuthenticated( false );
        this.props.history.push("/login");
    }

    handlePageChange(page) {
        this.setState({ currentPage: page });
    }

    async componentDidMount() {
        try {
            const authenticated = await Api.loggedIn();
            this.userHasAuthenticated( authenticated );
        } catch (e) {
            alert(e);
        }

        this.setState({ isAuthenticating: false });
    }

    render() {
        const childProps = {
            isAuthenticated: this.state.isAuthenticated,
            userHasAuthenticated: this.userHasAuthenticated,
            currentPage: this.state.currentPage,
        };

        return (
             <div className="App container">
                <Navigation 
                    isAuthenticated={this.state.isAuthenticated}
                    handleLogout={this.handleLogout}
                    currentPage={this.state.currentPage}
                    changePage={this.handlePageChange}
                />
                <Routes childProps={childProps}/>
             </div>
        );
    }
}

export default withRouter(App);
