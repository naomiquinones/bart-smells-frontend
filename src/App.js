import "./App.css";
import logo from "./images/logo.svg";
import fly from "./images/fly.svg";

import Home from "./components/Home";
import Reports from "./components/Reports";
import Dashboard from "./components/Dashboard";

import React from "react";
// import react-router-dom items
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink,
} from "react-router-dom";

function App() {
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
          <section className="">
            <Link exact to="/dashboard">
              Dashboard
            </Link>
          </section>
          <Switch>
            <Route path="/reports" component={Reports} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/" component={Home} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
