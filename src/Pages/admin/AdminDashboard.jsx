import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

export default function AdminDashboard() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex items-center justify-between bg-indigo-600 p-4 text-white shadow-md">
        <h1 className="text-lg font-bold">Admin Dashboard</h1>
        <div className="relative">
          <FaUserCircle size={30} className="cursor-pointer hover:text-indigo-300 transition duration-200" />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/4 bg-indigo-800 p-6 text-white shadow-xl">
          <div className="mb-8 flex justify-center items-center">
            <h2 className="text-2xl font-semibold text-white">Admin Panel</h2>
          </div>
          <nav className="space-y-4">
            {/* <Link
              to="/admin/dashboard"
              className="block py-3 px-4 text-lg hover:bg-indigo-700 rounded-lg transition duration-200"
            >
              Dashboard
            </Link> */}
            <Link
              to="/admin/user-cart"
              className="block py-3 px-4 text-lg hover:bg-indigo-700 rounded-lg transition duration-200"
            >
              User Cart
            </Link>
            <Link
              to="/admin/products"
              className="block py-3 px-4 text-lg hover:bg-indigo-700 rounded-lg transition duration-200"
            >
              Products
            </Link>
          </nav>
        </div>

        <div className="w-3/4 p-6 overflow-y-auto bg-gray-50">
          

          <div className="mt-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
