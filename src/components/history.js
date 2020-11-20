import React, { Component } from "react";

class history extends Component{
    componentDidMount() {}
    state = {
        date: "20/11/2020" ,
        file: "filename.csv",
        template:  "templateName",
        status: "Pass/Fail",
    };
    render(){

        return(
            <div className="history">
                <div className="container">
                    <h2 className="center">History</h2>  
                    <table className="highlight responsive-table"> 
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>File used</th>
                            <th>Template Used</th>
                            <th>Status</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <td>{this.state.date}</td>
                            <td>{this.state.file}</td>
                            <td>{this.state.template}</td>
                            <td>{this.state.status}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default history;