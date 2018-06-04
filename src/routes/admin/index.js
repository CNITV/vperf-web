import { h, Component } from 'preact';
//import style from './style';
import { Button, Segment, Container, Header, Label, Divider, List, Form } from 'semantic-ui-react';
import { API_URL } from '../../config.js';

export default class Admin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			password: ""
		};
	}

	componentWillMount() {
		this.setState({password: sessionStorage.getItem('password')});
	}

	handleSubmit() {
		console.log('a');
	}

	handleStart() {}

	handleStop() {}

	render() {
		if (this.state.password) {
			return (
				<div>

					<Segment.Group raised compact>
						<Segment padded>
							<Header as='h2'>Status concurs <StatusLabel status={this.props.status}/></Header>
						</Segment>
						<Segment padded>
							<List>
								<List.Item><strong>Timp total: </strong>{this.props.status.total_time || 0} minute</List.Item>
								<List.Item><strong>Echipe inscrise: </strong>{this.props.status.teams.length}</List.Item>
								<List.Item><strong>Numar probleme: </strong>{this.props.status.problems.length}</List.Item>
							</List>
						</Segment>
						<Segment padded>
							{
								this.props.status.running
								? <Button negative content='Opreste' icon='stop' labelPosition='left' />
								: <Button positive content='Porneste' icon='play' labelPosition='left' />
							}
						</Segment>
					</Segment.Group>
				</div>
			);
		} else {
			return (
				<div style={{textAlign: 'center'}}>
					<Segment.Group raised compact>
						<Segment padded>
							<Header as='h2'>Autentificare</Header>
						</Segment>
						<Segment padded>
							<Form onSubmit={this.handleSubmit}>
								<Form.Group fluid>
									<Form.Input placeholder='Parola' name='password' />
									<Form.Button positive content='Trimite' />
								</Form.Group>
							</Form>
						</Segment>
					</Segment.Group>
				</div>
			)
		}
	}
}

function StatusLabel(props) {
	const color = (props.status.running ? 'green' : 'red');
	const text = (props.status.running ? 'Pornit' : 'Oprit');
	return <Label color={color} basic>{text}</Label>;
}