import React from 'react';
import { Car as Cards } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-gradient-to-r from-green-900 via-green-800 to-green-900 border-b-4 border-yellow-600 shadow-lg p-4 mb-6">
      <div className="max-w-4xl mx-auto flex items-center justify-center">
        <Cards className="text-yellow-400 mr-3" size={32} />
        <h1 className="text-3xl font-bold text-white tracking-wider">
          <span className="text-yellow-400">Ride</span> the <span className="text-yellow-400">Bus</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;