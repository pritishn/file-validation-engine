import React, { Component } from "react";
import "@material-ui/core";
import database from "../datastore";


class ShowTemplateField extends Component {
  state = {
    headerName: "",
    dataType: "String",
    isDateShowing: false,
    dateType: "MM/DD/YYYY",
    group: "",
    required: false,
    regex: "",
    collection: "",
    databaseQuery: "",
  };
  // ... Data handler complete ...
  async componentDidMount() {
    let data = this.props.fieldValues;
    this.setState({
      headerName: data.headerName,
      dataType: data.dataType,
      dateType: data.dateType,
      isDateShowing: data.isDateShowing,
      regex: data.regex,
      required: data.required,
      group: data.group,
      collection: data.collection,
      databaseQuery: data.databaseQuery,
    });
  }

  render() {
    const displayDateSelector = this.state.isDateShowing ? (
      <div className="input-field col s4 m3">
        <input
          className="validate"
          name="dateFormat"
          id="dateFormat"
          defaultValue={this.state.dateType}
        />
        <label htmlFor="dateFormat">Date</label>
      </div>
    ) : (
      null
    );

    const displayRegex = (
      <div className="row ">
        <div className="col input-field s12 m12">
          <input
            name="regex"
            id="regex"
            className="validate"
            placeholder="Regex"
            defaultValue={this.state.regex}
          />
          <label htmlFor="regex">Regex Query</label>
        </div>
      </div>
    );

    const displayDB = (
      <div className="row input-field s12 m12">
        <div className="col s6 m6">
          <input
            name="dbName"
            id="dbName"
            className="validate"
            placeholder="Database Name"
            defaultValue={this.state.collection}
          />
          <label htmlFor="dbName">Database Query</label>
        </div>
        <div className="col s6 m6">
          <input
            name="dbQuery"
            id="dbQuery"
            className="validate"
            placeholder="Database Query"
            defaultValue={this.state.databaseQuery}
            required
          />
          <label htmlFor="dbQuery">Database Query</label>
        </div>
      </div>
    );
    // ... Conditional Display Complete...

    return (
      <div className="col s12 m12">
        <div className="card-panel z-depth-2">
          <div className="row">
            <div className="input-field col s2 m2">
              <input
                placeholder="Header Name"
                id="header_name"
                type="text"
                className="validate active"
                defaultValue={this.state.headerName}
              />
              <label htmlFor="header_name" class="active">Name</label>
            </div>
            <div className="input-field col s2 m2">
              <input
                defaultValue={this.state.dataType}
                placeholder="Data Type"
                className="validate active"
                name ="dataType"
                id ="dataType"
              />
              <label htmlFor="dataType">Data</label>
            </div>
            {displayDateSelector}
            <div className="input-field col s1 m1">
              <input
                placeholder="Group"
                id="group_name"
                name="group_name"
                type="text"
                className="validate"
                defaultValue={this.state.group}
              />
              <label htmlFor="group_name">Group</label>
            </div>
            <div className="input-field col s1 m1">
              <label>
                <input
                  defaultValue={this.state.required}
                  className="filled-in"
                  name="required"
                  type="checkbox"
                  defaultChecked={this.state.required}
                />
                <span>Required</span>
              </label>
            </div>
            {displayRegex}
            {displayDB}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowTemplateField;
