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
      <div className="row container center">
        <div className="col s12 m6">
          <div className="card dell-blue z-depth-2 ">
            <div className="card-content white-text">
              <span className="card-title white-text">
                Error Code: {this.state.errCode}
              </span>
              <div className="card card-content hoverable z-depth-2 ">
                <span className="dell-blue-text">{this.state.errMessage}</span>
              </div>
            </div>
            <div className="card-action ">
              <button
                onClick={this.handleClick}
                className="btn white dell-blue-text"
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
