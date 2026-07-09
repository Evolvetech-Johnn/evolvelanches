import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  DollarSign,
  Package,
  BarChart2,
  UtensilsCrossed,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen, onLogout }) => {
  const location = useLocation();

  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/pedidos', icon: ShoppingBag, label: 'Pedidos' },
    { path: '/admin/financeiro', icon: DollarSign, label: 'Financeiro' },
    { path: '/admin/cardapio', icon: UtensilsCrossed, label: 'Cardápio' },
    { path: '/admin/estoque', icon: Package, label: 'Estoque' },
    { path: '/admin/metricas', icon: BarChart2, label: 'Métricas' },
  ];

  return (
    <>
      {/* Sidebar Desktop */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen transition-all duration-300 bg-gray-900 border-r border-gray-800 ${
          isOpen ? 'w-64' : 'w-20'
        } hidden lg:block`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
          {isOpen && (
            <h2 className="text-xl font-bold text-white font-heading">
              EVOLVE
            </h2>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                {isOpen && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-3 py-3 w-full rounded-lg text-gray-400 hover:bg-gray-800 hover:text-red-500 transition-all"
          >
            <LogOut size={20} className="flex-shrink-0" />
            {isOpen && <span className="font-medium">Sair</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          <aside className="fixed left-0 top-0 z-50 h-screen w-64 bg-gray-900 border-r border-gray-800 lg:hidden">
            {/* Same content as desktop */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white font-heading">
                EVOLVE
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white"
              >
                <ChevronLeft size={20} />
              </button>
            </div>

            <nav className="p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onLogout();
                }}
                className="flex items-center gap-3 px-3 py-3 w-full rounded-lg text-gray-400 hover:bg-gray-800 hover:text-red-500 transition-all"
              >
                <LogOut size={20} />
                <span className="font-medium">Sair</span>
              </button>
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default Sidebar;
