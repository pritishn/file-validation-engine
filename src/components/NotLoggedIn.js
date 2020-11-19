import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotLoggedIn extends Component {
	render () {
		//make navbar here
		return (
			<div className='NotLoggedIn center'>
				<p style={{ fontSize: '3em', fontWeight: '500', paddingTop: '5%' }}>
					NOT LOGGED IN! <br /> Cannot Access This Feature!
				</p>
				<Link to='/'>
					<a className='btn btn-large btn-waves black' style={{ borderRadius: '5px', fontSize: '1.1em' }}>
						<b>Login</b>
					</a>
				</Link>
			</div>
		);
	}
}

export default NotLoggedIn;
