import React from 'react';

const VARIANT = {
  default: { bg: '#f3f4f6', text: '#1f2937' },
  primary: { bg: '#fde8e0', text: '#7c2d06' },
  success: { bg: '#dcfce7', text: '#166534' },
  warning: { bg: '#fef9c3', text: '#854d0e' },
  danger:  { bg: '#fee2e2', text: '#991b1b' },
  info:    { bg: '#dbeafe', text: '#1e40af' },
};

const SIZE = {
  sm: { padding: '0.125rem 0.5rem',    fontSize: '0.75rem' },
  md: { padding: '0.25rem 0.625rem',   fontSize: '0.875rem' },
  lg: { padding: '0.375rem 0.75rem',   fontSize: '1rem' },
};

const Badge = ({ children, variant = 'default', size = 'md' }) => {
  const v = VARIANT[variant] || VARIANT.default;
  const s = SIZE[size] || SIZE.md;

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      fontWeight: 500,
      borderRadius: '9999px',
      backgroundColor: v.bg,
      color: v.text,
      padding: s.padding,
      fontSize: s.fontSize,
      whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  );
};

export default Badge;
