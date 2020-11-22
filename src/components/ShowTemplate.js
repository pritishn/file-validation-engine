import React, { Component } from "react";
import database from "../datastore";
import ShowTemplateField from "./ShowTemplateField"
export default class ShowTemplate extends Component {
  state = {
    name: "",
    templateID:"",
    description: "",
    fields: [],
    groupRelations: "",
  };

  componentDidMount() {
    let template = database.templates.find(
      (template) => template.templateID == this.props.match.params.id);
    this.setState({
      name: template.name,
      templateID:template.templateID,
      description: template.description,
      fields: template.fields,
      groupRelations: template.groupRelations,
    });
  }
  goToUploadPage = (e)=>{
    e.preventDefault();
    this.props.history.push({
      pathname: '/upload'});
  }
  render() {
    const fields = this.state.fields.map((field) => {
      return (
        <div className="col s12 m12">
          <ShowTemplateField fieldValues={field} />
        </div>
      );
    });
    const renderGroup =  (
      <div className="container col s12 m12">
        <div class="input-field">
          <input
            id="Rule"
            type="text"
            class="validate"
            value={this.state.groupRelations}
            readOnly
          />
          <label for="Rule" className="active">Group Relation</label>
        </div>
      </div>
    );
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
              {renderGroup}
            </div>
          </form>
          <div style={{paddingBottom: "20px"}} className="col center s12 m12">
            <button className="btn light-blue darken-3" onClick={this.goToUploadPage}>
              Upload Using This Template  
            </button>
          </div>
        </div>
      </div>
    );
  }
}
