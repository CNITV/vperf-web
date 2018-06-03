import { h, Component } from 'preact';
//import style from './style';
import { Button, Segment, Container } from 'semantic-ui-react';
import { API_URL } from '../../config.js';
import Scoreboard from '../../components/scoreboard';
import Fullscreen from 'react-full-screen';

export default class Teams extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: {
				teams: []
			},
			fullscreen: false
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

	goFull = () => {
		this.setState({fullscreen: !this.state.fullscreen});
	}

	render() {
		return (
			<Fullscreen
				enabled={this.state.fullscreen}
				onChange={f => this.setState({fullscreen: f})}
			>
				<div class='another-container'>
					<Segment raised padded>
						<button onClick={this.goFull}>
							Go Fullscreen
						</button>
						<h1>Echipe</h1>
						<Scoreboard board={this.state.status.teams} />
					
					</Segment>
				</div>
			</Fullscreen>
		);
	}
}
