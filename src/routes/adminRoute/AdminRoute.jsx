import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from '../../Pages/admin/AdminLogin';
import AdminDashboard from '../../Pages/admin/AdminDashboard';

// Import the components for nested routes
import Dashboard from '../../Components/Dashboard';
import UserCart from '../../Pages/admin/UserCart';
import Products from '../../Pages/admin/AdminProducts';
import AdminProtected from '../../Protected/AdminProtected';

const AdminRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<AdminProtected />}>
        
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user-cart" element={<UserCart />} />
          <Route path="products" element={<Products />} />
        </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AdminRoute;
