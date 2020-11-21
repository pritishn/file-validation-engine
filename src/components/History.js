import React, { Component } from "react";
import database from "../datastore";

class History extends Component {
  state = {
    history: [],
  };
 componentDidMount() {
    this.setState({
      history: database.history,
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
          <td>{data.errorLogLink}</td>
        </tr>
      ) : null;
    });
    return (
      <div className="container">
        <div className="card-panel " style={{ borderRadius: "10px" }}    >
          <h4 className="center">Upload History</h4>
          <table className="highlight responsive-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>File Used</th>
                <th>Template Used</th>
                <th>Status</th>
                <th>Error Log</th>
              </tr>
            </thead>

            <tbody>
              {renderHistory}
            </tbody>
          </table>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
    );
  }
}

export default History;
