import React from 'react';
import { Keyboard } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex justify-center items-center p-6 mb-4">
      <div className="flex items-center gap-2 relative group">
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <Keyboard className="w-6 h-6 text-blue-500" />
        <h1 className="text-2xl font-bold tracking-tight gradient-text">TypeRhythm</h1>
      </div>
    </header>
  );
};

export default Header;
