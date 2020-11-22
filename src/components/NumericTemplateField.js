import React, { Component } from "react";
import "@material-ui/core";
import database from "../datastore";

class NumericTemplateField extends Component {
  state = {
    headerName: "",
    collectionList: database.collections,
  };
// ... Data handler functions ...
  handleHeaderName = (e) => this.setState({ headerName: e.target.value });
// ... Data handler complete ...
  async componentDidUpdate(prevProps){
  
    if((!prevProps.form_submitted) && (this.props.form_submitted) ){
      let data = {
        headerName: this.state.headerName,
      }
      console.log("giving to parent");
     await this.props.giveDataToParent(data,this.props.param_id);
    }
  }
  render() {

    return (
      <div className="col s6 m6 center-align">
        <div className="card-panel z-depth-2">
          <div className="row">
            <div className="input-field col s5 m5 center">
              <input
                placeholder="Header Name"
                id="header_name"
                type="text"
                className="validate"
                onChange={this.handleHeaderName}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NumericTemplateField;
