import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotLoggedIn extends Component {
	render () {
		return (
			<div className='NotLoggedIn card center'>
				<p style={{ fontSize: '1.8em', fontWeight: '470', paddingTop: '5%' }}>
					You are not LOGGED IN! <br />Please Login to Access this Feature
				</p>
				<Link to='/'>
					<a className='btn btn-large btn-waves dell-blue-dark' style={{ borderRadius: '5px', fontSize: '1.1em',margin:'20px' }}>
						<b>Login</b>
					</a>
				</Link>
			</div>
		);
	}
}

export default NotLoggedIn;
