import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie';
const AdminProtected = () => {
    const token = Cookies.get('admintoken'); // Get token from cookies
    console.log('token fetching the protected',token)
    if (!token) {
      return <Navigate to="/admin/login" replace />;
    }
  
    return <Outlet />;
}

export default AdminProtected
