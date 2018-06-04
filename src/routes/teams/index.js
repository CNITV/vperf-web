import { h, Component } from 'preact';
//import style from './style';
import { Header, Segment, Container, Icon, Divider } from 'semantic-ui-react';
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
		setInterval(() => this.update(), 1000);
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
						<div style={{float: 'right', padding: '0.25em'}}><Icon onClick={this.goFull} link name='expand' /></div>
						<Header as='h1' floated='left'>Echipe</Header>
						<Divider section clearing />
						<Scoreboard board={this.state.status.teams} />
					
					</Segment>
				</div>
			</Fullscreen>
		);
	}
}
