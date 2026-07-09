import React from 'react';

const Card = ({ children, title, subtitle, className = '', headerAction, padding = true }) => {
  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '0.75rem',
      border: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      overflow: 'hidden',
    }}>
      {(title || headerAction) && (
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}>
          <div>
            {title && (
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111827', margin: 0 }}>
                {title}
              </h3>
            )}
            {subtitle && (
              <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0.25rem 0 0' }}>
                {subtitle}
              </p>
            )}
          </div>
          {headerAction && <div style={{ flexShrink: 0 }}>{headerAction}</div>}
        </div>
      )}
      <div style={{ padding: padding ? '1.5rem' : '0' }}>
        {children}
      </div>
    </div>
  );
};

export default Card;
