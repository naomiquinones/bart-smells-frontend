import React, { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import './Register.css'
import axios from "axios";

const Register = (props) => {
  const isMounted = useRef(true);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmationPassword, setConfirmationPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [passwordsMatch, setPasswordsMatch] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/riders`, {
        name: username,
        password: password,
        email: email
      });
      if (response && response.data) {
        isMounted.current && props.setRiderData(response.data.rider);
        navigate("/");
      } else {
        setErrorMsg("Registration failed");
      }
    } catch (e) {
      console.error(`error: ${e}`);
      setErrorMsg(e.response?.data?.error);
    } finally {
      console.log("Tried registration");
      setUsername("");
      setPassword("");
      setConfirmationPassword("");
      setEmail("");
    }
    // await axios
    //   .post(`${import.meta.env.VITE_APP_BACKEND_URL}/riders`, {
    //     name: username,
    //     password: password,
    //     email: email
    //   })
    //   .then((response) => {
    //     isMounted && props.setRiderData(response.data.rider);
    //     props.history.push("/");
    //   })
    //   .catch((e) => setErrorMsg(e.response.data.error))
    //   .finally(() => {
    //     console.log("Tried registration");
    //     setUsername("");
    //     setPassword("");
    //     setConfirmationPassword("");
    //     setEmail("");
    //   });
  };

  const handlePasswordBlur = () => {
    setPasswordsMatch(password === confirmationPassword);
  }
  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
      setPasswordsMatch(value === confirmationPassword);
    } else if (name === "confirmationPassword") {
      setConfirmationPassword(value);
      setPasswordsMatch(value === password);
    }
  };
  useEffect(() => () => (isMounted.current = false), []);

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
          onChange={handlePasswordInputChange}
          onBlur={handlePasswordBlur}
        />
        <label htmlFor="exampleInputPassword1">Confirm Password</label>
        <input
          type="password"
          className=""
          id="confirmationPassword"
          placeholder="Confirm Password"
          name="confirmationPassword"
          value={confirmationPassword}
          onChange={handlePasswordInputChange}
          onBlur={handlePasswordBlur}
        />
        {password && confirmationPassword && !passwordsMatch && (
          <p className="alert">Please make sure passwords are the same</p>
        )}
        <button type="submit" className="">
          Register
        </button>
      </form>
      { errorMsg ? <p className="error-msg">{errorMsg}</p> : <p>
        Already registered? Go to <Link to="/login">login</Link>
      </p>}
    </>
  );
};

export default Register;
