import React from 'react';

const Logout = (props) => {
  const logout = () => {
    console.log("logout");
    props.setRiderData(null);
    props.history.push("/login");
  }
  return (
      <a href="/logout" onClick={logout}>Logout</a>
  )
}

export default Logout;