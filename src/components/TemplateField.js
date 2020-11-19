import React, { Component } from "react";

class TemplateField extends Component {
  componentDidMount() {
    // M.AutoInit(); // initializes the select temlpate button!
  }
  state = {
    headerName: "",
    dataType: "1",
    required: "",
    dateFormat: "",
    group: "",
    regex: "",
    databaseQuery: "",
    isDateShowing: false,
    isDBShowing: false,
    isRegexShowing: false,
    gotData: false,
  };

  setDateToTrue = (e) => {
    e.preventDefault();
    if (e.target.value === "4") {
      this.setState({
        isDateShowing: !this.state.isDateShowing,
      });
    } else {
      this.setState({
        isDateShowing: false,
      });
    }
  };

  // DevLog: Pritish
  //Check all these handle functions. They are apparantly updating state value 1 step late.
  //Make a console log and check for clarifications.
  // Also check the required handle function. Its value is either on or null.
  handleHeaderName = (e) => {
    e.preventDefault();
    this.setState({
      headerName: e.target.value,
    });
  };

  handleDataType = (e) => {
    e.preventDefault();
    this.setState({
      dataType: e.target.value,
    });
  };

  handleDateType = (e) => {
    e.preventDefault();
    this.setState({
      dateType: e.target.value,
    });
  };

  handleGroup = (e) => {
    e.preventDefault();
    this.setState({
      group: e.target.value,
    });
    console.log(this.state.group)
  };

  handleRequired = (e) => {
    e.preventDefault();
    this.setState({
      required: e.target.value,
    });
    console.log(this.state.required);
  };

  handleRegexShow = (e) => {
    e.preventDefault();
    this.setState({
      isRegexShowing: !this.state.isRegexShowing,
    });
    console.log(this.state.isRegexShowing);
  };

  handleDBShow = (e) => {
    e.preventDefault();
    this.setState({
      isDBShowing: !this.state.isDBShowing,
    });
    console.log(this.state.isDBShowing);
  };

  render() {
    const displayDateSelector = this.state.isDateShowing ? (
      <div className="input-field col s4 m3">
        <select className="browser-default" name="dateFormat">
          <option value="1">Date : MM/DD/YYYY</option>
          <option value="2">Date : DD/MM/YYYY</option>
          <option value="3">Date : YYYY/MM/DD</option>
        </select>
      </div>
    ) : (
      <div className="input-field col s4 m3">
        <select disabled className="browser-default" name="dateFormat">
          <option value="1">Date : MM/DD/YYYY</option>
          <option value="2">Date : DD/MM/YYYY</option>
          <option value="3">Date : YYYY/MM/DD</option>
        </select>
      </div>
    );

    const displayRegex = this.state.isRegexShowing ? (
      <div className="col s6 m6">
        <label>Regex</label>
        <input name="regex" required />
      </div>
    ) : (
      <div></div>
    );

    const displayDB = this.state.isDBShowing ? (
      <div className="col s6 m6">
        <label>Database</label>
        <input name="dbName" required />
      </div>
    ) : (
      <div></div>
    );

    return (
      <div className="container col s12 m12">
        <div className="card-panel z-depth-2">
          <div className="row ">
            <div className="input-field col s2 m2">
              <label for="header_name">Header Name</label>
              <input
                placeholder=""
                id="header_name"
                type="text"
                className="validate"
                onChange={this.handleHeaderName}
              />
            </div>
            <div className="input-field col s2 m2">
              <select
                onChange={(e) => {
                  this.handleDataType(e);
                  this.setDateToTrue(e);
                }}
                className="browser-default"
              >
                <option value="1" defaultValue>
                  String
                </option>
                <option value="2">Number</option>
                <option value="3">Alpha-Numeric</option>
                <option value="4">Date</option>
              </select>
            </div>
            {displayDateSelector}
            <div className="input-field col s1 m1">
              <label for="group_name">Group</label>
              <input
                placeholder=""
                id="group_name"
                type="text"
                className="validate"
                onChange={this.handleGroup}
              />
            </div>
            <div className="input-field col s1 m1">
              <label>
                <input onChange={this.handleRequired} className="filled-in" name="required" type="checkbox" />
                <span>Required</span>
              </label>
            </div>
            <div className="row ">
              <div className="field-icons right s4 m4 alternate-option">
                <a
                  className="waves-effect  waves-light btn-small black"
                  style={{ marginRight: "10px" }}
                  onClick={this.handleRegexShow}
                >
                  <i className="small  material-icons">add_box</i>
                </a>
                <a
                  className="waves-effect waves-light btn-small black"
                  onClick={this.handleDBShow}
                >
                  <i className="small material-icons">storage</i>
                </a>
              </div>
            </div>
            {displayRegex}
            {displayDB}
          </div>
        </div>
      </div>
    );
  }
}

export default TemplateField;
