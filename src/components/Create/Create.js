import React, { useState } from "react";
import moment from 'moment';
import DateTime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import './Create.css';

export default function Create() {
    const NOTES_MAX_CHAR_COUNT = 150;
    const [ notes, setNotes ] = useState();
    const [ chars, setChars ] = useState(NOTES_MAX_CHAR_COUNT);
    const [ date, setDate ] = useState(moment());
    
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
    return (
        <div className="create">
            <h1 className="create-header">Organize a Game</h1>
            <div className="divider-container">
                <div className="divider"/>
            </div>
            <main className="create-content">
                <p>Welcome</p>
                <form className="create-form">
                    <div>
                        <label>Name</label>
                            <br/>
                        <input placeholder="Kamaka" type="text"/>
                    </div>
                    <div>
                        <label>Email</label>
                            <br/>
                        <input type="text"/>
                    </div>
                    <div>
                        <label>Venue</label>
                            <br/>
                        <input type="text"/>
                    </div>
                    <div>
                        <p>Scheduled Date: {moment(date).format("dddd, MMM D YYYY")}</p>
                        <label>Date</label>
                        <DateTime 
                            timeFormat={false} 
                            value={date}
                            input={false} 
                            isValidDate={isValidDatetHandler}
                            onChange={handleDateChange}/>
                        
                    </div>
                    <div className="form-time">
                        <label>Start {`&`} End Time</label>
                        <div>
                            <DateTime dateFormat={false} input={false}/>
                        </div>
                    </div>
                    <div>
                        <label>Players</label>
                            <br/>
                        <input type="text"/>
                    </div>
                    <div>
                        <label>Notes</label>
                        <br/>
                        <textarea placeholder="We have extra water." value={notes}
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
                        <button onClick={(e) => e.preventDefault()}>Create</button>
                    </div>
                </form>
                
            </main>
        </div>
    );
}