// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <nav className="w-full flex justify-between items-center p-5 bg-white shadow-md">
        <div className="text-2xl font-bold">Dummy Logo</div>
        <div>
          <Link to="/signup" className="mr-4 p-2 bg-blue-500 text-white rounded">Sign Up</Link>
          <Link to="/signin" className="p-2 bg-green-500 text-white rounded">Sign In</Link>
        </div>
      </nav>
      <div className="mt-10 text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to Our App</h1>
        <p className="text-lg text-gray-700">Please sign up or sign in to continue</p>
      </div>
    </div>
  );
}

export default Home;
