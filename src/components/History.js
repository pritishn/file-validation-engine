import React, { Component } from "react";
import database from "../datastore";
import { getHistory } from "../firebase/firebase-intercations";
import { CircularProgress } from "@material-ui/core";

class History extends Component {
  state = {
    history: [],
    historyLoaded:false,
  };
 async componentDidMount() {
    if(!database.historyLoaded){
      database.history = await getHistory();
    }
    this.setState({
      history: database.history,
      historyLoaded:true,
    });
  }
  render() {
    const renderHistory = this.state.history.map((data) => {
      return data !== undefined ? (
        <tr>
          <td>{data.date}</td>
          <td>{data.file}</td>
          <td>{data.template}</td>
          <td style={{ color: data.status == "Successful" ? "green" : "red" }}>
            {data.status}
          </td>
          {/* <td>{data.fileStoreLink}</td> */}
        </tr>
      ) : null;
    });
    
    return (
      <div className="container">
        <div className="center" style={{display: this.state.historyLoaded ? 'none' : 'block' }}><CircularProgress/></div>
        

        <div className="card-panel " style={{ borderRadius: "10px" }} style={{display: this.state.historyLoaded ? 'block' : 'none' }} >
          <h5 className="center">Upload History</h5>
          <table className="highlight responsive-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>File Used</th>
                <th>Template Used</th>
                <th>Status</th>
                <th>File Link</th>
             </tr>
            </thead>

            <tbody>
              {renderHistory}
            </tbody>
          </table>
     
        </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
      </div>
    );
  }
}

export default History;
