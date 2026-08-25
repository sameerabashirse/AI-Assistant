import React from 'react';
import { BarChart3, Search } from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const popularSearches = [
    { query: 'Meaning of Zahirok in Makrani', count: '42,500 queries', trend: '+18%' },
    { query: 'Sher Muhammad Marri Books List', count: '28,100 queries', trend: '+12%' },
    { query: 'Balochi Grammar Verb Conjugation', count: '21,400 queries', trend: '+24%' },
    { query: 'Mir Chakar Rind Historical Manuscripts', count: '19,800 queries', trend: '+8%' },
    { query: 'Coast Makrani vs Marri Dialects', count: '14,200 queries', trend: '+35%' },
  ];

  return (
    <div className="space-y-6">
      {/* Monthly Query Volume Bar Chart */}
      <div className="p-6 rounded-2xl bg-[#111827] border border-white/10 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#60A5FA]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Monthly Verified Query Throughput (2026)
            </h3>
          </div>
          <span className="text-xs font-mono text-[#60A5FA]">Total: 850,000 Queries</span>
        </div>

        <div className="h-48 flex items-end justify-between gap-3 pt-6 px-4">
          {[
            { month: 'Jan', val: 45 },
            { month: 'Feb', val: 52 },
            { month: 'Mar', val: 68 },
            { month: 'Apr', val: 74 },
            { month: 'May', val: 82 },
            { month: 'Jun', val: 96 },
            { month: 'Jul', val: 88 },
            { month: 'Aug', val: 100 },
          ].map((bar) => (
            <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
              <div
                style={{ height: `${bar.val}%` }}
                className="w-full rounded-t-lg bg-gradient-to-t from-[#0B1F3A] to-[#2563EB] group-hover:to-[#60A5FA] transition-all relative"
              >
                <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black border border-white/20 text-[10px] font-mono text-[#60A5FA] pointer-events-none transition-opacity">
                  {bar.val * 8.5}K
                </div>
              </div>
              <span className="text-[11px] font-mono text-gray-400">{bar.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Search Ranking List */}
      <div className="p-6 rounded-2xl bg-[#111827] border border-white/10 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/10 pb-3">
          <Search className="w-4 h-4 text-[#60A5FA]" />
          Top 5 Popular Knowledge Queries
        </h3>

        <div className="space-y-3">
          {popularSearches.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-[#0B1F3A] border border-[#2563EB]/40 flex items-center justify-center font-mono font-bold text-[#60A5FA]">
                  #{idx + 1}
                </span>
                <span className="font-bold text-white">{item.query}</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-mono text-gray-400">{item.count}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#2563EB]/20 text-[#60A5FA] border border-[#2563EB]/40">
                  {item.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
