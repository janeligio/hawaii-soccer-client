import { NavLink } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import './Header.css';

export default function Header() {
    return (
        <header className="app-header">
            <ul className="app-ul">
                <li className="app-li">
                    <NavLink
                        className="app-link"
                        exact
                        activeClassName="active-link"
                        to="/"
                    >
                        <AiFillHome className="header-home" />
                    </NavLink>
                </li>
                <li className="app-li">
                    <NavLink
                        className="app-link"
                        activeClassName="active-link"
                        to="/find"
                    >
                        Find a Game
                    </NavLink>
                </li>
                <li className="app-li">
                    <NavLink
                        className="app-link"
                        activeClassName="active-link"
                        to="/create"
                    >
                        Organize a Game
                    </NavLink>
                </li>
            </ul>
        </header>
    );
}
