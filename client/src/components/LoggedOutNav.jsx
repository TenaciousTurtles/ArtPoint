import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router-dom';
// import { Grid, Icon, Header, Input, Menu, Segment } from 'semantic-ui-react';

class LoggedOutNav extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div>
			  <input type="text" placeholder="search" />
			  {'  '}
			  <Link to="/">Home</Link>
			  {'  '}
			  <Link to="/auctions">Auctions</Link>
			  {'  '}
			  <Link to="/artists">Artists</Link>
			  {'  '}
			  <Link to="/events">Events</Link>
			  {'  '}
			  <Link to="/contact">Contact us</Link>
			  {'  '}
			  <Link to="/login">Log In</Link>
			  {'  '}
			  <Link to="/signup">Sign Up</Link>
			</div>

			);
	}
}

export default LoggedOutNav;