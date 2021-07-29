import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink,
} from "react-router-dom";

const Register = (props) => {
  return (
    <div className="">
      <form>
        <label htmlFor="rider-name">Username</label>
        <input
          type="text"
          id="rider-name"
          name="rider-name"
          placeholder="Enter a username"
        />
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className=""
          id="email"
          name="email"
          aria-describedby="no-share-msg"
          placeholder="Enter email"
        />
        <small id="no-share-msg" className="">
          We will not share your email with anyone else.
        </small>
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className=""
          id="password"
          placeholder="Password"
        />
        <label htmlFor="exampleInputPassword1">Confirm Password</label>
        <input
          type="password"
          className=""
          id="confirmPassword"
          placeholder="Confirm Password"
        />
        <button type="submit" className="">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;