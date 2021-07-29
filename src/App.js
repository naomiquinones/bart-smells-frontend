import "./App.css";
import logo from "./images/logo.svg";
import fly from "./images/fly.svg";

import CheckLogin from "./components/CheckLogin";
import Home from "./components/Home";
import Reports from "./components/Reports";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

import React, { useState, useCallback } from "react";
// import react-router-dom items
import { Route, Link, Switch, NavLink, useHistory } from "react-router-dom";

import axios from "axios";

function App() {
  const history = useHistory();

  const [BARTRouteList, setBARTRouteList] = useState([]);

  const [riderData, setRiderData] = useState(null);
  const currentRiderId = riderData !== null ? riderData.id : null;
  const isLoggedIn = riderData !== null;

  const getBARTRouteList = useCallback(() => {
    axios
      .get(
        "http://api.bart.gov/api/route.aspx?cmd=routes&key=MW9S-E7SL-26DU-VV8V&json=y"
      )
      .then((response) => {
        setBARTRouteList(response.data.root.routes.route);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => console.log("Tried to get BART routes"));
  }, []);

  const getRiderData = () => {
    isLoggedIn &&
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/riders/${riderData.id}`)
        .then((response) => {
          isLoggedIn
            ? setRiderData(response.data.rider)
            : console.log("abort on unmounted");
          console.log(response.data.rider);
        })
        .catch((error) => console.log(error))
        .finally(() => console.log("getRiderData complete"));
  };

  const logout = () => {
    setRiderData(null);
    history.push("/login");
  };

  return (
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
          <Link to="/register">Register</Link>/
          {isLoggedIn ? (
            <Link to="/logout" onClick={logout}>
              Logout
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
          <Link to="/dashboard">My Dashboard</Link>
        </section>
        <Switch>
          <Route path="/reports" component={Reports} />

          <CheckLogin
            exact
            path="/dashboard"
            isLoggedIn={isLoggedIn}
            render={(props) => (
              <Dashboard
                {...props}
                getBARTRouteList={getBARTRouteList}
                riderData={riderData}
                isLoggedIn={isLoggedIn}
                getRiderData={getRiderData}
                setRiderData={setRiderData}
              />
            )}
          />

          <Route path="/login">
            <Login setRiderData={setRiderData} />
          </Route>
          <Route path="/register">
            <Register setRiderData={setRiderData} />
          </Route>
          <CheckLogin
            exact
            path="/logout"
            isLoggedIn={isLoggedIn}
            render={(props) => (
              <Home
                {...props}
                currentRiderId={currentRiderId}
                setRiderData={setRiderData}
                getRiderData={getRiderData}
              />
            )}
          />

          <CheckLogin
            exact
            path="/"
            isLoggedIn={isLoggedIn}
            render={(props) => (
              <Home
                {...props}
                BARTRouteList={BARTRouteList}
                setBARTRouteList={setBARTRouteList}
                getBARTRouteList={getBARTRouteList}
                currentRiderId={currentRiderId}
                setRiderData={setRiderData}
                getRiderData={getRiderData}
              />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
