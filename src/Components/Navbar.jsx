import React from 'react';
import { FaBorderAll } from "react-icons/fa";
import { CiUser, CiShoppingCart, CiShuffle, CiHeart } from "react-icons/ci";

export default function Navbar({ cartCount, totalPrice, discountedPrice }) {
  return (
    <div className="bg-gray-400 min-h-[10vh]">
      <div className="flex justify-between items-center p-4">
        {/* Left Section */}
        <div className="flex space-x-6 items-center">
          <div className="flex items-center space-x-2 bg-white rounded-xl p-2">
            <FaBorderAll className="text-purple-600 text-3xl rounded-full m-1" />
            <h2 className="text-lg font-semibold">All Categories</h2>
          </div>
          <div className="flex space-x-8">
            <a href="#" className="text-lg font-bold">Deal</a>
            <a href="#" className="text-lg font-bold">Shop</a>
            <a href="#" className="text-lg font-bold">Our Contact</a>
            <a href="#" className="text-lg font-bold">Stores</a>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex space-x-6 mr-6 items-center">
          <CiUser className="text-4xl text-black bg-white m-3 p-2 rounded-full" />
          <CiShuffle className="text-4xl text-black bg-white m-3 p-2 rounded-full" />
          <CiHeart className="text-4xl text-black bg-white m-3 p-2 rounded-full" />
          
          {/* Cart Icon and Discounted Price */}
          <div className="relative flex items-center">
            <CiShoppingCart className="text-4xl text-black bg-purple-600 m-3 p-2 rounded-full" />
            {/* Display Cart Count */}
            <span className="absolute top-0 right-0 text-sm font-bold bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          </div>

          {/* Display Total Discounted Price */}
          <div className="ml-2 bg-white px-3 py-2 rounded-lg shadow-md">
            <span className="text-black font-semibold">
              ₹{discountedPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
