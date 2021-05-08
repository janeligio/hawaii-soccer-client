import { useEffect } from 'react';
import moment from 'moment';
import DateTime from 'react-datetime';

export default function TimePicker(props) {
    const { venue, setStartTime, setEndTime } = props;
    
    useEffect(() => {

    }, []);

    // Calculate start time
    // Venue object has "hours" field that is a string with form X:XXAM-X:XXPM
    const parseHoursField = (venue) => {
        if (venue) {
            const hours = venue.hours.split('-');

            const start = moment(hours[0], "h:mmA");
            const end = moment(hours[1], "h:mmA");

            return [start, end];
        } else {
            const start = moment("8:00AM", "h:mmA");
            const end = moment("8:00PM", "h:mmA");
            return [start, end];
        }
    }



    // const initialStartTime = moment().set('hour', 0).set('minute', 0).add(8, 'hours');
    // const initialEndTime = moment().set('hour', 0).set('minute', 0).add(10, 'hours');

    // Calculates the nearest hour and sets that + one hour as start - end times.
    const initialStartTime = moment().set('hour', moment().get('hour') + 1).set('minutes', 0);
    const initialEndTime = moment().set('hour', moment().get('hour') + 1).set('minutes', 0).add(60, 'minutes');
    

    const [ open, close ] = parseHoursField(venue);
    const startTimeConstraints = {
        hours: {
            min: open.get('hour'), max: close.get('hour'), step: 1
        },
        minutes: {
            // min: open.get('minute'), max: close.get('minute')
        }
    }
    const endTimeConstraints = {
        hours: {
            min: open.get('hour'), max: close.get('hour'), step: 1
        },
        minutes: {
            // min: open.get('minute'), max: close.get('minute')
        }
    }
    function handleStartTimeChange(momentObj) {
        console.log(momentObj.format("h:mmA"));
        setStartTime(momentObj.format("h:mmA"));
    }
    function handleEndTimeChange(momentObj) {
        console.log(momentObj.format("h:mmA"));
        setEndTime(momentObj.format("h:mmA"));
    }
    return (
    <div>
        <label>Start Time</label>
        <DateTime 
            dateFormat={false} 
            input={true} 
            initialValue={initialStartTime}
            onChange={handleStartTimeChange} 
            timeConstraints={startTimeConstraints} />
        <label>End Time</label>
        <DateTime dateFormat={false} 
            input={true} 
            initialValue={initialEndTime} 
            timeConstraints={endTimeConstraints}
            onChange={handleEndTimeChange} />
    </div>);
}