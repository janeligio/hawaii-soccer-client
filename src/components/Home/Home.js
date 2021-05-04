import Game, { GAMES_DATA } from '../../components/Game/Game';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
    return (
    <>
    <header>
        <div className="header content">
            <h1 className="header title">Hawaii Soccer Five a Side</h1>
            <div className="header actions">
                <Link className="header link" to="/create"> 
                    Organize a game
                </Link>
                <a className="header link" href="#find">Find a game!</a>
            </div>
        </div>
    </header>

    <div className="find-game" id="find">
        <h1>Soccer games goin' on:</h1>
        <div className="game-container">
            {GAMES_DATA.map(game => {
                return (<Game
                    dateCreated={game.dateCreated}
                    name={game.name}
                    venue={game.venue}
                    startTime={game.startTime}
                    endTime={game.endTime}
                    date={game.date}
                    playerCount={game.playerCount}
                    notes={game.notes}
                />);
            })}
        </div>
    </div>
    </>);
}