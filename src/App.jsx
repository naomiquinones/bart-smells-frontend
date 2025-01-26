import React, { useState, useCallback } from "react";
import { Route, Link, Routes, NavLink, useNavigate } from "react-router-dom";

import "./App.css";
import logo from "./images/logo.svg";
import fly from "./images/fly.svg";

import CheckLogin from "./components/CheckLogin";
import Home from "./components/Home";
import Reports from "./components/Reports";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

import axios from "axios";

function App() {
  const navigate = useNavigate();

  const [BARTRouteList, setBARTRouteList] = useState([]);

  const [riderData, setRiderData] = useState(null);
  const currentRiderId = riderData !== null ? riderData.id : null;
  const isLoggedIn = riderData !== null;

  const getBARTRouteList = useCallback(() => {
    axios
      .get(
        "https://api.bart.gov/api/route.aspx?cmd=routes&key=MW9S-E7SL-26DU-VV8V&json=y"
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
        .get(`${import.meta.env.VITE_APP_BACKEND_URL}/riders/${riderData.id}`)
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
    navigate("/login");
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
            <NavLink to="/" className={({ isActive }) => (isActive ? "current-page" : "")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/reports" className={({ isActive }) => (isActive ? "current-page" : "")}>
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
        <Routes>
          <Route path="/reports" element={<Reports />} />
          <Route
            path="/dashboard"
            element={
              <CheckLogin isLoggedIn={isLoggedIn}>
                <Dashboard
                  getBARTRouteList={getBARTRouteList}
                  riderData={riderData}
                  isLoggedIn={isLoggedIn}
                  getRiderData={getRiderData}
                  setRiderData={setRiderData}
                />
              </CheckLogin>
            }
          />
          <Route
            path="/login"
            element={<Login setRiderData={setRiderData} />}
          />
          <Route
            path="/register"
            element={<Register setRiderData={setRiderData} />}
          />
          <Route
            path="/logout"
            element={
              <CheckLogin isLoggedIn={isLoggedIn}>
                <Home
                  currentRiderId={currentRiderId}
                  setRiderData={setRiderData}
                  getRiderData={getRiderData}
                />
              </CheckLogin>
            }
          />
          <Route
            path="/"
            element={
              <CheckLogin isLoggedIn={isLoggedIn}>
                <Home
                  BARTRouteList={BARTRouteList}
                  setBARTRouteList={setBARTRouteList}
                  getBARTRouteList={getBARTRouteList}
                  currentRiderId={currentRiderId}
                  setRiderData={setRiderData}
                  getRiderData={getRiderData}
                />
              </CheckLogin>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
