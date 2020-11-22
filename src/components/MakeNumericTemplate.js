import React, { Component } from "react";
import firebase from "../firebase/firebase-init";
import { BrowserRouter, Link } from "react-router-dom";
import ReactDOM, { render } from "react-dom";
import database from "../datastore";
import NotLoggedIn from "./NotLoggedIn";
import TemplateField from "./TemplateField";
import { saveTemplateToDB } from "../firebase/firebase-intercations";

class MakeNumericTemplate extends Component {
  
  render() {
    
      return (
        <div>
            <h1>  Numeric </h1>
        </div>
    );
  }
}

export default MakeNumericTemplate;
