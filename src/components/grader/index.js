import { h, Component } from 'preact';
import { Button, Segment, Header, Label, Table, Input, Icon, Grid, Modal, Form } from 'semantic-ui-react';
import Fuse from 'fuse.js';
import { API_URL } from '../../config.js';

const inlineStyle = {
	modal: {
		marginTop: '0px !important',
		marginLeft: 'auto',
		marginRight: 'auto'
	}
};

export default class Grader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: "",
			results: []
		}
		this.options = {
			shouldSort: true,
			threshold: 0.6,
			location: 0,
			distance: 100,
			maxPatternLength: 32,
			minMatchCharLength: 0,
			keys: [
				"name"
			]
		};
		this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
		this.handleSubmitFine = this.handleSubmitFine.bind(this);
		this.handleSubmitSpecial = this.handleSubmitSpecial.bind(this);
	}

	handleChange = (e, {value}) => this.setState({query: value});

	handleSubmitAdd(e) {
		fetch(API_URL + '/admin/team/' + e.target.elements.addId.value + '/submit/' + (e.target.elements.addProblem.value - 1), {
			method: 'POST',
			body: e.target.elements.addResult.value,
			headers: this.props.headers
		}).then(resp => console.log(resp));
	}

	handleSubmitFine(e) {
		fetch(API_URL + '/admin/team/' + e.target.elements.fineId.value + '/fine', {
			method: 'POST',
			body: e.target.elements.fineAmount.value,
			headers: this.props.headers
		}).then(resp => console.log(resp));
	}

	handleSubmitSpecial(e) {
		console.log(e.target.elements.specialProblem.value - 1);
		fetch(API_URL + '/admin/team/' + e.target.elements.specialId.value + '/special', {
			method: 'PUT',
			body: (e.target.elements.specialProblem.value - 1),
			headers: this.props.headers
		}).then(resp => console.log(resp));
	}

	render() {
		const fuse = new Fuse(this.props.status.teams, this.options);
		const result = fuse.search(this.state.query);
		return (
			<Segment.Group raised>
				<Segment padded>
					<Grid relaxed stackable columns='equal'>
						<Grid.Column width={2}>
							<Header as='h2'>Echipe</Header>
						</Grid.Column>
						<Grid.Column>
							<Input size='large' transparent fluid icon='search' placeholder='Search...' onChange={this.handleChange} />
						</Grid.Column>
					</Grid>
				</Segment>
				<Segment>
					<div style={{maxHeight: '24em', overflowY: 'scroll'}}>
						<Table basic='very' selectable>
							<Table.Body>
								{(result.length ? result : this.props.status.teams).map(e => <GraderItem element={e} problems={this.props.status.problems} handlers={{handleSubmitAdd: this.handleSubmitAdd, handleSubmitFine: this.handleSubmitFine, handleSubmitSpecial: this.handleSubmitSpecial}} />)}
							</Table.Body>
						</Table>
					</div>
				</Segment>
			</Segment.Group>
		)
	}
}

let handlers = {
	addProblem: "",
	addResult: ""
}

const GraderItem = props => (
	<Table.Row>
		<Table.Cell textAlign='left'><strong>{props.element.name}</strong></Table.Cell>
		<Table.Cell collapsing><strong>{props.element.score}</strong></Table.Cell>
		<Table.Cell collapsing>
			<Modal trigger={<Icon circular name='plus' />} closeIcon style={inlineStyle.modal}>
				<Modal.Header>Adauga rezolvare pentru {props.element.name}</Modal.Header>
				<Modal.Content>
					<Form onSubmit={props.handlers.handleSubmitAdd}>
						<Form.Input type='hidden' name='addId' value={props.element.id} />
						<Form.Group widths='equal'>
							<Form.Input fluid name='addProblem' label='Nr. problemei' placeholder='Nr. problemei' />
							<Form.Input fluid name='addResult' label='Rezolvare' placeholder='Rezolvare' />
						</Form.Group>
						<Form.Button>Trimite</Form.Button>
					</Form>
				</Modal.Content>
			</Modal>
		</Table.Cell>
		<Table.Cell collapsing>
			<Modal trigger={<Icon circular name='minus' />} closeIcon style={inlineStyle.modal}>
				<Modal.Header>Penalizeaza echipa {props.element.name}</Modal.Header>
				<Modal.Content>
					<Form onSubmit={props.handlers.handleSubmitFine}>
						<Form.Input type='hidden' name='fineId' value={props.element.id} />
						<Form.Group widths='equal'>
							<Form.Input fluid name='fineAmount' label='Penalizare' placeholder='Penalizare' />
						</Form.Group>
						<Form.Button>Trimite</Form.Button>
					</Form>
				</Modal.Content>
			</Modal>
		</Table.Cell>
		<Table.Cell collapsing>
		<Modal trigger={<Icon circular name='star' />} closeIcon style={inlineStyle.modal}>
			<Modal.Header>Seteaza problema speciala pentru {props.element.name}</Modal.Header>
			<Modal.Content>
				<Form onSubmit={props.handlers.handleSubmitSpecial}>
					<Form.Input type='hidden' name='specialId' value={props.element.id} />
					<Form.Group widths='equal'>
						<Form.Input fluid name='specialProblem' label='Nr. problemei' placeholder='Nr. problemei' />
					</Form.Group>
					<Form.Button>Trimite</Form.Button>
				</Form>
			</Modal.Content>
		</Modal>
		</Table.Cell>
	</Table.Row>
);
