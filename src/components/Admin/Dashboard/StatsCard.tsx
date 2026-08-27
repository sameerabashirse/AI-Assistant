import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  growth?: number;
  icon: React.ReactNode;
  subtitle?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  growth,
  icon,
  subtitle,
}) => {
  const isPositive = growth !== undefined ? growth >= 0 : true;

  return (
    <div className="surface p-5 rounded-2xl border border-[var(--theme-border)] hover:border-[var(--accent-border)] transition-all duration-300 shadow-md hover:-translate-y-0.5 group cursor-pointer">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[var(--theme-text-muted)] uppercase tracking-wider">
          {title}
        </span>
        <div className="p-2.5 rounded-xl surface-muted text-[var(--accent-strong-text)] group-hover:scale-105 transition-transform">
          {icon}
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <h3 className="text-2xl md:text-3xl font-black text-[var(--theme-text-main)] tracking-tight">
          {value}
        </h3>

        {growth !== undefined && (
          <span
            className={`inline-flex items-center gap-1 text-xs font-mono font-bold px-2.5 py-1 rounded-full ${
              isPositive
                ? 'bg-[var(--success-soft)] text-[var(--success-text)] border border-[var(--success-text)]/30'
                : 'bg-[var(--error-soft)] text-[var(--error-text)] border border-[var(--error-text)]/30'
            }`}
          >
            {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {isPositive ? `+${growth}%` : `${growth}%`}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-2 text-xs text-[var(--theme-text-muted)] font-medium flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          <span>{subtitle}</span>
        </p>
      )}
    </div>
  );
};
