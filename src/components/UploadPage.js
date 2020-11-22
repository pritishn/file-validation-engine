import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import ReactDOM from "react-dom";
import database from "../datastore";
import { getAllTemplates } from "../firebase/firebase-intercations";
import ErrorLog from "./ErrorLog";
import TemplateCard from "./TemplateCard";
import { CSVReader } from "react-papaparse";
import { validateRow } from "../validator";
import { parse } from "papaparse";
import { CircularProgress } from "@material-ui/core";
class UploadPage extends Component {

  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }
  state = {
    selectedTemplate: null,
    templates: [],
    validationStarted:false,
    validationComplete: false,
    testMode:false,
    progress:"",
    errors : [],
    file:""
  };
 
  temp_errors=[];

  fullChecker = {
    header: true,
    skipEmptyLines: true,
    complete: (results, file) => {
      let f=file;
      this.setState({file:f})
      console.log("Parsing complete:", results, f)
    }
  };
  // testChecker = {
  //   header: true,
  //   skipEmptyLines:true
  // }

  showErrors = () => {
    //console.log(this.state.errors);
  };
  
  processFile=async (results)=>{
    this.setState({validationStarted:true, validationComplete:false});
    let i=1;
    this.temp_errors = [];
    let total=results.length;
    for(const row of results){
      if(this.state.testMode && i == 11) {break;}
      const error = await validateRow(i,row.data,row.errors,this.state.selectedTemplate);
      i++; await this.setState({progress:(i/total*100)});

      if(error){
        this.temp_errors.push(error);
      }
    }
    this.setState({errors:this.temp_errors,validationStarted:false, validationComplete:true});
    console.log(this.state.errors);
    console.log(this.fileInput);
  }

  async componentDidMount() {
    var template = database.templates;
    this.setState({ templates: template });
  }

  changeSelected = async (e) => {
    if (e.target.selectedIndex - 1 == -1) return;
    var template = this.state.templates[e.target.selectedIndex - 1];
    await this.setState({ selectedTemplate: null });
    await this.setState({ selectedTemplate: template });
  };
  changeMode = async (e) => {
    e.preventDefault();
    await this.setState({ testMode: !this.state.testMode });
  };
  
  inputFile ="";
  render() {
    const templateOption = this.state.templates.map((template) => {
      return <option value={template.templateID}>{template.name}</option>;
    });
    const selectedTemplate = () =>
      this.state.selectedTemplate != null ? (
        <TemplateCard template_data={this.state.selectedTemplate} />
      ) : null;

    const showError = () =>
      this.state.validationComplete ? (
        <div className="center">
          <ErrorLog errorReports={this.state.errors}></ErrorLog>
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
            <button
              className="btn col s4 m4 light-blue darken-3"
              style={{ height: "70px", marginTop: "10px" }}
              onClick={this.changeMode}
            >
              {"Enable " +
                (this.state.testMode ? "Full" : "Test") +
                " Mode"}
            </button>
            <div className="col s8 m8" style={{ height: "100px" }}>
              <CSVReader
                onDrop={this.processFile}
                inputRef={this.fileInput}
                onError={null}
                config={
                  // this.state.testCheckerMode? 
                   // this.testChecker
                   this.fullChecker
                }
                addRemoveButton
               
                removeButtonColor="#659cef"
              >
                <span>Drop CSV file here or click to upload.</span>
              </CSVReader>
            </div>
          </form>
          <input type="file"  onClick={this.handleFileInput} placeholder="j"/>
          <div className="col s12 m12 center" style={{marginTop:"20px",display: this.state.validationStarted ? 'block' : 'none' }}><CircularProgress/> <div style={{marginLeft:"2px",marginTop:"-30px",fontSize:"13px"}}>{Math.floor(this.state.progress)}%</div></div>
        
          {showError()}
          <div className="col s12 m12 center" style={{marginTop:"20px",display: this.state.validationComplete && this.state.errors.length ==0 ? 'block' : 'none' }}><button className="btn dell-blue">Upload To AWS</button></div>
        
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default UploadPage;
