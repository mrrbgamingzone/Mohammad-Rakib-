
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-indigo-600 transition-colors">
          GoCommerce
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-gray-600 font-medium">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <Link to="/#products" className="hover:text-indigo-600 transition-colors">Products</Link>
          {isAuthenticated && <Link to="/orders" className="hover:text-indigo-600 transition-colors">My Orders</Link>}
        </nav>
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative text-gray-600 hover:text-indigo-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{itemCount}</span>
            )}
          </Link>
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700 hidden sm:block">Welcome, {user?.name}</span>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition-colors text-sm">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition-colors text-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
