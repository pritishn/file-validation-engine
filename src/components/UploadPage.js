import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import ReactDOM from "react-dom";
import database from "../datastore";
import { getAllTemplates } from "../firebase/firebase-intercations";
import ErrorLog from "./ErrorLog";
import TemplateCard from "./TemplateCard";

class UploadPage extends Component {
  state = {
    selectedTemplate: null,
    hasError: false,
    templates: [],
  };
  async componentDidMount() {
    var template = await getAllTemplates();
    this.setState({
      templates: template,
    });
    console.log(this.state.templates);
  }
  changeSelected = async (e) => {
    var idx = e.target.selectedIndex - 1;
    if(idx==-1) return;
    var template = this.state.templates[idx];
    await this.setState({
      selectedTemplate: null,
    });
    await this.setState({
      selectedTemplate: template,
    });
  };
  render() {
    const templateOption = this.state.templates.map((template) => {
      return <option value={template.templateID}>{template.name}</option>;
    });
    const selectedTemplate = () => this.state.selectedTemplate != null ? (
        <TemplateCard template_data={this.state.selectedTemplate}/>
      ) : (
        null
      );
    const showError = ()=> this.state.hasError != null ? (
      <div className="center"> <ErrorLog className></ErrorLog></div>
      ) : (
        null
      );
  
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
          {selectedTemplate()}
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
