import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../../Pages/user/login';
import Products from '../../Pages/user/Products';
import UserProtected from '../../Protected/UserProtected'; // Import the protected route

export default function userRoute() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
            <Route path='/' element={<Products />} />
          <Route element={<UserProtected />}> {/* Wrap protected routes */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
