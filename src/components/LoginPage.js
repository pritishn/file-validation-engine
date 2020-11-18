import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../firebase/firebase-init";
import "../firebase/firebase-intercations";
import ReactDOM from "react-dom";
import database from "../datastore";
import { loginWithGooglePopup } from "../firebase/firebase-intercations";

class LoginPage extends Component {
  state = {
    username: ""
  };
  loginUser = async () => {
    await loginWithGooglePopup();
    this.setState({
      username: firebase.auth().currentUser.displayName,
    });
    database.loggedIn=true;
  };
  logoutUser = async () => {
    firebase.auth().signOut();
    this.setState({
      username: '',
    });
    database.loggedIn = false;
  };
  async componentDidMount() {
    var user= await firebase.auth().currentUser;
    if (user) {
      this.setState({
        username: user.displayName,
      });
    } else {
      this.setState({
        username: ''
      });
    }
  }
  render() {
    return (this.state.username !== '' )? (
      <div className="container">
        <div class="card">
          <div className="center">
            <img src={""} style={{ width: "150px" }} />
            <p>Hello {this.state.username}! You are logged in!</p>
            <div className="card-action black center">
              <Link to="/view_templates" className="white-text ">View all Templates</Link>
              <Link onClick={this.logoutUser} className="white-text ">Logout</Link>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="container">
        <div class="card">
          <div className="center">
            <img src={""} style={{ width: "150px" }} />
            <p>Welcome! Please Login to use the app!</p>
            <div className="card-action center  black">
              <Link onClick={this.loginUser} className="white-text">Login</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
