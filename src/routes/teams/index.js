import { h, Component } from 'preact';
//import style from './style';
import { Header, Segment, Container, Icon, Divider } from 'semantic-ui-react';
import Scoreboard from '../../components/scoreboard';
import Fullscreen from 'react-full-screen';

export default class Teams extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fullscreen: false
		}
	}

	componentDidUpdate() {
		console.log(this.props.status.teams);
	}

	goFull = () => {
		this.setState({fullscreen: !this.props.fullscreen});
	}

	render() {
		return (
			<Fullscreen
				enabled={this.state.fullscreen}
				onChange={f => this.setState({fullscreen: f})}
			>
				<div class='another-container'>
					<Segment raised padded loading={this.props.status.teams.length == 0}>
						<div style={{float: 'right', padding: '0.25em'}}><Icon onClick={this.goFull} link name='expand' /></div>
						<Header as='h1' floated='left'>Echipe</Header>
						<Divider section clearing />
						<Scoreboard board={this.props.status.teams} />
					</Segment>
				</div>
			</Fullscreen>
		);
	}
}
