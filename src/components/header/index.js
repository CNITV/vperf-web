import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const Header = () => (
	<header class={style.header}>
		<h1>Performante Vianiste</h1>
		<nav>
			<Link activeClassName={style.active} href="/">Acasa</Link>
			<Link activeClassName={style.active} href="/profile">Echipe</Link>
			<Link activeClassName={style.active} href="/profile/john">Probleme</Link>
			<Link activeClassName={style.active} href="/profile/john">Detalii</Link>
		</nav>
	</header>
);

export default Header;
