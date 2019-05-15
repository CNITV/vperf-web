import { h, Component } from 'preact';
//import style from './style';
import { Header, Segment, Container, Icon, Divider, Grid, Table, Label } from 'semantic-ui-react';
import Fullscreen from 'react-full-screen';

export default class Details extends Component {
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

	sortHandler = (a, b) => {
	if (a == b) return b.special_score - a.special_score;
	return b.score - a.score;
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
					<Segment raised padded loading={this.props.status.teams.length == 0}>
						<Grid columns={3}>
							<Grid.Column vertical><Header as='h1'>Detalii</Header></Grid.Column>
							<Grid.Column basic textAlign='center'><Header as='h1' color={this.props.status.running ? 'green' : 'red'}>{this.timeHandler(this.props.status.time || 0)}</Header></Grid.Column>
							<Grid.Column basic textAlign='right'><img class="logo" src="/assets/logo.png" /><Icon onClick={this.goFull} link name='expand' /></Grid.Column>
						</Grid>
						<Divider />
						<DetailsTable board={this.props.status.teams}/>
					</Segment>
				</div>
			</Fullscreen>
		);
	}
}

const DetailsTable = props => (
	<Table compact='very' basic='very' striped unstackable>
		<Table.Body>{props.board.map(e => <DetailsItem element={e} board={props.board} />)}</Table.Body>
	</Table>
);

const DetailsItem = props => (
	<Table.Row>
		<Table.Cell textAlign='right'><strong>{props.element.name ? props.element.name : "Problema " + (props.element.id + 1)}</strong></Table.Cell>
		{props.element.trials.map((e, i) => <Table.Cell collapsing><Label size='tiny' circular={i == props.element.special ? false : true} color={e.passed ? 'green' : 'red'}>{e.no}</Label></Table.Cell>)}
		<Table.Cell collapsing><strong>{props.element.score}</strong></Table.Cell>
	</Table.Row>
);
