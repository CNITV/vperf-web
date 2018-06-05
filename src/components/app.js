import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Home from '../routes/home';
import Teams from '../routes/teams';
import Admin from '../routes/admin';
import Problems from '../routes/problems';
import Details from '../routes/details';
import { Container } from 'semantic-ui-react';

import { API_URL } from '../config.js';
// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			status: {
				teams: [],
				problems: []
			}
		};
	}
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	update() {
		fetch(API_URL + '/status')
			.then(resp => resp.json())
			.then(status => this.setState({status}))
			.catch(error => console.error(error));
	}

	componentDidMount() {
		setInterval(() => this.update(), 1000);
	}

	render() {
		return (
			<div id="app">
				<Header />
				<Container>
					<Router onChange={this.handleRoute}>
						<Home path="/" status={this.state.status} />
						<Teams path="/teams" status={this.state.status} />
						<Admin path="/admin" status={this.state.status} />
						<Problems path="/problems" status={this.state.status} />
						<Details path="/details" status={this.state.status} />
					</Router>
				</Container>
			</div>
		);
	}
}
