import React, { Component } from "react";
import firebase from "../firebase/firebase-init";
import { BrowserRouter, Link } from "react-router-dom";
import ReactDOM, { render } from "react-dom";
import database from "../datastore";
import NotLoggedIn from "./NotLoggedIn";
import NumericTemplateField from "./NumericTemplateField";
import { saveTemplateToDB_Numeric } from "../firebase/firebase-intercations";
import numeric from "../numeric";

class ShowNumericTemplate extends Component {
  state = {
    name: "",
    description: "",
    fields: [],
    rule: "",
    showRule: false,
    form_submitted: false,
  };

  componentDidMount() {
    let template = numeric.templates.find(
      (template) => template.templateID == this.props.match.params.id
    );
    this.setState({
      name: template.name,
      templateID: template.templateID,
      description: template.description,
      fields: template.fields,
      rule: template.rule,
    });
  }
  goToUploadPage = (e)=>{
    e.preventDefault();
    this.props.history.push({
      pathname: '/upload_numeric'});
  }
  render() {
    const renderFields = this.state.fields.map((field, index) => {
      return (
        <div className="card-panel col s2 m2" style={{margin:"10px"}}>
          <label for="header" className="active">Header Name {index+1}</label>
          <input id="header" value={field.headerName} readOnly/>
        </div>
      );
    });

    const renderRule =  (
      <div className="container col s12 m12">
        <div class="input-field">
          <input
            id="Rule"
            type="text"
            class="validate"
            value={this.state.rule}
            readOnly
          />
          <label for="Rule" className="active">Rule</label>
        </div>
      </div>
    );

    return !firebase.auth().currentUser ? (
      <div className="container">
        <NotLoggedIn />
      </div>
    ) : (
      <div className="container">
        <h5 className="center">Make A New Temlpate</h5>
        <div className="row">
          <form className="col row s12 m12" onSubmit={this.createFields}>
            <div className="col center s6 m6">
              <label htmlFor="template-name">Template Name:</label>
              <input id="template-name" value={this.state.name} name="template-name" required />
            </div>
            <div className="col center s6 m6">
              <label htmlFor="template-desc">Template Description:</label>
              <input id="template-desc" value={this.state.description} name="template-desc" required />
            </div>
          </form>
        </div>
        <div className="row">
          {renderFields}
          {renderRule}
        
          <div style={{paddingBottom: "20px"}} className="col center s12 m12">
            <button className="btn light-blue darken-3" onClick={this.goToUploadPage}>
              Upload Using This Template  
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowNumericTemplate;
