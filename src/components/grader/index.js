import { h, Component } from 'preact';
import { Button, Segment, Header, Label, Table, Input, Icon, Grid } from 'semantic-ui-react';
import Fuse from 'fuse.js';

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
	}

	handleChange = (e, {value}) => this.setState({query: value});

	render() {
		const fuse = new Fuse(this.props.status.teams, this.options);
		const result = fuse.search(this.state.query);
		return (
			<Segment.Group raised>
				<Segment padded>
					<Grid relaxed stackable columns='equal'>
						<Grid.Column width={3}>
							<Header as='h2'>Echipe</Header>
						</Grid.Column>
						<Grid.Column>
							<Input transparent fluid icon='search' placeholder='Search...' onChange={this.handleChange} />
						</Grid.Column>
					</Grid>
				</Segment>
				<Segment>
					<div style={{maxHeight: '24em', overflowY: 'scroll'}}>
						<Table basic='very' selectable>
							<Table.Body>
								{(result.length ? result : this.props.status.teams).map(e => <GraderItem element={e} />)}
							</Table.Body>
						</Table>
					</div>
				</Segment>
			</Segment.Group>
		)
	}
}

const GraderItem = props => (
	<Table.Row>
		<Table.Cell textAlign='left'><strong>{props.element.name}</strong></Table.Cell>
		<Table.Cell collapsing><strong>{props.element.score}</strong></Table.Cell>
		<Table.Cell collapsing><Icon circular name='plus' /></Table.Cell>
		<Table.Cell collapsing><Icon circular name='minus' /></Table.Cell>
		<Table.Cell collapsing><Icon circular name='dont' /></Table.Cell>
	</Table.Row>
);