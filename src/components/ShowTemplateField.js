import React, { Component } from "react";
import "@material-ui/core";
import database from "../datastore";
import { Card, TextField } from "@material-ui/core";

class ShowTemplateField extends Component {
  state = {
    headerName: "hn",
    dataType: "dt",
    dateType: "datet",
    regex: "reg",
    required: "req",
    group: "g",
    collection: "col",
    databaseQuery: "db",
  };
  //   state = {
  //     headerName: "",
  //     dataType: "",
  //     dateType: "",
  //     regex: "",
  //     required: "",
  //     group: "",
  //     collection: "",
  //     databaseQuery: "",
  //   };

  componentDidMount() {
    //   let data = this.props.fieldData;
    //   this.setState({
    //       headerName:data.headerName,
    //       dataType:data.dataType,
    //       dateType:data.dateType,
    //       regex: data.regex,
    //       required:data.required,
    //       group: data.group,
    //       collection: data.collection,
    //       databaseQuery: data.databaseQuery
    //   });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <input className="col s3 m3" value={this.state.headerName} readonly />
          <input className="col s3 m3" value={this.state.dataType} readonly />
          <input
            value={this.state.dateType}
            className="col s3 m3"
            style={{ display: this.state.dataType==="Date" ? "block" : "none" }}
            readonly
          />
        </div>
      </div>
    );
  }
}

export default ShowTemplateField;
