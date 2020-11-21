import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase/firebase-init';
import History from './History'
import '../firebase/firebase-intercations';
import ReactDOM from 'react-dom';
import database from '../datastore';
import { loginWithGooglePopup } from '../firebase/firebase-intercations';
import dell from "../imgs/dell.jpg";

class LoginPage extends Component {
	state = {
		username: ''
	};
	loginUser = async () => {
		await loginWithGooglePopup();
		this.setState({
			username: firebase.auth().currentUser.displayName
		});
		database.loggedIn = true;
	};
	logoutUser = async () => {
		firebase.auth().signOut();
		this.setState({
			username: ''
		});
		database.loggedIn = false;
	};
	componentDidMount () {
		firebase.auth().onAuthStateChanged((user) =>{
			if (user) {
				this.setState({
					username: user.displayName
				})
			} else {
				this.setState({
					username: ''
				})
			}
		  });
	}
	render () {
		return this.state.username !== '' ? (
			<div className='container' style={{ marginTop: '5%' }}>
				<div class='card hoverable z-depth-2' style={{ width: '60%', margin: '10% 20%', borderRadius: '8px' }}>
					<div className='center'>
						<img src={dell} style={{ width: '130px' , paddingTop:'20px'}} />
						<p style={{ fontSize: '1.4em', paddingBottom: '20px', fontWeight: '600' }}>
							Hello {this.state.username}! You are logged in!
						</p>
						<div
							className='card-action  indigo darken-4 center'
							style={{ borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}
						>
							<Link to='/view_templates' className='white-text '>
								<b>View all Templates</b>
							</Link>
							<Link onClick={this.logoutUser} className='white-text '>
								<b>Logout</b>
							</Link>
						</div>
					</div>
				</div>
				<History/>
			</div>
		) : (
			<div className='container' style={{ marginTop: '5%' }}>
				<div class='card hoverable z-depth-2' style={{ width: '60%', margin: '10% 20%', borderRadius: '8px' }}>
					<div className='center'>
						<img src={dell} style={{ width: '130px' ,paddingTop:'20px' }} />
						<p style={{ fontSize: '1.4em', padding: '20px', fontWeight: '600' }}>
							Welcome! Please Login to use the app!
						</p>

						<Link onClick={this.loginUser} className='white-text'>
							<div
								className='card-action center indigo darken-4'
								style={{ borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}
							>
								<b>Click Here To Login</b>
							</div>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default LoginPage;
