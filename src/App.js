import Navbar from "./components/Navbar";
import UploadPage from "./components/UploadPage";
import LoginPage from "./components/LoginPage";
import ViewTemplates from "./components/ViewTemplates";
import firebase from "./firebase/firebase-init";
import "./firebase/firebase-intercations";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { render } from "@testing-library/react";
import { Component } from "react";
import {
  getAllTemplates,
  loginWithGooglePopup,
  saveTemplateToDB,
} from "./firebase/firebase-intercations";
import MakeNewTemplates from "./components/MakeNewTemplate";
import database from "./datastore";
import TemplateField from "./components/TemplateField";
import './App.css';
import TemplateCard from "./components/TemplateCard";
import history from "./components/History";
import showTemplate from "./components/ShowTemplate";


class App extends Component {
  state = {
    username: "",
    loggedIn: false,
    templates: [],
  };

  getTemplates = async () => {
    database.templates = await getAllTemplates();
    this.setState({
      templates: database.templates,
    });
  };
  addTemplates = (template) => {
    let new_templates = [...this.state.templates];
    new_templates.push(template);
    saveTemplateToDB(template);
    this.setState({
      templates: new_templates,
    });
  };

  async componentDidMount() {
    this.getTemplates();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App" style={{minHeight: "100vh"}} >
          <Navbar />
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/view_templates" component={ViewTemplates} />
            <Route
              path="/make_template"
              render={(props) => (
                <MakeNewTemplates
                  {...props}
                  templates={this.state}
                  addTemplates={this.addTemplates}
                />
              )}
            />
            <Route path="/upload" component={UploadPage} />
            <Route exact path="/template_field" component={TemplateField} />
            <Route exact path="/template_card" component={TemplateCard} />
            <Route exact path="/history" component={history} />
            <Route exact path="/template/:id" component={showTemplate} />
            {/* <Route path='/template/:id' component={ShowOneTemplate} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
