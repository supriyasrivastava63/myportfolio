import React from 'react';
import { Sun, Heart, Coffee } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Sun className="w-8 h-8 text-morning-500" />
              <h1 className="text-2xl font-bold text-gray-900 font-script">
                Good Morning
              </h1>
            </div>
            <span className="text-gray-400">|</span>
            <span className="text-sm text-gray-600">Image Generator</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Coffee className="w-4 h-4" />
              <span>Start your day right</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4 text-red-400" />
              <span className="text-xs text-gray-500">Made with love</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 