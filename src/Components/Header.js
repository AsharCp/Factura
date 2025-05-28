import React from 'react'

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-5xl font-extrabold tracking-tight">factura</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="hover:text-blue-200 transition duration-300 text-lg">Home</a></li>
            <li><a href="#" className="hover:text-blue-200 transition duration-300 text-lg">Features</a></li>
            <li><a href="#" className="hover:text-blue-200 transition duration-300 text-lg">Pricing</a></li>
            <li><a href="#" className="hover:text-blue-200 transition duration-300 text-lg">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header