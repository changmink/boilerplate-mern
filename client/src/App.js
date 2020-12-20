import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import R
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <hr/>
          </ul>
        </div>
        <Switch>
          <Route>
            <Home />
          </Route>
          <Route>
            <Home />
          </Route>
          <Route>
            <Home />
          </Route>
        </Switch>
      </Router> 
    </div>
  );
}

export default App;
