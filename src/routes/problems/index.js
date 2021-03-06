import { h, Component } from 'preact';
//import style from './style';
import { Header, Segment, Container, Icon, Divider, Grid } from 'semantic-ui-react';
import Scoreboard from '../../components/scoreboard';
import Fullscreen from 'react-full-screen';

export default class Problems extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fullscreen: false
		}
	}

	componentDidUpdate() {
		//console.log(this.props.status.teams);
	}

	goFull = () => {
		this.setState({fullscreen: !this.props.fullscreen});
	}

	timeHandler(s) {
		const hours = ("00" + Math.floor(s / 3600)).slice(-2);
		const minutes = ("00" + Math.floor((s % 3600) / 60)).slice(-2);
		const seconds = ("00" + (s % 3600) % 60).slice(-2);
		return hours + ":" + minutes + ":" + seconds;
	}

	render() {
		return (
			<Fullscreen
				enabled={this.state.fullscreen}
				onChange={f => this.setState({fullscreen: f})}
			>
				<div class='another-container'>
					<Segment raised padded loading={this.props.status.problems.length == 0}>
						<Grid columns={3}>
							<Grid.Column vertical><Header as='h1'>Probleme</Header></Grid.Column>
							<Grid.Column basic textAlign='center'><Header as='h1' color={this.props.status.running ? 'green' : 'red'}>{this.timeHandler(this.props.status.time || 0)}</Header></Grid.Column>
							<Grid.Column basic textAlign='right'><img class="logo" src="/assets/logo.png" /><Icon onClick={this.goFull} link name='expand' /></Grid.Column>
						</Grid>
						<Divider />
						<Scoreboard board={this.props.status.problems} />
					</Segment>
				</div>
			</Fullscreen>
		);
	}
}
