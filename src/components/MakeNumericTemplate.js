import React, { Component } from "react";
import firebase from "../firebase/firebase-init";
import { BrowserRouter, Link } from "react-router-dom";
import ReactDOM, { render } from "react-dom";
import database from "../datastore";
import NotLoggedIn from "./NotLoggedIn";
import TemplateField from "./TemplateField";
import { saveTemplateToDB } from "../firebase/firebase-intercations";

class MakeNumericTemplate extends Component {
    state = {
        name: "",
        description: "",
        fields: [],
        showgroupform: false,
        form_submitted: false,
      };
    
      createFields = (e) => {
        e.preventDefault();
    
        var singleField = {
          headerName: "",
          dataType: "",
          dateType: "",
          collection: "",
        };
        var numberOfFields = Number(e.target.elements["number-of-fields"].value);
        var temp = Array(numberOfFields).fill(singleField);
    
        this.setState({
          name: e.target.elements["template-name"].value,
          description: e.target.elements["template-desc"].value,
          showgroupform: true,
          fields: temp,
        });
      };
      componentDidMount() {}
      giveDataToParent = (data, index) => {
        let temp_fields = this.state.fields;
        temp_fields[index] = data;
        console.log("recieved data", temp_fields, this.state.fields);
        this.setState({
          fields: temp_fields,
        });
      };
      onSubmit = async () => {
        await this.setState({ form_submitted: true });
        var final_template = {
          name: this.state.name,
          description: this.state.description,
          fields: this.state.fields,
        };
        await saveTemplateToDB(final_template);
        alert("Template Saved to DB!");
        
      };
      render() {
        const renderFields = this.state.fields.map((field, index) => {
          return (
            <TemplateField
              param_id={index}
              form_submitted={this.state.form_submitted}
              giveDataToParent={this.giveDataToParent}
            />
          );
        });
    
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
                  <label htmlFor="template-name">Enter Template Name:</label>
                  <input id="template-name" name="template-name" required />
                </div>
                <div className="col center s6 m6">
                  <label htmlFor="template-desc">Enter Template Description:</label>
                  <input id="template-desc" name="template-desc" required />
                </div>
    
                <div className="col center s4 m12">
                  <label htmlFor="number-of-fields">Enter Number Of Headers:</label>
                  <input id="number-of-fields" name="number-of-fields" required />
                </div>
                <div className="col center s12 m12">
                  <button className="btn-small light-blue darken-3" type="submit">
                    Create Fields
                  </button>
                </div>
              </form>
            </div>
            <div className="row">
              {renderFields}
              <div className="col center s12 m12">
                <button className="btn light-blue darken-3" onClick={this.onSubmit}>
                  Save Template!
                </button>
              </div>
            </div>
          </div>
        );
      }
}

export default MakeNumericTemplate;
