
export default function Game(props) {
    const { dateCreated, name, venue, startTime, endTime, date, playerCount, notes } = props;

    return (
    <div>
        <h4>{venue}</h4>
        <p>Organizer: {name}</p>
        <p>
            <small>{date} {startTime} {endTime && `- ${endTime}`}</small>
            <br/>
            <span>Players: {playerCount}</span>
            <br/>
            Notes: {notes}
        </p>

        <div>
            <button>Join</button>
        </div>
    </div>);
}

export const GAMES_DATA = [
    {
        dateCreated: '',
        name: 'Jan',
        venue: 'Kapiolani',
        startTime: '11:00am',
        endTime: '1:00pm',
        date: '05-07-2021',
        playerCount: 5,
        notes: 'Bring a ball if you can'
    }
];
/*
const GameSchema = new Schema({
  dateCreated: { type: Date, default: Date.now() },
  name: String,
  venue: Schema.Types.ObjectId,
  date: Date,
  startTime: String,
  endTime: String,
  playerCount: { type: Number, default: 1},
  notes: String
});
*/