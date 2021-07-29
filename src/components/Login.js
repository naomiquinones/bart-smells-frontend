import React from "react";
import { Link } from "react-router-dom";

import "./Login.css";

import axios from "axios";

const Login = (props) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
      username: username,
      password: password
    })
    .then(response => {
      props.setCurrentRiderId(response.data.id);
      props.fetchData(response.data.id);
  })
    .catch(error => console.log(error))
    .finally(() => console.log("Tried login"));
  }

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
    <p>Not yet registered? Go to <Link to="/register">register</Link></p>
    </>
  );
};

export default Login;
