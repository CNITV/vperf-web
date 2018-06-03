import { h } from 'preact';
import style from './style';
import { Progress, Table } from 'semantic-ui-react'

const Scoreboard = props => (
	<Table compact='very' basic='very'><Table.Body>{props.board.map(e => <ScoreboardItem element={e} total={Math.max.apply(Math, props.board.map(e => e.score))} />)}</Table.Body></Table>
);

const ScoreboardItem = props => (
	<Table.Row>
		<Table.Cell collapsing textAlign='right'><strong>{props.element.name}</strong></Table.Cell>
		<Table.Cell><Progress autoSuccess value={props.element.score} total={props.total} size='small' className={style.sb} /></Table.Cell>
		<Table.Cell collapsing><strong>{props.element.score}</strong></Table.Cell>
	</Table.Row>
);

export default Scoreboard;