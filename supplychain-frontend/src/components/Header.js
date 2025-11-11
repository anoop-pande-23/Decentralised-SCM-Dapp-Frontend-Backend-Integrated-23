import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="bg-purple-900 text-white shadow-md">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
      <div className="text-xl font-bold">
        <span className="text-white">Crypto</span>
        <span className="text-purple-300">Market</span>
      </div>
      <nav className="flex items-center space-x-4">
        <Link
          to="/"
          className="text-white hover:text-purple-300 transition duration-150 ease-in-out px-3 py-2 rounded-md font-medium"
        >
          Home
        </Link>
        <Link
          to="/products"
          className="text-white hover:text-purple-300 transition duration-150 ease-in-out px-3 py-2 rounded-md font-medium"
        >
          Products
        </Link>
        <Link
          to="/login"
          className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-md font-medium transition duration-150 ease-in-out"
        >
          Sign In / Up
        </Link>
      </nav>
    </div>
  </header>
);

export default Header;
