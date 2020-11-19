import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class TemplateField extends Component {
    componentDidMount() {
       // M.AutoInit(); // initializes the select temlpate button!
    }
    render() {
        return (
            <div className="container">
                <div className="row center">
                    <div className="input-field col s4">
                        <label>Header Name</label>
                        <input placeholder="" id="header_name" type="text" className="validate" />
                    </div>
                    <div className="input-field col s4">
                        <label>DataType</label>
                        <input placeholder="" id="data_type" type="text" className="validate" />
                    </div>
                    <div className="input-field col s4">
                        <label for="disabled">DateForm</label>
                        <input placeholder="" id="disabled" type="text" className="validate" />
                    </div>
                </div>
            </div>
        )
    }
}

export default TemplateField;