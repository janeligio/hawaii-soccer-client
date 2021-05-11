import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Home from './components/Home/Home';
import Create from './components/Create/Create';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {

    return (
    <Router>
    <div className="App">
        <main>
            <Switch>
                <Route path="/create">
                    <Create/>
                </Route>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
        </main>
    </div>
    <Footer/>
    </Router>
  );
}

export default App;
