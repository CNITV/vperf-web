import { h, Component } from 'preact';
//import style from './style';
import { Button, Segment, Container, Header, Label, Divider } from 'semantic-ui-react';
import { API_URL } from '../../config.js';

export default class Admin extends Component {
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

	render() {
		return (
			<div>
				<Segment raised padded>
					<Header as='h2' floated='left'>Stare concurs</Header>
					<div style={{float: 'right'}}><Label color='green' basic>Pornit</Label></div>
					<Divider section clearing />
					<Button basic color='orange' content='Pauzeaza' icon='pause' labelPosition='left' />
					<Button negative content='Opreste' icon='stop' labelPosition='left' />
				</Segment>
			</div>
		);
	}
}
