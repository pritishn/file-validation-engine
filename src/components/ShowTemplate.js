import React, { Component } from "react";
import database from "../datastore";
import ShowTemplateField from "./ShowTemplateField"
export default class ShowTemplate extends Component {
  state = {
    name: "",
    description: "",
    fields: [],
    groupRelations: "",
  };

  componentDidMount() {
    let template = database.templates.find(
      (template) => template.templateID == this.props.match.params.id);
    this.setState({
      name: template.name,
      description: template.description,
      fields: template.fields,
      groupRelations: template.groupRelations,
    });
  }

  render() {
    const fields = this.state.fields.map((field) => {
      return (
        <div className="col s12 m12">
          <ShowTemplateField fieldValues={field} />
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">
        <form  className="col row s12 m12" onSubmit={this.createFields}>
            <div className="col center s12 m12">
              <label htmlFor="template-name" className="active">Template Name:</label>
              <input id="template-name" name="template-name" value={this.state.name} required />
            </div>
            <div className="col center s12 m12">
              <label htmlFor="template-desc" className="active">Template Description:</label>
              <input  className="materialize-textarea" id="template-desc" name="template-desc" value={this.state.description} required />
            </div>
            <br/><br/>
            <div className="card">
              {fields}
            </div>
          </form>
        </div>
      </div>
    );
  }
}
