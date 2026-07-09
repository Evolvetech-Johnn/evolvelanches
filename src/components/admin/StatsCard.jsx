import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ title, value, icon: Icon, trend, trendValue, onClick, variant = 'default' }) => {
  const isPositive = trend === 'up';
  
  const variantClasses = {
    default: 'bg-white border-gray-200',
    primary: 'bg-gradient-to-br from-primary-500 to-primary-600 border-primary-600 text-white',
    success: 'bg-gradient-to-br from-green-500 to-green-600 border-green-600 text-white',
    warning: 'bg-gradient-to-br from-yellow-500 to-yellow-600 border-yellow-600 text-white',
    danger: 'bg-gradient-to-br from-red-500 to-red-600 border-red-600 text-white',
  };

  const iconBgClasses = {
    default: 'bg-gray-100',
    primary: 'bg-white/20',
    success: 'bg-white/20',
    warning: 'bg-white/20',
    danger: 'bg-white/20',
  };

  const textClasses = {
    default: 'text-gray-900',
    primary: 'text-white',
    success: 'text-white',
    warning: 'text-white',
    danger: 'text-white',
  };

  const subtextClasses = {
    default: 'text-gray-600',
    primary: 'text-white/90',
    success: 'text-white/90',
    warning: 'text-white/90',
    danger: 'text-white/90',
  };

  return (
    <div
      onClick={onClick}
      className={`p-6 rounded-xl border ${variantClasses[variant]} ${
        onClick ? 'cursor-pointer hover:shadow-lg' : ''
      } transition-all duration-200`}
    >
      <div className="flex items-start justify-between">
        {/* Left Section */}
        <div className="flex-1">
          <p className={`text-sm font-medium ${subtextClasses[variant]} mb-2`}>
            {title}
          </p>
          <h3 className={`text-3xl font-bold ${textClasses[variant]} mb-3`}>
            {value}
          </h3>
          
          {/* Trend */}
          {trendValue && (
            <div className="flex items-center gap-1">
              {isPositive ? (
                <TrendingUp size={16} className="text-green-500" />
              ) : (
                <TrendingDown size={16} className="text-red-500" />
              )}
              <span className={`text-sm font-medium ${
                variant === 'default' 
                  ? (isPositive ? 'text-green-600' : 'text-red-600')
                  : 'text-white/90'
              }`}>
                {trendValue}
              </span>
              <span className={`text-xs ${subtextClasses[variant]}`}>
                vs mês anterior
              </span>
            </div>
          )}
        </div>

        {/* Icon */}
        {Icon && (
          <div className={`p-3 rounded-lg ${iconBgClasses[variant]}`}>
            <Icon size={24} className={variant === 'default' ? 'text-primary-500' : 'text-white'} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
