import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Home from './components/Home/Home';
import './App.css';

function App() {
    return (
    <Router>
    <div className="App">

        <main>
        <Switch>
            <Route path="/create">
                <h3>Organize a Game</h3>
                <p>Welcome</p>
            </Route>
            <Route path="/">
                <Home/>
            </Route>
        </Switch>
        </main>
    </div>
    </Router>
  );
}

export default App;
