import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import './App.css';
import Game, { GAMES_DATA } from './components/Game/Game';

function App() {
    return (
    <Router>
    <div className="App">
        <header>
            <h1>Hawaii Soccer | Five a Side</h1>
        </header>
        <main>
            <Link to="/create">
                Organize a Game
            </Link>

            <Switch>
                <Route path="create">

                </Route>

                <Route path="/">
                    <h3>Soccer games goin' on:</h3>
                    <div>
                        { GAMES_DATA.map(game => {
                            return (<Game
                                dateCreated={game.dateCreated} 
                                name={game.name} 
                                venue={game.venue} 
                                startTime={game.startTime} 
                                endTime={game.endTime} 
                                date={game.date} 
                                playerCount={game.playerCount} 
                                notes={game.notes}
                            />);
                        })}
                    </div>
                </Route>
            </Switch>
        </main>
    </div>
    </Router>
  );
}

export default App;
