import React, { Component } from "react";

class history extends Component{
    componentDidMount() {}

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
                            <td>10/10/10</td>
                            <td>csv</td>
                            <td>Topi is OP</td>
                            <td>Passed</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default history;