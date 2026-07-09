import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false,
  type = 'button',
  className = '',
  icon: Icon,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 gap-2';
  
  const variantClasses = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white disabled:bg-gray-300',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 disabled:bg-gray-100',
    outline: 'border-2 border-primary-500 hover:bg-primary-50 text-primary-500 disabled:border-gray-300',
    danger: 'bg-red-500 hover:bg-red-600 text-white disabled:bg-gray-300',
    success: 'bg-green-500 hover:bg-green-600 text-white disabled:bg-gray-300',
    ghost: 'hover:bg-gray-100 text-gray-700 disabled:text-gray-400',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer active:scale-95'
      } ${className}`}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />}
      {children}
    </button>
  );
};

export default Button;
