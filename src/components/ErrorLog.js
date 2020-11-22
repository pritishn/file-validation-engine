import React, { Component } from "react";

import { saveAs } from "file-saver";

export default class ErrorLog extends Component {
  state = {
    fileName:"Error Report",
    errorReports: [],
    errorMessage:[],
  };
  componentDidMount(){
    if(this.props.errorReports.length>0)
    this.setState({ errorReports : this.props.errorReports},()=>{
      let messages=[];
      messages.push(<p>'==================== ERROR FILE ========================\n'</p>);
      for (const report of this.state.errorReports){
        messages.push(report);
      }
      this.setState({errorMessage:messages});
    });

  }
  handleClick = () => {
    const fileName = this.state.fileName;
    const errorMessage = this.state.errorMessage;

    var blob = new Blob([errorMessage], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, fileName);
  };

  render() {
    const noError = (this.state.errorReports.length==0) ? ("NO ERRORS FOUND :)") : (null); 
    
    return (
      <div className="row center">
        <div className="col s12 m12">
          <div className="card hoverable dell-blue z-depth-2 ">
            <div className="card-content white-text">
              <span className="card-title white-text">
                Error Code: {this.state.errCode}
              </span>
              <div className="card card-content z-depth-1 ">
                <span className="dell-blue-text">{noError} {this.state.errorMessage}</span>
              </div>
            </div>
            <div className="card-action ">
              <button
                onClick={this.handleClick}
                className="btn white dell-blue-text z-depth-1"
                style={{display: this.state.errorReports.length>0 ? 'block' : 'none' }}
              >
                Download Log
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
