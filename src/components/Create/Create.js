import React, { useState, useEffect } from "react";
import moment from 'moment';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import DateTime from 'react-datetime';
import VenuePicker from '../VenuePicker/VenuePicker';
import TimePicker from "../Picker/TimePicker";
import "react-datetime/css/react-datetime.css";
import './Create.css';

export default function Create() {
    const history = useHistory();
    const NOTES_MAX_CHAR_COUNT = 150;
    const [ venues, setVenues ] = useState([]);

    const [ chars, setChars ] = useState(NOTES_MAX_CHAR_COUNT);


    // Form data
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ selectedVenue, setSelectedVenue ] = useState(null);
    const [ date, setDate ] = useState(moment());
    const [ startTime, setStartTime ] = useState(moment().set('hour', moment().get('hour') + 1).set('minutes', 0).format("h:mmA"));
    const [ endTime, setEndTime ] = useState(moment().set('hour', moment().get('hour') + 1).set('minutes', 0).add(60, 'minutes').format("h:mmA"));
    const [ players, setPlayers ] = useState(1);
    const [ notes, setNotes ] = useState('');

    useEffect(() => {
        async function fetchVenues() {
            const endpoint = process.env.REACT_APP_SERVER_API + '/venues';
            const response = await axios({ method: 'get', url: endpoint, headers: {'Access-Control-Allow-Origin': '*'} });
            setVenues(response.data);
            if(response.data.length > 0) {
                setSelectedVenue(response.data[0]);
            }
        }
        try {
            fetchVenues();
        } catch (err) {
            console.log(err);
        }
    }, []);

    function isValidDatetHandler(current) {
        const validRange = [ 
            moment().subtract(1, "day"),
            moment().add(28, "day"),
        ];
        return current.isAfter(validRange[0]) && current.isBefore(validRange[1]);
    }


    function handleDateChange(momentObj) {
        console.log(momentObj);
        setDate(momentObj);
    }

    let playersSelectOptions = [];
    for(let i = 1; i <= 30; i++) {
        playersSelectOptions.push(i);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log( moment(startTime, "h:mmA").format("h:mma"));
        const formattedStartTime = moment(startTime, "h:mmA").format("h:mma");
        const formattedEndTime = moment(endTime, "h:mmA").format("h:mma");
        const requestBody = {
            name, 
            email, 
            venue: selectedVenue._id, 
            date: date.format(), 
            startTime: formattedStartTime, 
            endTime: formattedEndTime, 
            playerCount: players, 
            notes
        }
        console.log(requestBody);
        axios({
            url: process.env.REACT_APP_SERVER_API + '/games/create',
            method: 'post',
            data: requestBody,
            headers: {'Access-Control-Allow-Origin': '*'}
        }).then(() => {
            // Redirect to home
            history.push("/");
        }).catch(err => {
            console.error(err);
        })
        console.log('submitted');
    }

    return (
        <div className="create">
            <h1 className="create-header">Organize a Game</h1>
            <div className="divider-container">
                <div className="divider"/>
            </div>
            <main className="create-content">
                <p>Welcome</p>
                <form className="create-form" onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>
                            <br/>
                        <input required placeholder="Kamaka" type="text" value={name} onChange={e => setName(e.target.value)}/>
                    </div>
                    <div>
                        <label>Email</label>
                            <br/>
                        <input required placeholder="johndoe@gmail.com" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label>Venue</label>
                            <br/>
                        <input type="text" value={!!selectedVenue && selectedVenue.name} readOnly/>
                    </div>
                    <div>
                        {/* <SelectedVenue venue={selectedVenue}/> */}
                        <VenuePicker venues={venues} selectedVenue={selectedVenue} setSelectedVenue={setSelectedVenue}/>

                    </div>
                    <div>
                        <p>Scheduled Date: {moment(date).format("dddd, MMM D YYYY")}</p>
                        <label>Date</label>
                            <br/>
                        <DateTime 
                            timeFormat={false} 
                            value={moment(date).format("dddd, MMM D YYYY")}
                            input={true} 
                            isValidDate={isValidDatetHandler}
                            onChange={handleDateChange}
                            closeOnSelect={true}/>
                        
                    </div>
                    <div className="form-time">
                        <TimePicker
                            venue={selectedVenue}
                            setStartTime={setStartTime}
                            setEndTime={setEndTime}/>
                    </div>
                    <div>
                        <label>Number of Players</label>
                            <br/>
                        <select value={players} onChange={e => setPlayers(e.target.value)}>
                            {playersSelectOptions.map(opt => {
                                return <option key={Math.random()} value={opt}>{opt}</option>;
                            })}
                        </select>
                    </div>
                    <div>
                        <label>Notes</label>
                        <br/>
                        <textarea placeholder="Looking for 4 more. We have extra water." value={notes}
                            // onKeyDown={(e) => {
                            //     if(e.key === "Backspace" || e.keyCode === 8) {
                            //         console.log("Backspace");
                            //         console.log(e.target.value);
                            //         setNotes(e.target.value);
                            //         setChars(chars + e.target.value.length);
                            //     }
                            // }}
                            onChange={(e) => {
                                e.preventDefault();
                                const notesValue = e.target.value;
                                if(chars === 0 && (e.key === "Backspace" || e.keyCode === 8)) {
                                    const subset = e.target.value.slice(0, NOTES_MAX_CHAR_COUNT);
                                    setNotes(subset);
                                    setChars(0);
                                } else if(NOTES_MAX_CHAR_COUNT >= notesValue.length) {
                                    setChars(NOTES_MAX_CHAR_COUNT - notesValue.length);
                                    setNotes(notesValue);
                                }
                            }}/>
                        <p className="chars-remaining"><small>Characters remaining: {chars}</small></p>
                    </div>

                    <div className="create-button">
                        <input type="submit" value="Create" />
                    </div>
                </form>
                
            </main>
        </div>
    );
}