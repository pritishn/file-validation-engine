import React, { Component } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import ReactDOM from "react-dom";

class Navbar extends Component {
  render() {
    //make navbar here
    return (
      <div className="Navbar">
            <nav class="nav-extended dell-blue z-depth-2" style={{marginBottom:"10px"}}>
          <div class="nav-wrapper">
            <a href="#" class="brand-logo center">
                File Validation Engine
            </a>
          </div>
          <div class="nav-content">
            <ul class="tabs tabs-transparent">
            <li class="tab">
                <Link to="/">Home </Link>
              </li>
              <li class="tab">	∎
              </li>
              {/* <li><Link to="/login">Login </Link></li> */}
              <li class="tab">
                <Link to="/make_template">Make New Template</Link>
              </li>
              <li class="tab">
                <Link to="/view_templates">View Templates</Link>
              </li>
              <li class="tab">
                <Link to="/upload">Upload File</Link>
              </li>

              <li class="tab">	∎
              </li>
              <li class="tab">
                <Link to="/add_numeric">Make Numeric Template</Link>
              </li>
              
              <li class="tab">
                <Link to="/view_numeric">View Numeric Templates</Link>
              </li>
              <li class="tab">
                <Link to="/upload_numeric">Upload Numeric File</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
