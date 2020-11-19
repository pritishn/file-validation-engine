import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class LoginPage extends Component {
    componentDidMount() {
       // M.AutoInit(); // initializes the select temlpate button!
    }
    render() {
        return (
            <div className="container">
                <div className="center">
                <a className="waves-light btn">Please Login!</a>
                </div>
            </div>
        )
    }
}

export default LoginPage;