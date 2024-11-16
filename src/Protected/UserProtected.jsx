import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const UserProtected = () => {
  const token = Cookies.get('usertoken'); // Get token from cookies
  console.log('token fetching the protected', token);
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default UserProtected;
