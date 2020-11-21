import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import ReactDOM from "react-dom";
import database from "../datastore";
import { getAllTemplates } from "../firebase/firebase-intercations";

class UploadPage extends Component {
  state = {
    selectedTemplate: null,
    templates: [],
  };
  async componentDidMount() {
    var template = await getAllTemplates();
    this.setState({
      templates: template,
    });
    console.log(this.state.templates);
  }
  changeSelected = (e) => {
    var idx = e.target.selectedIndex - 1;
    var template = this.state.templates[idx];
    this.setState({
      selectedTemplate: template,
    });
  };
  render() {
    const templateOption = this.state.templates.map((template) => {
      return <option value={template.templateID}>{template.name}</option>;
    });
    const selectedTemplate = (template) => {
      return this.state.selectedTemplate != null ? (
        <div>
          <div class="center col s12 m12 ">
            <div class="card small z-depth-1">
              <div class="card-content">
                <span class="card-title">
                  {this.state.selectedTemplate.name}
                </span>
                <p>{this.state.selectedTemplate.description}</p>
              </div>
              <div class="card-action black">
                <Link
                  to={"/templates/" + this.state.selectedTemplate.templateID}
                />
                <a href="" className="white-text">
                  View This Template
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p />
      );
    };
    return (
      <div className="container row" style={{ marginTop: "5%" }}>
        <form style={{ padding: "0 10%" }}>
          <div className="input-field col s12 m12">
            Select Template To Use:
            <select className="browser-default" onChange={this.changeSelected}>
              <option value="" disabled selected>
                Choose your Template:
              </option>
              {templateOption}
            </select>
          </div>
          <div>{selectedTemplate()}</div>
          <div className="file-field col s12 m12 center">
            <input className="center" type="file" />
            <button className=" btn center blue darken-4">Select File</button>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default UploadPage;
