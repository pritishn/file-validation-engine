import React, { Component } from "react";
import firebase from "../firebase/firebase-init";
import { BrowserRouter, Link } from "react-router-dom";
import ReactDOM, { render } from "react-dom";
import database from "../datastore";
import NotLoggedIn from "./NotLoggedIn";
import TemplateField from "./TemplateField";
import { saveTemplateToDB } from "../firebase/firebase-intercations";
import { CSVReader } from "react-papaparse";

class MakeNewTemplates extends Component {
  state = {
    name: "",
    description: "",
    fields: [],
    groupRelations: "",
    showgroupform: false,
    form_submitted: false,
  };
  extractConfig ={
    step:(row,parser)=>{
      parser.abort();
      this.props.history.push({
        pathname: '/extract_headers',
        state: { numberOfFields : row.data.length,fields:row.data}
      });
    }
  }
  createFields = (e) => {
    e.preventDefault();

    var singleField = {
      headerName: "",
      dataType: "",
      dateType: "",
      regex: "",
      required: "",
      group: "",
      collection: "",
      databaseQuery: "",
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
  extractionFileLoaded(){

  }
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
      groupRelations: this.state.groupRelations,
    };
    final_template['templateID'] = await saveTemplateToDB(final_template);
    database.templates.push(final_template);
    alert("Template Saved to DB!");
  };
  handleGroupRelation = (e) => {
    this.setState({
      groupRelations: e.target.value,
    });
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
    const renderGroupRelation = this.state.showgroupform ? (
      <div className="container col s12 m12">
        <div className="card-panel">
          <input
            id=" input-field group-relations"
            className=""
            placeholder="Enter Group Relations"
            name="group-relations"
            onChange={this.handleGroupRelation}
          />
        </div>
      </div>
    ) : (
      <div></div>
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
            <div className="col row s12 m12 ">
              <div className="col center s12 m12" style={{ margin:"10px",height: "25px",paddingLeft:"30%",paddingRight:"30%" }}>
                <CSVReader
                  onDrop={this.extractionFileLoaded}
                  config={this.extractConfig}
                >
                  <span>Or extract from file.</span>
                </CSVReader>
              </div>
            </div>
          </form>
        </div>
        <div className="row">
          {renderFields}
          {renderGroupRelation}
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

export default MakeNewTemplates;
