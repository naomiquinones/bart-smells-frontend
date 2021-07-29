import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const CheckLogin = ({ isLoggedIn, ...props}) => isLoggedIn ? <Route {...props} /> :
  <Redirect to="/login" />;


export default CheckLogin;