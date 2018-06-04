import { h, Component } from 'preact';
//import style from './style';
import { Button, Segment, Container, Header, Label, Divider, List, Form, Message } from 'semantic-ui-react';
import { API_URL } from '../../config.js';

export default class Admin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			password: "",
			authenticated: false,
			error: null
		};
		this.headers = new Headers();
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		this.setState({password: sessionStorage.getItem('password')});
	}

	handleChange = (e, { name, value }) => this.setState({ [name]: value });

	handleSubmit() {
		console.log(this.state.password);
		this.headers.set('Authorization', 'Basic ' + btoa("admin:" + this.state.password));
		fetch(API_URL + '/admin/ok', { headers: this.headers })
			.then(resp => {
				if (resp.status == 200) {
					sessionStorage.setItem('password', this.state.password);
					this.setState({authenticated: true, error: null});
				} else if (resp.status == 401) {
					console.error("Invalid password!");
					this.setState({error: "Parola invalida"});
				}
			});
	}

	handleStart = () => {
		fetch(API_URL + '/admin/start', {
			method: 'POST',
			headers: this.headers
		});
	}

	handleStop = () => {
		fetch(API_URL + '/admin/stop', {
			method: 'POST',
			headers: this.headers
		});
	}

	render() {
		if (this.state.authenticated) {
			return (
				<div>
					<Segment.Group raised>
						<Segment padded>
							<Header as='h2'>Status concurs <StatusLabel status={this.props.status}/></Header>
						</Segment>
						<Segment padded>
							<List>
								<List.Item><strong>Timp total: </strong>{this.props.status.total_time || 0} secunde</List.Item>
								<List.Item><strong>Echipe inscrise: </strong>{this.props.status.teams.length}</List.Item>
								<List.Item><strong>Numar probleme: </strong>{this.props.status.problems.length}</List.Item>
							</List>
						</Segment>
						<Segment padded>
							{
								this.props.status.running
								? <Button negative content='Opreste' icon='stop' labelPosition='left' onClick={this.handleStop} />
								: <Button positive content='Porneste' icon='play' labelPosition='left' onClick={this.handleStart} />
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
							{this.state.error ? <Message error header={this.state.error} /> : {}}
							<Form onSubmit={this.handleSubmit}>
								<Form.Group fluid>
									<Form.Input type='password' placeholder='Parola' value={this.state.password} onChange={this.handleChange} name='password' />
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
