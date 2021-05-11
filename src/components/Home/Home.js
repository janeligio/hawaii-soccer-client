import { useState, useEffect } from 'react';
import axios from "axios";
import Game from '../../components/Game/Game';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
    const [ games, setGames ] = useState([]);

    useEffect(() => {
        const endpoint = process.env.REACT_APP_SERVER_API + '/games/';
        axios({
            method: 'get',
            url: endpoint,
            headers: {'Access-Control-Allow-Origin': '*'}
        }).then(res => {
            setGames(res.data);
        }).catch(err => {
            console.error(err);
        })
    }, []);

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
            {games.length > 0 && games.map(game => {
                console.log(game);
                return (<Game
                    key={game._id}
                    id={game._id}
                    dateCreated={game.dateCreated}
                    name={game.name}
                    venueId={game.venue}
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