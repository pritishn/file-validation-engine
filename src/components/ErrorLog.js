import React, { Component } from "react";

import { saveAs } from "file-saver";

export default class ErrorLog extends Component {
  state = {
    errCode: 404,
    errMessage: "This is a dummy error file",
    fileName: "dummyFileName",
  };

  handleClick = () => {
    const fileName = this.state.fileName;
    const errorMessage =
      "===============ERROR_MESSAGE===============\n" +
      "ErrorCode: " +
      this.state.errCode +
      "\n" +
      "ErrorMessage: " +
      this.state.errMessage;

    var blob = new Blob([errorMessage], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, fileName);
  };

  render() {
    return (
      <div className="row center">
        <div className="col s12 m12">
          <div className="card hoverable dell-blue z-depth-2 ">
            <div className="card-content white-text">
              <span className="card-title white-text">
                Error Code: {this.state.errCode}
              </span>
              <div className="card card-content z-depth-1 ">
                <span className="dell-blue-text">{this.state.errMessage}</span>
              </div>
            </div>
            <div className="card-action ">
              <button
                onClick={this.handleClick}
                className="btn white dell-blue-text z-depth-1"
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
