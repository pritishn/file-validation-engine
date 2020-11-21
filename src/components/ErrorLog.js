import React, { Component } from "react";

import { saveAs } from "file-saver";

export default class ErrorLog extends Component {
  state = { errCode: 404, errMessage: "This is a dummy error file" };

  handleClick = () => {
    var blob = new Blob([this.state.errMessage], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, "errorFile.txt");
  };

  render() {
    return (
      <div className="row container center">
        <div className="col s12 m6">
          <div className="card dell-blue z-depth-2 ">
            <div className="card-content white-text">
              <span className="card-title">
                Error Code: {this.state.errCode}
              </span>
              <p>{this.state.errMessage}</p>
            </div>
            <div className="card-action">
              <button
                onClick={this.handleClick}
                className="btn white dell-blue-text text-bold"
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
