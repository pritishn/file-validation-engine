import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class TemplateMinimal extends Component {
  state = {
    templateName: "Title",
    templateDescription: "I am a very simple card. I am good at containing small bits of information.I am convenient because I require little markup to use effectively.",
    ownerName: "Anurag",
    dateCreated: "19/11/2020",
    templateEfficiency: "89%",
  };

  render() {
    return (
      <div style={{paddingTop: "15px"}} className="container">
        <div class="center col s4 m4 ">
          <div class="card small z-depth-3 ">
            <div class="card-content">
              <span class="card-title"><h3>{this.state.templateName}</h3></span>
              <p>{this.state.templateDescription}</p>
              <div style={{paddingTop: "40px",paddingRight: "70px"}} className="right">
                <p className="grey-text">{this.state.ownerName}</p>
                <p className="grey-text">{this.state.dateCreated}</p>
              </div>
              <div style={{paddingTop: "40px",paddingLeft: "70px"}} className="left">
                <span>Efficiency: <a>{this.state.templateEfficiency}</a></span>
              </div>
            </div>
            <div class="card-action black">
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
