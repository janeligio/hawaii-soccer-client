import { useState } from 'react';
import Venue from '../Venue/Venue';
import './VenuePicker.css';

export default function VenuePicker(props) {
    const [ open, setOpen ] = useState(false);
    const venues = props.venues || [];
    const { selectedVenue, setSelectedVenue } = props;

    function toggleModal(event) {
        event.preventDefault();
        setOpen(!open);
    }

    const selectedVenueName = selectedVenue ? selectedVenue.name : '';
    return (
        <>  
            <button  onClick={toggleModal}>Pick Venue</button>
            <div className="venuepicker-modal" style={{display: `${open ? 'block' : 'none'}`}}>
                
                <div className="venuepicker-modal-content">
                    <div className="venues">
                        <button className="venuepicker-close" onClick={toggleModal}>Done</button>
                        {venues.length > 0 && venues.map(venue => {
                            return <Venue venue={venue} selected={(venue.name === selectedVenueName)} setSelectedVenue={setSelectedVenue}/>;
                        })}
                    </div>
                </div>
            </div>

        </>
    );
}