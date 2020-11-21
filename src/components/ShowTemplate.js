import React, { Component }   from "react";
import database from "../datastore";

export default class ShowTemplate extends Component{
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
    
        collectionList: database.allCollections,
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


  
    render(){
        /*const templates = database.templates;
        const temps = templates.map(temp =>{
            return(
                <div className="showTemplate">
                    <div className="container">
                        <div className="row">
                            <div className="col s12">
                                <div className="card-panel">
                                    <h2>{temp.name}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } 
        ) */

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
        <div className="col s4 m3">
          <p>Date</p>
        </div>
      );
    
      const displayRegex = this.state.isRegexShowing ? (
        <div className="col s12 m12">
            <p>Regex</p>
        </div>
      ) : null;
    
      const displayDB = this.state.isDBShowing ? (
        <div className="row col s12 m12">
          <p>dbCollection</p>
    
          {/* <i class="material-icons" onClick={this.showDbHelp} style={{ padding: "10px 10px" }}>help</i> */}
          <p>dbQuery</p>
        </div>
      ) : null;
      // ... Conditional Display Complete...
    
  
      

        return(
        <div className="showTemplate">
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <div className="card-panel z-depth-2">
                            <h4 className="center">Name</h4> 
                            <p>This is the description</p>
                        </div>
                    </div>
                </div>
                <div className="col s12 m12">
                    <div className="card-panel z-depth-2">
                    <div className="row">
                        <div className="col s2 m2">
                        <p>Header Name
                        </p>
                        </div>
                        <div className="col s2 m2">
                        <p>DataType</p>
                        </div>
                        {displayDateSelector}
                        <div className="col s1 m1">
                        <p> Group </p>
                        </div>
                        <div className="col s1 m1">
                        <p>Required</p>
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
        </div>    
    </div>
        )  
    }
}
