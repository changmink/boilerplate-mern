import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
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
              <Link to="/register">register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <hr/>
          </ul>
        </div>
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/register" component={RegisterPage}/>
        </Switch>
      </Router> 
    </div>
  );
}

export default App;
