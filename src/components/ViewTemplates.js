import React, { Component } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import database from "../datastore";
import addicon from "../add.svg";
import ReactDOM from "react-dom";
import TemplateCard from "./TemplateCard";

class ViewTemplates extends Component {
  render() {
    const templates = database.templates;

    const temps = templates.map((temp) => {
      return (
        <div class="center col s4 m4">
          <TemplateCard class="center col s4 m4" template_data={temp}/>
        </div>
      );
    });
    return (
      <div className="container row">
        {temps}
      </div>
    );
  }
}

export default ViewTemplates;
