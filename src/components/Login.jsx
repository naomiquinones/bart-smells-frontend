import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";
import axios from "axios";

const Login = (props) => {
  const isMounted = useRef(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/login`, {
        username,
        password,
      });
      if (response && response.data) {
        props.setRiderData(response.data.user);
        navigate('/dashboard');
      } else {
        setErrorMsg("Invalid username or password");
      }
    } catch (error) {
      console.error('Error logging in', error);
      setErrorMsg(error.response?.data?.error || "Error logging in");
    }
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
          autoComplete="on"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="on"
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

export default Login;
