import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import DateTime from 'react-datetime';
import Header from '../Header/Header';
import VenuePicker from '../VenuePicker/VenuePicker';
import TimePicker from '../Picker/TimePicker';
import 'react-datetime/css/react-datetime.css';
import './Create.css';

export default function Create() {
    const history = useHistory();
    const NOTES_MAX_CHAR_COUNT = 150;
    const [venues, setVenues] = useState([]);
    const [chars, setChars] = useState(NOTES_MAX_CHAR_COUNT);

    // Form data
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedVenue, setSelectedVenue] = useState(null);
    const [date, setDate] = useState(moment());
    const [startTime, setStartTime] = useState(
        moment()
            .set('hour', moment().get('hour') + 1)
            .set('minutes', 0)
            .format('h:mmA')
    );
    const [endTime, setEndTime] = useState(
        moment()
            .set('hour', moment().get('hour') + 1)
            .set('minutes', 0)
            .add(60, 'minutes')
            .format('h:mmA')
    );
    const [players, setPlayers] = useState(1);
    const [notes, setNotes] = useState('');

    useEffect(() => {
        async function fetchVenues() {
            const endpoint = process.env.REACT_APP_SERVER_API + '/venues';
            const response = await axios({
                method: 'get',
                url: endpoint,
                headers: { 'Access-Control-Allow-Origin': '*' },
            });
            setVenues(response.data);
            if (response.data.length > 0) {
                setSelectedVenue(response.data[0]);
            }
        }
        try {
            fetchVenues();
        } catch (err) {
            console.log(err);
        }
    }, []);

    function handleDateChange(momentObj) {
        setDate(momentObj);
    }

    let playersSelectOptions = generatedPlayerSelectOptions();

    const handleNotesInput = (e) => {
        e.preventDefault();
        const notesValue = e.target.value;
        if (chars === 0 && (e.key === 'Backspace' || e.keyCode === 8)) {
            const subset = e.target.value.slice(0, NOTES_MAX_CHAR_COUNT);
            setNotes(subset);
            setChars(0);
        } else if (NOTES_MAX_CHAR_COUNT >= notesValue.length) {
            setChars(NOTES_MAX_CHAR_COUNT - notesValue.length);
            setNotes(notesValue);
        }
    };

    function handleSubmit(event) {
        event.preventDefault();
        const formattedStartTime = moment(startTime, 'h:mmA').format('h:mma');
        const formattedEndTime = moment(endTime, 'h:mmA').format('h:mma');
        const requestBody = {
            name,
            email,
            venue: selectedVenue._id,
            date: date.format(),
            startTime: formattedStartTime,
            endTime: formattedEndTime,
            playerCount: players,
            notes,
        };
        axios({
            url: process.env.REACT_APP_SERVER_API + '/games/create',
            method: 'post',
            data: requestBody,
            headers: { 'Access-Control-Allow-Origin': '*' },
        })
            .then(() => {
                // Redirect to home
                history.push('/');
            })
            .catch((err) => {
                console.error(err);
            });
        console.log('submitted');
    }

    return (
        <>
            <Header />
            <div className="create">
                <h1 className="create-header">Organize a Game</h1>
                <div className="divider-container">
                    <div className="divider" />
                </div>
                <main className="create-content">
                    <form className="create-form" onSubmit={handleSubmit}>
                        <div className="form-section">
                            <label className="form-label">
                                Name
                                <input
                                    className="form-input"
                                    required
                                    placeholder="Kamaka"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="form-section">
                            <label>
                                Email
                                <input
                                    className="form-input"
                                    required
                                    placeholder="johndoe@gmail.com"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="form-section">
                            <label
                                onMouseEnter={(e) => e.preventDefault()}
                                onClick={(e) => e.preventDefault()}
                                className=""
                            >
                                Venue
                                <VenuePicker
                                    venues={venues}
                                    selectedVenue={selectedVenue}
                                    setSelectedVenue={setSelectedVenue}
                                />
                            </label>
                        </div>
                        <div className="form-section">
                            {/* <p>Scheduled Date: {moment(date).format("dddd, MMM D YYYY")}</p> */}
                            <label>
                                Date
                                <br />
                                <DateTime
                                    inputProps={{ className: 'form-input' }}
                                    timeFormat={false}
                                    value={date}
                                    input={true}
                                    isValidDate={isValidDatetHandler}
                                    onChange={handleDateChange}
                                    closeOnSelect={true}
                                />
                            </label>
                        </div>
                        <div className="form-section form-time">
                            <TimePicker
                                venue={selectedVenue}
                                setStartTime={setStartTime}
                                setEndTime={setEndTime}
                            />
                        </div>
                        <div className="form-section">
                            <label>
                                Number of Players
                                <select
                                    className="form-input"
                                    value={players}
                                    onChange={(e) => setPlayers(e.target.value)}
                                >
                                    {playersSelectOptions.map((opt) => {
                                        return (
                                            <option
                                                key={Math.random()}
                                                value={opt}
                                            >
                                                {opt}{' '}
                                                {opt === 1 && '(Only you)'}
                                            </option>
                                        );
                                    })}
                                </select>
                            </label>
                        </div>
                        <div className="form-section">
                            <label>
                                Notes
                                <textarea
                                    className="form-textarea"
                                    placeholder="Looking for 4 more. We have extra water."
                                    value={notes}
                                    onChange={handleNotesInput}
                                />
                            </label>
                            <p className="chars-remaining">
                                <small>Characters remaining: {chars}</small>
                            </p>
                        </div>

                        <div className="form-section create-button">
                            <input type="submit" value="Create" />
                        </div>
                    </form>
                </main>
            </div>
        </>
    );
}

function generatedPlayerSelectOptions() {
    const playersSelectOptions = [];
    for (let i = 1; i <= 30; i++) {
        playersSelectOptions.push(i);
    }
    return playersSelectOptions;
}

function isValidDatetHandler(current) {
    const validRange = [moment().subtract(1, 'day'), moment().add(28, 'day')];
    return current.isAfter(validRange[0]) && current.isBefore(validRange[1]);
}
