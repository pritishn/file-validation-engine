import React, { Component } from "react";
import "@material-ui/core";
import database from "../datastore";

class TemplateFieldWithData extends Component {
  state = {
    headerName: "",
    dataType: "String",

    isDateShowing: false,
    dateType: "MM/DD/YYYY",
    group: "",
    required: false,

    isRegexShowing: false,
    regex: "",

    isDBShowing: false,
    collection: "",
    databaseQuery: "",

    collectionList: database.collections,
  };
// ... Data handler functions ...
  handleDataType = (e) =>
    this.setState({
      dataType: e.target.value,
      isDateShowing: e.target.value === "Date" ? true : false,
    });
  handleDateType = (e) => this.setState({ dateType: e.target.value });
  handleHeaderName = (e) => this.setState({ headerName: e.target.value });
  handleGroup = (e) => this.setState({ group: e.target.value });
  handleRequired = (e) => {
    console.log(e.target.checked);
    e.target.checked = !this.state.required;
    this.setState({ required: !this.state.required });
  }
  handleRegexShow = () =>
    this.setState({ isRegexShowing: !this.state.isRegexShowing });

  handleDBShow = () => this.setState({ isDBShowing: !this.state.isDBShowing });
  handleRegex = (e) => this.setState({ regex: e.target.value });
  handleCollection = (e) => this.setState({ collection: e.target.value });
  handleQuery = (e) => this.setState({ databaseQuery: e.target.value });
// ... Data handler complete ...
  async componentDidMount(){
    this.setState({headerName: this.props.headerName});
  }
  async componentDidUpdate(prevProps){
  
    if((!prevProps.form_submitted) && (this.props.form_submitted) ){
      let data = {
        headerName: this.state.headerName,
        dataType: this.state.dataType,
        dateType: this.state.dateType,
        regex: this.state.regex,
        required: this.state.required,
        group: this.state.group,
        collection: this.state.collection,
        databaseQuery: this.state.databaseQuery
      }
      console.log("giving to parent");
     await this.props.giveDataToParent(data,this.props.param_id);
    }
  }
  render() {
    
    // ... Conditional Display ...
    const displayDateSelector = this.state.isDateShowing ? (
      <div className="input-field col s4 m3">
        <select
          className="browser-default"
          name="dateFormat"
          onChange={this.handleDateType}
        >
          <option value="MM/DD/YYYY">Date : MM/DD/YYYY</option>
          <option value="DD/MM/YYYY">Date : DD/MM/YYYY</option>
          <option value="YYYY/MM/DD">Date : YYYY/MM/DD</option>
        </select>
      </div>
    ) : (
      <div className="input-field col s4 m3">
        <select
          className="browser-default"
          name="dateFormat"
          onChange={this.handleDateType}
          disabled
        >
          <option value="MM/DD/YYYY">Date : MM/DD/YYYY</option>
          <option value="DD/MM/YYYY">Date : DD/MM/YYYY</option>
          <option value="YYYY/MM/DD">Date : YYYY/MM/DD</option>
        </select>
      </div>
    );

    const displayRegex = this.state.isRegexShowing ? (
      <div className="col s12 m12">
        <input
          name="regex"
          placeholder="Regex"
          required
          onChange={this.handleRegex}
        />
      </div>
    ) : null;
    const collectionList = this.state.collectionList.map((collection) => {
      return <option value={collection.name}>{collection.name}</option>;
    });

    const displayDB = this.state.isDBShowing ? (
      <div className="row input-field col s12 m12">
        <select
          className="col browser-default s5 m5"
          onChange={this.handleCollection}
        >
          <option value="1" disabled selected onChange={this.handleCollection}>
            Database Collection
          </option>
          {collectionList}
        </select>

        {/* <i class="material-icons" onClick={this.showDbHelp} style={{ padding: "10px 10px" }}>help</i> */}
        <input
          name="dbQuery"
          className="col s5 m5 right"
          placeholder="Query"
          onChange={this.handleQuery}
          required
        />
      </div>
    ) : null;
    // ... Conditional Display Complete...

    return (
      <div className="col s12 m12">
        <div className="card-panel z-depth-2">
          <div className="row">
            <div className="input-field col s2 m2">
              <input
                value={this.state.headerName}
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
                }}
                className="browser-default"
              >
                <option value="String" defaultValue>
                  String
                </option>
                <option value="Number">Number</option>
                <option value="Alpha-Numeric">Alpha-Numeric</option>
                <option value="Date">Date</option>
              </select>
            </div>
            {displayDateSelector}
            <div className="input-field col s1 m1">
              <input
                placeholder="Group"
                id="group_name"
                type="text"
                className="validate"
                onChange={this.handleGroup}
              />
            </div>
            <div className="input-field col s1 m1">
              <label>
                <input
                  onChange={this.handleRequired}
                  className="filled-in"
                  name="required"
                  type="checkbox"
                  checked={this.state.required}
                />
                <span>Required</span>
              </label>
            </div>
            <div className="row ">
              <div className="field-icons right s4 m4 alternate-option">
                <a
                  className="waves-effect  waves-light btn-small cyan darken-4"
                  style={{ marginRight: "10px" }}
                  onClick={this.handleRegexShow} 
                >
                  <i className="small  material-icons">add_box</i>
                </a>
                <a
                  className="waves-effect waves-light btn-small blue darken-4"
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

export default TemplateFieldWithData;
