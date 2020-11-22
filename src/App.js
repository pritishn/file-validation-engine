import Navbar from "./components/Navbar";
import UploadPage from "./components/UploadPage";
import LoginPage from "./components/LoginPage";
import ViewTemplates from "./components/ViewTemplates";
import MakeNumericTemplate from "./components/MakeNumericTemplate";
import "./firebase/firebase-intercations";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { render } from "@testing-library/react";
import { Component } from "react";
import {
  getAllTemplates,
  getCollectionList,
} from "./firebase/firebase-intercations";
import MakeNewTemplates from "./components/MakeNewTemplate";
import database from "./datastore";
import TemplateField from "./components/TemplateField";
import "./App.css";
import TemplateCard from "./components/TemplateCard";
import History from "./components/History";
import ShowTemplate from "./components/ShowTemplate";
import ShowTemplateField from "./components/ShowTemplateField";
import showTemplate from "./components/ShowTemplate";
import ErrorLog from "./components/ErrorLog";
import Footer from "./components/Footer";

class App extends Component {
  state = {
    username: "",
    loggedIn: false,
  };

  async componentDidMount() {
    database.templates = await getAllTemplates();
    database.collections = await getCollectionList();
    console.log(database.collections);
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App" style={{ minHeight: "100vh" }}>
          <Navbar />
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/view_templates" component={ViewTemplates} />
            <Route exact path="/make_template" component={MakeNewTemplates} />
            <Route exact path="/upload" component={UploadPage} />
            <Route exact path="/template_field" component={TemplateField} />
            <Route exact path="/template_card" component={TemplateCard} />
            <Route exact path="/history" component={History} />
            <Route exact path="/show" component={ShowTemplate} />
            <Route exact path="/single" component={ShowTemplateField} />
            <Route exact path="/template/:id" component={showTemplate} />
            <Route exact path="/error" component={ErrorLog} />
            <Route exact path="/add_numeric" component={MakeNumericTemplate} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
