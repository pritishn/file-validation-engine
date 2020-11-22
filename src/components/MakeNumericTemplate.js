import React, { Component } from "react";
import firebase from "../firebase/firebase-init";
import { BrowserRouter, Link } from "react-router-dom";
import ReactDOM, { render } from "react-dom";
import database from "../datastore";
import NotLoggedIn from "./NotLoggedIn";
import NumericTemplateField from "./NumericTemplateField";
import { saveTemplateToDB_Numeric } from "../firebase/firebase-intercations";


class MakeNumericTemplate extends Component {
    state = {
        name: "",
        description: "",
        fields: [],
        rule : "",
        showRule: false,
        form_submitted: false,
      };
    
      createFields = (e) => {
        e.preventDefault();
    
        var singleField = {
          headerName: "",
        };
        var numberOfFields = Number(e.target.elements["number-of-fields"].value);
        var temp = Array(numberOfFields).fill(singleField);
    
        this.setState({
          name: e.target.elements["template-name"].value,
          description: e.target.elements["template-desc"].value,
          showRule: true,
          fields: temp
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
          rule: this.state.rule,
        };
        await saveTemplateToDB_Numeric(final_template);
        alert("Numeric Template Saved to DB!");
        
      };

      handleRule = (e) => {
        this.setState({
          rule : e.target.value,
        });
      };
      render() {
        const renderFields = this.state.fields.map((field, index) => {
          return (
            <NumericTemplateField
              param_id={index}
              form_submitted={this.state.form_submitted}
              giveDataToParent={this.giveDataToParent}
            />
          );
        });

        const renderRule = this.state.showRule ? (
          <div className="container col s12 m12">
              <div class="input-field col s12 m12">
                <input id="Rule" type="text" class="validate" onChange={this.handleRule} />
                <label for="Rule">Rule</label>
              </div>
          </div>
        ) : (
          <div> </div>
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
              {renderRule}
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
