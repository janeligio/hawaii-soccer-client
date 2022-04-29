export default function Venue(props) {
    const { setSelectedVenue } = props;

    function handleOnClick() {
        setSelectedVenue(props.venue);
    }
    return (
        <div
            onClick={() => handleOnClick()}
            className={`${props.selected ? 'selected ' : ''}venue`}
        >
            {/* <input style={{width:'20px', float:'left', justifyContent:'center'}} type="radio" checked={props.selected || false}/> */}
            <h4 className="venue-name">{props.venue.name}</h4>
            <p className="venue-address">{props.venue.address}</p>
            <p className="venue-hours">
                Open: {props.venue.hours || 'Unknown'}
            </p>
        </div>
    );
}
