import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const VARIANT_STYLES = {
  default: {
    card: { backgroundColor: '#fff', borderColor: '#e5e7eb', color: '#111827' },
    icon: { backgroundColor: '#f3f4f6', color: '#F05A28' },
    title: { color: '#6b7280' },
    value: { color: '#111827' },
    trend: { positive: '#16a34a', negative: '#dc2626' },
  },
  primary: {
    card: { background: 'linear-gradient(135deg,#F05A28,#d94e20)', borderColor: '#d94e20', color: '#fff' },
    icon: { backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff' },
    title: { color: 'rgba(255,255,255,0.9)' },
    value: { color: '#fff' },
    trend: { positive: 'rgba(255,255,255,0.9)', negative: 'rgba(255,255,255,0.9)' },
  },
  success: {
    card: { background: 'linear-gradient(135deg,#22c55e,#16a34a)', borderColor: '#16a34a', color: '#fff' },
    icon: { backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff' },
    title: { color: 'rgba(255,255,255,0.9)' },
    value: { color: '#fff' },
    trend: { positive: 'rgba(255,255,255,0.9)', negative: 'rgba(255,255,255,0.9)' },
  },
  warning: {
    card: { background: 'linear-gradient(135deg,#eab308,#ca8a04)', borderColor: '#ca8a04', color: '#fff' },
    icon: { backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff' },
    title: { color: 'rgba(255,255,255,0.9)' },
    value: { color: '#fff' },
    trend: { positive: 'rgba(255,255,255,0.9)', negative: 'rgba(255,255,255,0.9)' },
  },
  danger: {
    card: { background: 'linear-gradient(135deg,#ef4444,#dc2626)', borderColor: '#dc2626', color: '#fff' },
    icon: { backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff' },
    title: { color: 'rgba(255,255,255,0.9)' },
    value: { color: '#fff' },
    trend: { positive: 'rgba(255,255,255,0.9)', negative: 'rgba(255,255,255,0.9)' },
  },
};

const StatsCard = ({ title, value, icon: Icon, trend, trendValue, onClick, variant = 'default' }) => {
  const isPositive = trend === 'up';
  const V = VARIANT_STYLES[variant] || VARIANT_STYLES.default;

  return (
    <div
      onClick={onClick}
      style={{
        padding: '1.5rem',
        borderRadius: '0.75rem',
        border: '1px solid',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s',
        ...V.card,
      }}
      onMouseEnter={e => { if (onClick) e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.15)'; }}
      onMouseLeave={e => { if (onClick) e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        {/* Left */}
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', ...V.title }}>
            {title}
          </p>
          <h3 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '0.75rem', ...V.value }}>
            {value}
          </h3>
          {trendValue && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              {isPositive
                ? <TrendingUp size={16} style={{ color: V.trend.positive }} />
                : <TrendingDown size={16} style={{ color: V.trend.negative }} />}
              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: isPositive ? V.trend.positive : V.trend.negative }}>
                {trendValue}
              </span>
              <span style={{ fontSize: '0.75rem', color: V.title.color }}>vs mês anterior</span>
            </div>
          )}
        </div>

        {/* Icon */}
        {Icon && (
          <div style={{
            padding: '0.75rem',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            ...V.icon,
          }}>
            <Icon size={24} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
