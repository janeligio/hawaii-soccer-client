import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {

    return (
    <>
    <header className="home">
        <div className="header content">
            <h1 className="header title">Hawaii Soccer Five-a-Side</h1>
            <div className="header actions">
                <Link className="header link" to="/create"> 
                    Organize a game
                </Link>
                <Link className="header link" to="/find">
                    Find a game!
                </Link>
            </div>
        </div>
    </header>
    </>);
}