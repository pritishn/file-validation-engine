import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class TemplateField extends Component {
    componentDidMount() {
       // M.AutoInit(); // initializes the select temlpate button!
    }
    render() {
        return (
            <div className="container">
                <div className="row center card-panel">
                        <div className="input-field col s4">
                            <label>Header Name</label>
                            <input placeholder="" id="header_name" type="text" className="validate" />
                        </div>
                        <div className="input-field col s4">
                            <label>DataType</label>
                            <input placeholder="" id="data_type" type="text" className="validate" />
                        </div>
                        <div className="input-field col s4">
                            <label for="date_form">DateForm</label>
                            <input placeholder="" id="date_form" type="text" className="validate" />
                        </div>
                        <div className="field-icons right">
                            <a className="waves-effect waves-light btn-small black" style={{marginRight:'10px'}} ><i className="small material-icons">add_box</i></a>
                            <a className="waves-effect waves-light btn-small black"><i className="small material-icons">storage</i></a>
                        </div>
                        
                </div>
            </div>
        )
    }
}

export default TemplateField;