import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const Header = () => (
	<header class={style.header}>
		<h1>Performante Vianiste</h1>
		<nav>
			<Link activeClassName={style.active} href="/">Acasa</Link>
			<Link activeClassName={style.active} href="/teams">Echipe</Link>
			<Link activeClassName={style.active} href="/problems">Probleme</Link>
			<Link activeClassName={style.active} href="/details">Detalii</Link>
			<Link activeClassName={style.active} href="/admin">Admin</Link>
		</nav>
	</header>
);

export default Header;
