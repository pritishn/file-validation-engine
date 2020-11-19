import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class TemplateMinimal extends Component {
  state = {
    templateName: "Template 1",
    templateDescription:
      "I am a very simple card. I am good at containing small bits of information.I am convenient because I require little markup to use effectively.",
    ownerName: "Anurag",
    dateCreated: "19/11/2020",
    templateEfficiency: "89%",
  };

  render() {
    return (
      <div className="" style={{ paddingTop: "10px" }}>
        <div class="center col s12 m12">
          <div class="card hoverable small z-depth-2" style={{ borderRadius: "10px" }}>
            <div class="card-content">
              <span class="card-title ">{this.state.templateName}</span>
              <p className="truncate">{this.state.templateDescription}</p>
              <div className="card-content left">
                <p className="grey-text">{this.state.ownerName}</p>
                <p className="grey-text">{this.state.dateCreated}</p>
              </div>
              <div className="card-content right">
                <p>
                  Efficiency: <a>{this.state.templateEfficiency}</a>
                </p>
              </div>
              <div className="left"></div>
            </div>
            <div
              class="card-action  indigo darken-4"
              style={{ borderRadius: "0px 0px 10px 10px" }}
            >
              <Link to={"/"} className="white-text">
                View This Template
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
