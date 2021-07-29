import "./App.css";
import logo from "./images/logo.svg";
import fly from "./images/fly.svg";

import Home from "./components/Home";
import Reports from "./components/Reports";
import CheckLogin from "./components/CheckLogin";
import Login from "./components/Login"
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

import React, { useState, useCallback } from "react";
// import react-router-dom items
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink,
} from "react-router-dom";
import axios from "axios";


function App() {
  const [riderData, setRiderData] = useState(null);
  const isLoggedIn = riderData !== null;
  const [currentRiderId, setCurrentRiderId] = useState(null);

  const loadCurrentUserData = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/riders/${currentRiderId}`)
      .then((response) => {
        setRiderData(response.data.rider);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => console.log());
  }, [currentRiderId]);


  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={fly} className="fly" alt="a fly" />
          <img src={logo} className="BART-Smells-logo" alt="logo" />
          <span className="fly2Box">
            <img src={fly} className="fly2" alt="another fly" />
          </span>
        </header>
        <nav className="App-nav">
          <ul>
            <li>
              <NavLink exact to="/" activeClassName="current-page">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/reports" activeClassName="current-page">
                View Reports
              </NavLink>
            </li>
          </ul>
        </nav>
        <main>
          <section className="utility">
            <Link to="/register">Register</Link>/<Link to="/login">Login</Link>
            <Link to="/dashboard">
              My Dashboard
            </Link>
          </section>
          <Switch>
          <CheckLogin
            path='/dashboard'
            isLoggedIn={isLoggedIn}
            render={(props) => (
              <Dashboard {...props} riderData={riderData} />
            )}
          />
            <Route path="/reports" component={Reports} />
            <Route path="/login">
              <Login currentRiderId={currentRiderId} setCurrentRiderId={setCurrentRiderId} loadCurrentUserData={loadCurrentUserData}/>
            </Route>
            <Route path="/register">
              <Register currentRiderId={currentRiderId} setCurrentRiderId={setCurrentRiderId} setRiderData={setRiderData}/>
            </Route>
            <Route path="/" component={Home} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
