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
      <div className="surface p-6 rounded-2xl border border-[var(--theme-border)] space-y-4 shadow-md">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--theme-border)]">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[var(--accent-strong-text)]" />
            <h3 className="text-sm font-bold text-[var(--theme-text-main)] uppercase tracking-wider">
              Monthly Verified Query Throughput (2026)
            </h3>
          </div>
          <span className="text-xs font-mono text-[var(--accent-strong-text)] font-bold">Total: 850,000 Queries</span>
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
                className="w-full rounded-t-lg bg-[var(--accent)] group-hover:bg-[var(--accent-hover)] transition-all relative"
              >
                <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded surface border border-[var(--theme-border)] text-[10px] font-mono text-[var(--accent-strong-text)] pointer-events-none transition-opacity shadow-sm">
                  {bar.val * 8.5}K
                </div>
              </div>
              <span className="text-[11px] font-mono text-[var(--theme-text-muted)]">{bar.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Search Ranking List */}
      <div className="surface p-6 rounded-2xl border border-[var(--theme-border)] space-y-4 shadow-md">
        <h3 className="text-sm font-bold text-[var(--theme-text-main)] uppercase tracking-wider flex items-center gap-2 border-b border-[var(--theme-border)] pb-3">
          <Search className="w-4 h-4 text-[var(--accent-strong-text)]" />
          Top 5 Popular Knowledge Queries
        </h3>

        <div className="space-y-3">
          {popularSearches.map((item, idx) => (
            <div
              key={idx}
              className="surface-muted p-3.5 rounded-xl border border-[var(--theme-border-subtle)] flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg surface-elevated border border-[var(--accent-border)] flex items-center justify-center font-mono font-bold text-[var(--accent-strong-text)]">
                  #{idx + 1}
                </span>
                <span className="font-bold text-[var(--theme-text-main)]">{item.query}</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-mono text-[var(--theme-text-muted)]">{item.count}</span>
                <span className="accent-pill px-2 py-0.5 rounded text-[10px] font-mono font-bold">
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
