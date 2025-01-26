import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const CheckLogin = ({ isLoggedIn, children }) => isLoggedIn ? children :
  <Navigate to="/login" />;


export default CheckLogin;