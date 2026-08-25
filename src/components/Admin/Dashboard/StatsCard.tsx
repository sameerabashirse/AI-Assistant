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
    <div className="p-5 rounded-2xl bg-[#111827] border border-white/10 hover:border-[#2563EB]/40 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] group">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {title}
        </span>
        <div className="p-2.5 rounded-xl bg-[#0B1F3A] border border-[#2563EB]/40 text-[#60A5FA] shadow-[0_0_12px_rgba(37,99,235,0.2)] group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
          {value}
        </h3>

        {growth !== undefined && (
          <span
            className={`inline-flex items-center gap-1 text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
              isPositive
                ? 'bg-[#2563EB]/20 text-[#60A5FA] border border-[#2563EB]/40'
                : 'bg-red-500/15 text-red-400 border border-red-500/30'
            }`}
          >
            {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {isPositive ? `+${growth}%` : `${growth}%`}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-2 text-xs text-gray-400 font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
};
