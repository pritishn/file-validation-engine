import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class TemplateCard extends Component {
  state = { templateName:"",
    templateDescription:"",
    ownerName:"",
    templateID:"",
    dateCreated:""
  };
  componentDidMount(){
    let data=this.props.template_data;
    this.setState({
      templateName:data.name,
      templateDescription:data.description,
      ownerName:data.ownerName,
      templateID:data.templateID,
      dateCreated:data.dateCreated
    });
  }
  render() {
    return (
      <div style={{ paddingTop: "10px" }}>
        <div class="center col s12 m12">
          <div class="card hoverable small z-depth-2" style={{ borderRadius: "10px" }}>
            <div class="card-content">
              <h5>{this.state.templateName}</h5>
              <p className="truncate">{this.state.templateDescription}</p>
              <div className="card-content">
                <p className="grey-text">{this.state.ownerName}</p>
              </div>
            </div>
            <div
              class="card-action light-blue darken-3"
              style={{ borderRadius: "0px 0px 10px 10px",fontSize:"0.8em" }}
            >
              <Link to={"/template/"+this.state.templateID} className="white-text center">
                  <b>View This Template</b>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
