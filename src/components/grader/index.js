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
            results: [],
            modalOpen: false,
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
                                {(result.length ? result : this.props.status.teams).map(e => <GraderItem headers={this.props.headers} element={e} problems={this.props.status.problems} />)}
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

class GraderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openAdd: false,
            openFine: false,
            openSpecial: false,
        }
        this.onOpen = this.onOpen.bind(this);
        this.onClose = this.onClose.bind(this);
        this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
        this.handleSubmitFine = this.handleSubmitFine.bind(this);
        this.handleSubmitSpecial = this.handleSubmitSpecial.bind(this);
        this.useResp = this.useResp.bind(this);
    }

    useResp(resp) {
        console.log(resp);
        if (!resp.ok) {
            alert('Eroare, verifica server.');
        } else {
            alert('Success');
        }
        this.onClose();
    }

    handleSubmitAdd(e) {
        fetch(API_URL + '/admin/team/' + e.target.elements.addId.value + '/submit/' + (e.target.elements.addProblem.value - 1), {
            method: 'POST',
            body: e.target.elements.addResult.value,
            headers: this.props.headers
        }).then(resp => this.useResp(resp));
    }

    handleSubmitFine(e) {
        fetch(API_URL + '/admin/team/' + e.target.elements.fineId.value + '/fine', {
            method: 'POST',
            body: e.target.elements.fineAmount.value,
            headers: this.props.headers
        }).then(resp => this.useResp(resp));
    }

    handleSubmitSpecial(e) {
        fetch(API_URL + '/admin/team/' + e.target.elements.specialId.value + '/special', {
            method: 'PUT',
            body: (e.target.elements.specialProblem.value - 1),
            headers: this.props.headers
        }).then(resp => this.useResp(resp));
    }

    onOpen(x) {
        switch (x) {
            case 'add': this.setState({openAdd: true}); break;
            case 'fine': this.setState({openFine: true}); break;
            case 'special': this.setState({openSpecial: true}); break;
        }
    }

    onClose() {
        this.setState({openAdd: false, openFine: false, openSpecial: false});
    }

    render() {
        return <Table.Row>
            <Table.Cell textAlign='left'><strong>{this.props.element.name}</strong></Table.Cell>
            <Table.Cell collapsing><strong>{this.props.element.score}</strong></Table.Cell>
            <Table.Cell collapsing>
                <Modal open={this.state.openAdd} trigger={<Icon onClick={() => this.onOpen('add')} circular name='plus' />} onClose={this.onClose} closeIcon style={inlineStyle.modal}>
                    <Modal.Header>Adauga rezolvare pentru {this.props.element.name}</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleSubmitAdd}>
                            <Form.Input type='hidden' name='addId' value={this.props.element.id} />
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
                <Modal open={this.state.openFine} trigger={<Icon onClick={() => this.onOpen('fine')} circular name='minus' />} onClose={this.onClose} closeIcon style={inlineStyle.modal}>
                    <Modal.Header>Penalizeaza echipa {this.props.element.name}</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleSubmitFine}>
                            <Form.Input type='hidden' name='fineId' value={this.props.element.id} />
                            <Form.Group widths='equal'>
                                <Form.Input fluid name='fineAmount' label='Penalizare' placeholder='Penalizare' />
                            </Form.Group>
                            <Form.Button>Trimite</Form.Button>
                        </Form>
                    </Modal.Content>
                </Modal>
            </Table.Cell>
            <Table.Cell collapsing>
            <Modal open={this.state.openSpecial} onClose={this.onClose} trigger={<Icon onClick={() => this.onOpen('special')} circular name='star' />} closeIcon style={inlineStyle.modal}>
                <Modal.Header>Seteaza problema speciala pentru {this.props.element.name}</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSubmitSpecial}>
                        <Form.Input type='hidden' name='specialId' value={this.props.element.id} />
                        <Form.Group widths='equal'>
                            <Form.Input fluid name='specialProblem' label='Nr. problemei' placeholder='Nr. problemei' />
                        </Form.Group>
                        <Form.Button>Trimite</Form.Button>
                    </Form>
                </Modal.Content>
            </Modal>
            </Table.Cell>
        </Table.Row>;
    }
}