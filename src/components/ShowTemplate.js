import React, { Component } from "react";
import database from "../datastore";

export default class ShowTemplate extends Component {
  state = {
    name:"",
    description:"",
    fields:[],
    groupRelations:"",
  };

  componentDidMount(){
    let template = database.templates.find(template => template.templateID == this.props.templateID);
    this.setState({
      name:template.name,
      description:template.description,
      fields:template.fields,
      groupRelations:template.groupRelations
    });
  };
  
  render() {
    const fields = this.state.fields.map((field)=>{
      return (
        <div className="col s12 m12">
          <hr></hr>

        </div>
      )
    });
    return (
        <div className="container">
          <div className="card">
            <div className="row">

            </div>
          </div>
        </div>
    );
  }
}
