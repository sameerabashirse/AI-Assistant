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
    <div className="p-5 rounded-2xl bg-[#111827] light:bg-[#FFFFFF] border border-white/10 light:border-[#E2E8F0] hover:border-[#2563EB]/40 light:hover:border-[#2563EB] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] light:shadow-[0_8px_30px_rgba(15,23,42,0.06)] hover:-translate-y-1 group cursor-pointer">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-gray-400 light:text-[#475569] uppercase tracking-wider">
          {title}
        </span>
        <div className="p-2.5 rounded-xl bg-[#0B1F3A] light:bg-[#EFF6FF] border border-[#2563EB]/40 light:border-[#BFDBFE] text-[#60A5FA] light:text-[#1D4ED8] shadow-[0_0_12px_rgba(37,99,235,0.2)] group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <h3 className="text-2xl md:text-3xl font-black text-white light:text-[#111827] tracking-tight">
          {value}
        </h3>

        {growth !== undefined && (
          <span
            className={`inline-flex items-center gap-1 text-xs font-mono font-bold px-2.5 py-1 rounded-full ${
              isPositive
                ? 'bg-[#2563EB]/20 light:bg-emerald-50 text-[#60A5FA] light:text-emerald-700 border border-[#2563EB]/40 light:border-emerald-200'
                : 'bg-red-500/15 light:bg-rose-50 text-red-400 light:text-rose-700 border border-red-500/30 light:border-rose-200'
            }`}
          >
            {isPositive ? <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> : <TrendingDown className="w-3.5 h-3.5 text-rose-500" />}
            {isPositive ? `+${growth}%` : `${growth}%`}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-2 text-xs text-gray-400 light:text-[#6B7280] font-medium flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
          <span>{subtitle}</span>
        </p>
      )}
    </div>
  );
};
