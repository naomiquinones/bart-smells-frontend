import React from 'react';
import logo from '../logo.svg';
import fly from '../fly.svg';
import '../App.css'
import './Input.css'

// import Input from './Input';

const Home = () => {
  return (
  <>
    <header className="App-header">
      <img src={fly} className="fly" alt="a fly" />
      <img src={logo} className="BART-Smells-logo" alt="logo" />
      <span class="fly2Box"><img src={fly} className="fly2" alt="another fly" /></span>
    </header>
    <main>
      {/* <Input className="reportInput"
      name="test"
      type="text"
      value="report"
      onChange={(e) => console.log(e.target.value)} /> */}
        <h2>Make Report</h2>
        <form>
          <label htmlFor="smell" value="">Noxious smell</label>
          <input type="text" className="reportInput"
          name="smell" />
          <label htmlFor="liquid" value="">Liquid</label>
          <input type="text" className="reportInput"
          name="liquid" />
          <label htmlFor="solid" value="">Solid</label>
          <input type="text" className="reportInput"
          name="solid" />
          <label htmlFor="crime" value="">Crime</label>
          <textarea type="text" className="reportInput"
          name="crime" />
          <button type="submit">Submit</button>
        </form>
    </main>
  </>
)}

export default Home;