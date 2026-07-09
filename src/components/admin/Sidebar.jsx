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

const S = {
  aside: (isOpen) => ({
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100vh',
    width: isOpen ? '16rem' : '5rem',
    backgroundColor: '#111827',
    borderRight: '1px solid #1f2937',
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.3s ease',
    zIndex: 40,
    overflow: 'hidden',
  }),
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '4rem',
    padding: '0 1rem',
    borderBottom: '1px solid #1f2937',
    flexShrink: 0,
  },
  logo: {
    color: '#fff',
    fontSize: '1.25rem',
    fontWeight: 700,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  toggleBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#9ca3af',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'background 0.2s',
  },
  nav: {
    flex: 1,
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    overflowY: 'auto',
  },
  link: (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    textDecoration: 'none',
    color: isActive ? '#fff' : '#9ca3af',
    backgroundColor: isActive ? '#F05A28' : 'transparent',
    fontWeight: 500,
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  }),
  linkLabel: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  footer: {
    padding: '1rem',
    borderTop: '1px solid #1f2937',
    flexShrink: 0,
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    width: '100%',
    borderRadius: '0.5rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#9ca3af',
    fontWeight: 500,
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  mobileOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 40,
  },
  mobileAside: {
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100vh',
    width: '16rem',
    backgroundColor: '#111827',
    borderRight: '1px solid #1f2937',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 50,
  },
};

const Sidebar = ({ isOpen, setIsOpen, onLogout }) => {
  const location = useLocation();

  const navItems = [
    { path: '/admin',            icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/pedidos',    icon: ShoppingBag,     label: 'Pedidos' },
    { path: '/admin/financeiro', icon: DollarSign,      label: 'Financeiro' },
    { path: '/admin/cardapio',   icon: UtensilsCrossed, label: 'Cardápio' },
    { path: '/admin/estoque',    icon: Package,         label: 'Estoque' },
    { path: '/admin/metricas',   icon: BarChart2,       label: 'Métricas' },
  ];

  const NavContent = ({ onLinkClick }) => (
    <>
      <div style={S.header}>
        {isOpen && <span style={S.logo}>EVOLVE</span>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={S.toggleBtn}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1f2937'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      <nav style={S.nav}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onLinkClick}
              style={S.link(isActive)}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.backgroundColor = '#1f2937'; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <Icon size={20} style={{ flexShrink: 0 }} />
              {isOpen && <span style={S.linkLabel}>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div style={S.footer}>
        <button
          onClick={onLogout}
          style={S.logoutBtn}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1f2937'; e.currentTarget.style.color = '#ef4444'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#9ca3af'; }}
        >
          <LogOut size={20} style={{ flexShrink: 0 }} />
          {isOpen && <span>Sair</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside style={S.aside(isOpen)}>
        <NavContent onLinkClick={undefined} />
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <>
          <div style={S.mobileOverlay} onClick={() => setIsOpen(false)} />
          <aside style={{ ...S.mobileAside, display: 'flex' }}>
            <NavContent onLinkClick={() => setIsOpen(false)} />
          </aside>
        </>
      )}
    </>
  );
};

export default Sidebar;
