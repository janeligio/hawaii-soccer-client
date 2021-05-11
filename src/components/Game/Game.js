import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import './Game.css';

export default function Game(props) {
    const { id, name, venueId, startTime, endTime, date, playerCount, notes } = props;

    const [ venue, setVenue ] = useState({name: "Unknown Venue"});
    const [ showForm, setShowForm ] = useState(false);
    const [ responseMessage, setResponseMesssage ] = useState('');

    useEffect(() => {
        const endpoint = process.env.REACT_APP_SERVER_API + '/venues/' + venueId;
        axios({
            method: 'get',
            url: endpoint,
            headers: {'Access-Control-Allow-Origin': '*'}
        }).then(response => {
            console.log(response.data);
            setVenue(response.data);
        }).catch(err => {
            console.log(err);
        })
    }, [venueId]);

    function joinGame(gameId, name, email, playerCount) {
        const endpoint = process.env.REACT_APP_SERVER_API + '/games/join?id=' + gameId;
        const requestBody = { name, email, playerCount};
        console.log(requestBody);
        axios({
            method: 'post',
            url: endpoint,
            data: requestBody,
            headers: {'Access-Control-Allow-Origin': '*'},
        }).then(response => {
            setResponseMesssage(response.data);
            if(showForm) {
                setShowForm(false);
            }
        }).catch(err => {
            console.error(err);
        })
    }

    return (
    <div className="game">
        <h4>{venue.name}</h4>
        <p>{venue.address}</p>
        <p>Hours: {venue.hours}</p>
        <p>Organizer: {name}</p>
        <p>
            <small>{moment(date).format("MMM D, YYYY")} {startTime} {endTime && `- ${endTime}`}</small>
            <br/>
            <span>Players: {playerCount}</span>
            <br/>
            Notes: {notes}
        </p>

        <div className="game-actions">
            { !showForm && <button onClick={() => setShowForm(!showForm)}>Join</button>}
            { showForm && <JoinGame joinGame={joinGame} gameId={id} closeForm={() => setShowForm(false)}/>}
        </div>

        <div>
            <p>
                {responseMessage}
            </p>
        </div>
    </div>);
}

function JoinGame(props) {
    const {gameId, joinGame, closeForm} = props;

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ playerCount, setPlayerCount ] = useState(1);

    let playersSelectOptions = [];
    for(let i = 1; i <= 30; i++) {
        playersSelectOptions.push(i);
    }

    function handleSubmit(event) {
        event.preventDefault();
        joinGame(gameId, name, email, playerCount);
    }
    return (
        <div className="join-game-form-container">
            <form className="join-game-form" onSubmit={handleSubmit}>
                <div>
                    <label className="join-game-section">Name
                        <input type="text" required value={name} placeholder="Sergio"
                            onChange={(e) => setName(e.target.value)}/>
                    </label>
                </div>
                <div>
                    <label className="join-game-section">Email
                        <input type="email" required value={email} placeholder="johndoe@gmail.com"
                            onChange={(e) => setEmail(e.target.value)}/>
                    </label>
                </div>
                <div>
                    <label className="join-game-section">No. Players {` `}
                        <select value={playerCount} onChange={e => setPlayerCount(e.target.value)}>
                            {playersSelectOptions.map(opt => {
                                return <option key={Math.random()} value={opt}>{opt}</option>;
                            })}
                        </select>
                    </label>
                </div>
                <div>
                    <input className="join-game-form-submit" type="submit" value="Create" />
                    <button onClick={closeForm} className="join-game-form-cancel">Cancel</button>
                </div>
            </form>
        </div>
    );
}