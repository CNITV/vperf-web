import { h, Component } from 'preact';
//import style from './style';
import { Button, Segment, Container } from 'semantic-ui-react';
import { API_URL } from '../../config.js';
import Scoreboard from '../../components/scoreboard'

export default class Teams extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: {
				teams: []
			}
		};
	}

	update() {
		fetch(API_URL + '/status')
			.then(resp => resp.json())
			.then(status => this.setState({status}))
			.catch(error => console.error(error));
	}

	componentDidMount() {
		this.update();
	}

	componentDidUpdate() {
		console.log(this.state.status.teams);
	}

	render() {
		return (
			<Segment raised padded>
				<h1>Echipe</h1>
				<Scoreboard board={this.state.status.teams} />
			</Segment>
		);
	}
}