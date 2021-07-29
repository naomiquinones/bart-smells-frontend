import React from "react";
import { Link } from "react-router-dom";

import './Register.css'
import axios from "axios";

const Register = (props) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [passwordsMatch, setPasswordsMatch] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/riders`, {
        name: username,
        password: password,
        email: email
      })
      .then((response) => {
        props.setCurrentRiderId(response.data.rider.id);
        props.setRiderData(response.data.rider);
      })
      .catch((error) => console.log(error))
      .finally(() => console.log("Tried registration"));
  };

  return (
    <>
      <form className="registration-form" onSubmit={handleSubmit}>
        <label htmlFor="rider-name">Username</label>
        <input
          required
          type="text"
          id="rider-name"
          name="rider-name"
          placeholder="Enter a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="email">Email address</label>
        <input
          required
          type="email"
          className=""
          id="email"
          name="email"
          aria-describedby="no-share-msg"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <small id="no-share-msg" className="">
          We will not share your email with anyone else.
        </small>
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          required
          type="password"
          className=""
          id="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={(e) => {
            password === confirmPassword
              ? setPasswordsMatch(true)
              : setPasswordsMatch(false);
          }}
        />
        <label htmlFor="exampleInputPassword1">Confirm Password</label>
        <input
          type="password"
          className=""
          id="confirmPassword"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={(e) => {
            password === confirmPassword
              ? setPasswordsMatch(true)
              : setPasswordsMatch(false);
          }}
        />
        {password && confirmPassword && !passwordsMatch && (
          <p className="alert">Please make sure passwords are the same</p>
        )}
        <button type="submit" className="">
          Register
        </button>
      </form>
      <p>
        Already registered? Go to <Link to="/login">login</Link>
      </p>
    </>
  );
};

export default Register;
