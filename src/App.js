import './App.css';
import logo from './images/logo.svg';
import fly from './images/fly.svg';

import Home from './components/Home';
import Reports from './components/Reports';

import React from 'react';
// import react-router-dom items
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <img src={fly} className="fly" alt="a fly" />
        <img src={logo} className="BART-Smells-logo" alt="logo" />
        <span className="fly2Box"><img src={fly} className="fly2" alt="another fly" /></span>
      </header>
      <nav className="App-nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/reports">View Reports</Link></li>
        </ul>
      </nav>
      <Switch>
        <Route path="/reports" component={Reports} />
        <Route path="/reports/:reportId" component={Reports} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
    </Router>
  );
}




export default App;
