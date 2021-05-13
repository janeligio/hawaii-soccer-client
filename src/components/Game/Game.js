import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { FaAngleRight, FaAngleDown, FaCheckCircle } from "react-icons/fa";
import './Game.css';

export default function Game(props) {
    const { id, name, venueId, startTime, endTime, date, playerCount, notes } = props;

    const [ venue, setVenue ] = useState({name: "Unknown Venue"});
    const [ showForm, setShowForm ] = useState(false);
    const [ showContent, setShowContent ] = useState(false);
    const [ responseMessage, setResponseMesssage ] = useState('');
    const [ showReponse, setShowReponse ] = useState(false);

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
            setShowReponse(true);
            if(showForm) {
                setShowForm(false);
            }
        }).catch(err => {
            console.error(err);
        })
    }

    return (
    <div className="game">
        <div onClick={() => setShowContent(!showContent)} className="game-header">
            <div className="fa-angle-right">
                { !showContent && <FaAngleRight size="2em" className="fa-angle"/> }
                { showContent && <FaAngleDown size="2em" className="fa-angle"/> }
            </div>
            <div>
                <h3 className="game-venue-name"><strong>@</strong>{venue.name}</h3>
                <p className="game-date"><small>{moment(date).format("dddd, MMM D")} from {startTime} {endTime && `to ${endTime}`}</small></p>
            </div>
                <p className="game-playercount">{playerCount} people going</p>                    
        </div>
        {   showContent && 
                <div className="game-content">
                    <h3 className="game-organizer">Organizer: {name}</h3>

                    <h5 className="game-notes-title">From {name}: </h5>
                    <p className="game-notes">
                        "{notes}"
                    </p>

                    <p className="venue-address-title">Venue Address</p>
                    
                    <div className="game-address-container">
                        <p className="game-address">{venue.address}</p>
                        <button className="copy-address">Copy</button>
                    </div>

                    <div className="game-actions">
                        {!showForm && <button className="game-actions-join" onClick={() => setShowForm(!showForm)}>Join</button>}
                    </div>
                    {showForm && 
                        <JoinGame joinGame={joinGame} gameId={id} closeForm={() => setShowForm(false)} />}
                    { showReponse &&
                    <div onClick={() => setShowReponse(false)} className="game-response-container">
                        <div className="game-response-check">
                            <FaCheckCircle size="1.5em" color="white" />
                        </div>
                        <p className="game-response-message" style={{color: 'var(--light)'}}>
                            {responseMessage} 
                        </p>
                    </div>}
                </div>
        }
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
                <div className="join-game-section">
                    <label >Name
                        <input className="join-game-input" type="text" required value={name} placeholder="Sergio"
                            onChange={(e) => setName(e.target.value)}/>
                    </label>
                </div>
                <div className="join-game-section">
                    <label >Email
                        <input className="join-game-input" type="email" required value={email} placeholder="johndoe@gmail.com"
                            onChange={(e) => setEmail(e.target.value)}/>
                    </label>
                </div>
                <div className="join-game-section">
                    <label>No. Players {` `} <br/>
                        <select className="join-game-players" value={playerCount} onChange={e => setPlayerCount(e.target.value)}>
                            {playersSelectOptions.map(opt => {
                                return <option key={Math.random()} value={opt}>{opt} {opt===1 && ' (only you)'}</option>;
                            })}
                        </select>
                    </label>
                </div>

                <div className="join-game-form-submit-container">
                    <input className="join-game-form-submit" type="submit" value="Join" />
                    <button onClick={closeForm} className="join-game-form-cancel">Cancel</button>
                </div>
            </form>
        </div>
    );
}