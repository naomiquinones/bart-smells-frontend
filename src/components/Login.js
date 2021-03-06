import React, { useEffect, useRef, useState } from "react";
import { Link, withRouter } from "react-router-dom";

import "./Login.css";
import axios from "axios";

const Login = (props) => {
  const isMounted = useRef(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        username: username,
        password: password,
      })
      .then((response) => {
        isMounted && props.setRiderData(response.data.user);
        props.history.push("/");
      })
      .catch((e) => {
        console.log(e.response.data.error);
        setErrorMsg(e.response.data.error);
      })
      .finally(() => {
        console.log("Tried login");
        setUsername("");
        setPassword("");
      });
  };
  useEffect(() => () => (isMounted.current = false), []);

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="">
          Sign In
        </button>
      </form>
      {errorMsg ? <p className="error-msg">{errorMsg}</p> : <p>
        Not yet registered? Go to <Link to="/register">register</Link>
      </p> }
    </>
  );
};

export default withRouter(Login);
