import './Create.css';

export default function Create() {
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
                        <input type="text"/>
                    </div>
                    <div>
                        <label>Venue</label>
                        <input type="text"/>
                    </div>
                    <div>
                        <label>Date</label>
                        <input type="text"/>
                    </div>
                    <div>
                        <label>Start Time</label>
                        <input type="text"/>
                    </div>
                    <div>
                        <label>End Time</label>
                        <input type="text"/>
                    </div>
                    <div>
                        <label>Players</label>
                        <input type="text"/>
                    </div>
                    <div>
                        <label>Notes</label>
                        <textarea/>
                    </div>

                    <div>
                        <button>Create</button>
                    </div>
                </form>
            </main>
        </div>
    );
}