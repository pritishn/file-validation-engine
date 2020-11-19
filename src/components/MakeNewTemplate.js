import React, { Component } from 'react';
import firebase from '../firebase/firebase-init';
import { BrowserRouter, Link } from 'react-router-dom';
import ReactDOM, { render } from 'react-dom';
import database from '../datastore';
import NotLoggedIn from './NotLoggedIn';

class MakeNewTemplates extends Component {
	state = {
		name: '',
		description: '',
		fields: [],
		dependencies: []
	};

	createFields = (e) => {
		e.preventDefault();

		var singleField = {
			headername: '',
			datatype: '',
			datetype: '',
			regex: '',
			required: '',
			group: '',
			databasequery: ''
		};
		var numberOfFields = Number(e.target.elements['number-of-fields'].value);
		var temp = Array(numberOfFields).fill(singleField);

		this.setState({
			name: e.target.elements['template-name'].value,
			description: e.target.elements['template-desc'].value,
			fields: temp
		});
	};
	async componentDidMount () {
		console.log(firebase.auth().currentUser);
	}

	render () {
		const renderFields = this.state.fields.map((field) => {
			return (
				<div className='row card gray'>
					<div className='col s2 m3' id=''>
						<label>Header Name</label>
						<input name='${&#39;headername-&#39;+id}' required />
					</div>
					<div className='col s2 m3' id=''>
						<label>Choose Data Type</label>
						<select className='browser-default' name='${&#39;datatype-&#39;+id}'>
							<option value='1' selected=''>
								String
							</option>
							<option value='2'>Number</option>
							<option value='3'>Alpha-Numeric</option>
							<option value='4'>Date</option>
						</select>
					</div>
					<div className='col s2 m3' id=''>
						<label>Choose Date Format</label>
						<select
							className='browser-default'
							name='${&#39;dateformat-&#39;+id}'
							onchange='setChange(this)'
							disabled
						>
							<option value='1'>Date : MM/DD/YYYY</option>
							<option value='2'>Date : DD/MM/YYYY</option>
							<option value='3'>Date : YYYY/MM/DD</option>
						</select>
					</div>
					<div className='col s2 m1'>
						<label>Group</label>
						<input name='${&#39;group-&#39;+id}' required />
					</div>
					<div className='input-field col s1 m1'>
						<label>
							<input className='filled-in' name='${&#39;required-&#39;+id}' type='checkbox' />
							<span>Required</span>
						</label>
					</div>
					<div className='col s6 m6'>
						<label>Regex</label>
						<input name='${&#39;regex-&#39;+id}' required />
					</div>
					<div className='col s6 m6'>
						<label>Database</label>
						<input name='${&#39;databasequery-&#39;+id}' required />
					</div>
				</div>
			);
		});

		return !firebase.auth().currentUser ? (
			<div className='container'>
				<NotLoggedIn />
			</div>
		) : (
			<div className='container' style={{ padding: '3% 10%' }}>
				<h5 className='center'>Make A New Temlpate</h5>
				<div className='row'>
					<form className='col row s12 m12' onSubmit={this.createFields}>
						<div className='col center s6 m6'>
							<label htmlFor='template-name'>Enter Template Name:</label>
							<input id='template-name' name='template-name' required />
						</div>
						<div className='col center s6 m6'>
							<label htmlFor='template-desc'>Enter Template Description:</label>
							<input id='template-desc' name='template-desc' required />
						</div>

						<div className='col center s4 m12'>
							<label htmlFor='number-of-fields'>Enter Number Of Headers:</label>
							<input id='number-of-fields' name='number-of-fields' required />
						</div>
						<div className='col center s12 m12'>
							<button className='btn-small black' type='submit'>
								Create Fields
							</button>
						</div>
					</form>
				</div>
				<div className='row'>
					{renderFields}
					<div className='col center s12 m12'>
						<button className='btn black'>Save Template!</button>
					</div>
				</div>
			</div>
		);
	}
}

export default MakeNewTemplates;
