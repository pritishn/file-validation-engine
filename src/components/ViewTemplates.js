import React, { Component } from "react";
import firebase from '../firebase/firebase-init'
import { BrowserRouter, Link } from "react-router-dom";
import NotLoggedIn from "./NotLoggedIn";
import database from "../datastore";
import addicon from "../add.svg";
import ReactDOM from "react-dom";
import TemplateCard from "./TemplateCard";

class ViewTemplates extends Component {
  state={
    searchFieldValue:"",
    templates:[]
  }
  handleSearch = (e)=> this.setState({searchFieldValue:e.target.value});
  componentDidMount(){
    this.setState({
      templates:database.templates
    })
  }
  render() {
    const temps = this.state.templates.map((temp) => {
      return (this.state.searchFieldValue=="" || temp.name.search(this.state.searchFieldValue)!=-1)?(
        <div class="col s4 m4">
          <TemplateCard template_data={temp} />
        </div>
      ):(null);
    });
    return !firebase.auth().currentUser ? (
      <div className="container">
        <NotLoggedIn />
      </div>
      ):(
      <div className="container ">
        <div className="row">
        <div className="col m3 s3"></div>
        <div className="nav-wrapper col m6 s6">
         
            <form>
              <div class="input-field">
                <input
                  id="search"
                  type="search"
                  placeholder="Search Bar"
                  required
                  onChange={this.handleSearch}
                />
                <label class="label-icon" for="search">
                  <i class="material-icons black-text">search</i>
                </label>
                <i class="material-icons">close</i>
              </div>
            </form>
          </div>
          </div>
        
        <div className="row">
        {temps}
        </div>
      </div>
    );
  }
}

export default ViewTemplates;
