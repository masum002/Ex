
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Coins, PlusSquare, LogOut, Facebook } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top Navbar for Desktop */}
      <nav className="hidden md:flex bg-white shadow-sm border-b sticky top-0 z-50 px-6 py-3 items-center justify-between">
        <div className="flex items-center space-x-2 text-blue-600 font-bold text-xl">
          <Facebook size={28} />
          <span>FB Exchange</span>
        </div>
        
        <div className="flex items-center space-x-8">
          <Link to="/dashboard" className={`flex items-center space-x-2 ${isActive('/dashboard') ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}>
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link to="/earn" className={`flex items-center space-x-2 ${isActive('/earn') ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}>
            <Coins size={20} />
            <span className="font-medium">Earn Coins</span>
          </Link>
          <Link to="/add-task" className={`flex items-center space-x-2 ${isActive('/add-task') ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}>
            <PlusSquare size={20} />
            <span className="font-medium">Add Task</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="bg-yellow-100 px-3 py-1 rounded-full flex items-center space-x-1">
            <Coins size={16} className="text-yellow-600" />
            <span className="text-yellow-700 font-bold">{user.coins}</span>
          </div>
          <button 
            onClick={onLogout}
            className="text-gray-500 hover:text-red-600 transition-colors"
          >
            <LogOut size={20} />
          </button>
        </div>
      </nav>

      {/* Bottom Navbar for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center py-3 px-2 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <Link to="/dashboard" className={`flex flex-col items-center ${isActive('/dashboard') ? 'text-blue-600' : 'text-gray-400'}`}>
          <LayoutDashboard size={24} />
          <span className="text-[10px] mt-1 font-medium">Home</span>
        </Link>
        <Link to="/earn" className={`flex flex-col items-center ${isActive('/earn') ? 'text-blue-600' : 'text-gray-400'}`}>
          <Coins size={24} />
          <span className="text-[10px] mt-1 font-medium">Earn</span>
        </Link>
        <Link to="/add-task" className={`flex flex-col items-center ${isActive('/add-task') ? 'text-blue-600' : 'text-gray-400'}`}>
          <PlusSquare size={24} />
          <span className="text-[10px] mt-1 font-medium">Add Task</span>
        </Link>
        <button onClick={onLogout} className="flex flex-col items-center text-gray-400">
          <LogOut size={24} />
          <span className="text-[10px] mt-1 font-medium">Exit</span>
        </button>
      </nav>
      
      {/* Mobile Top Header (Coins display) */}
      <div className="md:hidden bg-white px-4 py-3 flex justify-between items-center border-b sticky top-0 z-40">
        <div className="flex items-center space-x-2 text-blue-600 font-bold text-lg">
          <Facebook size={24} />
          <span>FB Exchange</span>
        </div>
        <div className="bg-yellow-100 px-3 py-1 rounded-full flex items-center space-x-1">
          <Coins size={14} className="text-yellow-600" />
          <span className="text-yellow-700 font-bold text-sm">{user.coins}</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
