import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import ReactDOM from "react-dom";
import database from "../datastore";
import { getAllTemplates } from "../firebase/firebase-intercations";
import ErrorLog from "./ErrorLog";
import TemplateCard from "./TemplateCard";
import { CSVReader } from "react-papaparse";
import {validateRow_N} from '../validator';
import numeric from "../numeric";

class NumericUploadPage extends Component {
  state = {
    selectedTemplate: null,
    hasError: false,
    templates: [],
    userPressedAbort : false,
    rowBeingChecked:0,
    validationComplete:false,
    testCheckerMode:false,
    testCheckerComplete:false,
    showErrors:false,
  };

  errors=[];
  
  fullChecker = {
    header:true,
    skipEmptyLines: true,
    step:async (row,parser)=>{
      if(this.state.userPressedAbort){
        parser.abort();
      }
      await this.setState({rowBeingChecked:this.state.rowBeingChecked+1});
      let error = await validateRow_N(row);
      if(error!==null)this.errors.push(error);
    },
    complete:async ()=>{
      await this.setState({validationComplete:true,hasError:(this.errors.length>0)?true:false});
      this.showErrors();
    }
  };

  testChecker = {
    header:true,
    skipEmptyLines: true,
    step:async (row,parser)=>{
      if(this.state.userPressedAbort || this.state.rowBeingChecked >= 10){
        parser.abort();
        this.setState({testCheckerComplete:true});
      }
      await this.setState({rowBeingChecked:this.state.rowBeingChecked+1});
      let error = await validateRow_N(row.data,row.errors,this.selectedTemplate);
      this.errors.push(error);
    }
  };

  async componentDidMount() {
    var template = numeric.templates;
   
    this.setState({templates: template});
    console.log(this.state.templates);
  }

  changeSelected = async (e) => {
    if (e.target.selectedIndex - 1 == -1) return;
    var template = this.state.templates[e.target.selectedIndex - 1];
    await this.setState({selectedTemplate: null});
    await this.setState({selectedTemplate: template});
  };
  changeMode = async (e)=>{
    e.preventDefault();
    await this.setState({testCheckerMode:!this.state.testCheckerMode});
  }
  render() {
    const templateOption = this.state.templates.map((template) => {
      return <option value={template.templateID}>{template.name}</option>;
    });
    const selectedTemplate = () =>
      this.state.selectedTemplate != null ? (
        <TemplateCard template_data={this.state.selectedTemplate} />
      ) : null;

    const showError = () =>
      this.state.hasError ? (
        <div className="center">
          <ErrorLog errorReports={this.errors}></ErrorLog>
        </div>
      ) : null;

    return (
      <div>
        <div className="container row" style={{ marginTop: "5%" }}>
          <form style={{ padding: "0 10%" }}>
            <div className="input-field col s12 m12">
              Select Template To Use:
              <select
                className="browser-default"
                onChange={this.changeSelected}
              >
                <option value="" disabled selected>
                  Choose your Template:
                </option>
                {templateOption}
              </select>
            </div>
            {selectedTemplate()}
            <button className="btn col s4 m4 light-blue darken-3" style={{ height: "70px",marginTop:"10px" }} onClick={this.changeMode}>{"Enable "+(this.state.testCheckerMode?"Full":"Test") + " Mode"}</button>
            <div className="col s8 m8" style={{ height: "100px" }}>
              <CSVReader
                onDrop={null}
                onError={null}
                config={this.state.testCheckerMode?this.testChecker:this.fullChecker}
                addRemoveButton
                removeButtonColor="#659cef"
              >
                <span>Drop CSV file here or click to upload.</span>
              </CSVReader>
            </div>
          </form>
          {showError()}
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default NumericUploadPage;
