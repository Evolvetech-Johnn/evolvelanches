import React from 'react';

const VARIANT = {
  primary:   { bg: '#F05A28', hover: '#d94e20', text: '#fff', border: 'none' },
  secondary: { bg: '#e5e7eb', hover: '#d1d5db', text: '#111827', border: 'none' },
  outline:   { bg: 'transparent', hover: '#fff4f0', text: '#F05A28', border: '2px solid #F05A28' },
  danger:    { bg: '#ef4444', hover: '#dc2626', text: '#fff', border: 'none' },
  success:   { bg: '#22c55e', hover: '#16a34a', text: '#fff', border: 'none' },
  ghost:     { bg: 'transparent', hover: '#f3f4f6', text: '#374151', border: 'none' },
};

const SIZE = {
  sm: { padding: '0.375rem 0.75rem', fontSize: '0.875rem', iconSize: 16 },
  md: { padding: '0.5rem 1rem',      fontSize: '1rem',     iconSize: 20 },
  lg: { padding: '0.75rem 1.5rem',   fontSize: '1.125rem', iconSize: 24 },
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  icon: Icon,
  style: extraStyle = {},
  ...props
}) => {
  const v = VARIANT[variant] || VARIANT.primary;
  const s = SIZE[size] || SIZE.md;
  const [hovered, setHovered] = React.useState(false);

  // Parse className for flex-col, h-24 etc. coming from Admin.jsx
  const isFlexCol = className.includes('flex-col');

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: isFlexCol ? 'column' : 'row',
        gap: '0.5rem',
        padding: isFlexCol ? '1rem' : s.padding,
        fontSize: s.fontSize,
        fontWeight: 500,
        borderRadius: '0.5rem',
        border: v.border || 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.2s',
        backgroundColor: hovered && !disabled ? v.hover : v.bg,
        color: v.text,
        height: isFlexCol ? '6rem' : undefined,
        width: isFlexCol ? '100%' : undefined,
        ...extraStyle,
      }}
      {...props}
    >
      {Icon && <Icon size={s.iconSize} />}
      {children}
    </button>
  );
};

export default Button;
