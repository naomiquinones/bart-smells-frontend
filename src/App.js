import './App.css';
import Home from './components/Home';
import Reports from './components/Reports';

import React from 'react';
// import react-router-dom items
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
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
