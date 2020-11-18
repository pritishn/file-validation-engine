import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import M from "../materialize";
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
      return this.state.selectedTemplate != null ? (<div>
          <div class="center col s4 m4 ">
                    <div class="card small darken-1">
                        <div class="card-content">
                        <span class="card-title">{ this.state.selectedTemplate.name}</span>
                            <p>{ this.state.selectedTemplate.description}</p>
                        </div>
                        <div class="card-action black">
                            <Link to={'/templates/'+ this.state.selectedTemplate.templateID} ></Link>
                        <a href="" className="white-text">View This Template</a>
                        </div>
                    </div>
                </div>
      </div> ): (<p></p>);
    };
    return (
      <div className="container row">
        <form>
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
            <button className=" btn center black">Select File</button>
          </div>
        </form>
      </div>
    );
  }
}

export default UploadPage;
