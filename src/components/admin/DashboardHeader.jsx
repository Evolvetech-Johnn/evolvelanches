import React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useStore } from '../../contexts/StoreContext';

const DashboardHeader = ({ onMenuClick }) => {
  const { user } = useAuth();
  const { isOpen: storeIsOpen, toggleStoreOpen } = useStore();

  return (
    <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu size={24} />
          </button>

          {/* Search Bar */}
          <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2 w-80">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-transparent border-none outline-none w-full text-sm"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Store Status Toggle */}
          <button
            onClick={toggleStoreOpen}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              storeIsOpen
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            {storeIsOpen ? 'Loja Aberta' : 'Loja Fechada'}
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900">
                {user?.name || 'Admin'}
              </p>
              <p className="text-xs text-gray-500">Administrador</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium">
              {user?.name?.[0] || 'A'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
