import React, { Component } from "react";
import firebase from "../firebase/firebase-init";
import database from "../datastore";
import NotLoggedIn from "./NotLoggedIn";
import TemplateFieldWithData from "./TemplateFieldWithData";
import { saveTemplateToDB } from "../firebase/firebase-intercations";

class ExtractHeaders extends Component {
  state = {
    name: "",
    description: "",
    fields: [],
    groupRelations: "",
    showgroupform: false,
    form_submitted: false,
  };

  async componentDidMount() {
    var numberOfFields = this.props.location.state.numberOfFields;
    //Number(e.target.elements["number-of-fields"].value);
    let temp = [];
    for (let field of this.props.location.state.fields) {
      temp.push({
        headerName: field,
        dataType: "",
        dateType: "",
        regex: "",
        required: "",
        group: "",
        collection: "",
        databaseQuery: "",
      });
    }
    console.log(temp);
    await this.setState({
      name: "",
      description: "",
      showgroupform: true,
      fields: temp,
    });
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
  handleName = (e)=>{
    this.setState({
      name:e.target.value
    })
  }
  handleDesc = (e)=>{
    this.setState({
      description:e.target.value
    })
  }
  render() {
    const renderFields = this.state.fields.map((field, index) => {
      return (
        <TemplateFieldWithData
          param_id={index}
          headerName={this.state.fields[index].headerName}
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
              <input
                id="template-name"
                name="template-name"
                required
                onChange={this.handleName}
              />
            </div>
            <div className="col center s6 m6">
              <label htmlFor="template-desc">Enter Template Description:</label>
              <input
                id="template-desc"
                name="template-desc"
                required
                onChange={this.handleDesc}
              />
            </div>
          </form>
        </div>
        <div className="row">
          {renderFields}
          {renderGroupRelation}
          <div className="col center s12 m12">
            <button className="btn light-blue darken-4" onClick={this.onSubmit}>
              Save Template!
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ExtractHeaders;
