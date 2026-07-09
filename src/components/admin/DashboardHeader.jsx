import React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useStore } from '../../contexts/StoreContext';

const DashboardHeader = ({ onMenuClick }) => {
  const { user } = useAuth();
  const { isOpen: storeIsOpen, toggleStoreOpen } = useStore();

  return (
    <header style={{
      height: '4rem',
      backgroundColor: '#fff',
      borderBottom: '1px solid #e5e7eb',
      position: 'sticky',
      top: 0,
      zIndex: 30,
    }}>
      <div style={{
        height: '100%',
        padding: '0 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
      }}>
        {/* Left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onMenuClick}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              color: '#374151',
            }}
          >
            <Menu size={24} />
          </button>

          {/* Search */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#f3f4f6',
            borderRadius: '0.5rem',
            padding: '0.5rem 1rem',
            width: '20rem',
          }}>
            <Search size={18} style={{ color: '#9ca3af', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Buscar..."
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                width: '100%',
                fontSize: '0.875rem',
                color: '#374151',
              }}
            />
          </div>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Store Toggle */}
          <button
            onClick={toggleStoreOpen}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.875rem',
              color: '#fff',
              backgroundColor: storeIsOpen ? '#22c55e' : '#ef4444',
              transition: 'background 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            {storeIsOpen ? '✔ Loja Aberta' : '✘ Loja Fechada'}
          </button>

          {/* Notifications */}
          <div style={{ position: 'relative' }}>
            <button style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              color: '#374151',
            }}>
              <Bell size={20} />
            </button>
            <span style={{
              position: 'absolute',
              top: '0.25rem',
              right: '0.25rem',
              width: '0.5rem',
              height: '0.5rem',
              backgroundColor: '#ef4444',
              borderRadius: '9999px',
              display: 'block',
            }} />
          </div>

          {/* User */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.5rem 0.75rem',
            borderRadius: '0.5rem',
            cursor: 'pointer',
          }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827', margin: 0 }}>
                {user?.name || 'Admin'}
              </p>
              <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>Administrador</p>
            </div>
            <div style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '9999px',
              backgroundColor: '#F05A28',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 600,
              fontSize: '1rem',
              flexShrink: 0,
            }}>
              {user?.name?.[0]?.toUpperCase() || 'A'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
