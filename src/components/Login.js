import React from "react";

import "./Login.css";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink,
} from "react-router-dom";


const Login = (props) => {
  return (
    <>
    <form className="login-form" onSubmit={props.handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Username"
        ref={props.inputUsername}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        ref={props.inputPassword}
      />
      <button type="submit" className="">
        Sign In
      </button>
    </form>
    <p>Not a user? Go to <Link to="/register">register</Link></p>
    </>
  );
};

export default Login;
