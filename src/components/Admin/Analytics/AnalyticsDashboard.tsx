import React from 'react';
import { BarChart3, Search } from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const popularSearches = [
    { query: 'Meaning of Zahirok', count: '45,210 queries', category: 'Dictionary' },
    { query: 'Makrani vs Marri Dialect Grammar', count: '32,180 queries', category: 'Linguistics' },
    { query: 'Mir Chakar Rind History & Epics', count: '28,900 queries', category: 'History' },
    { query: 'Balochi Proverbs on Hospitality', count: '21,450 queries', category: 'Folklore' },
    { query: 'Mast Tawkali Poetry References', count: '18,320 queries', category: 'Literature' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Chart Metric Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#111615] border border-white/10 space-y-1">
          <p className="text-xs text-gray-400 font-semibold">Daily Active Queries</p>
          <p className="text-2xl font-black text-[#1AFF00]">38,420</p>
          <p className="text-[10px] text-emerald-400 font-mono">+14.2% peak throughput</p>
        </div>

        <div className="p-4 rounded-xl bg-[#111615] border border-white/10 space-y-1">
          <p className="text-xs text-gray-400 font-semibold">Avg Vector Search Latency</p>
          <p className="text-2xl font-black text-white">320 ms</p>
          <p className="text-[10px] text-emerald-400 font-mono">Fast HNSW cosine match</p>
        </div>

        <div className="p-4 rounded-xl bg-[#111615] border border-white/10 space-y-1">
          <p className="text-xs text-gray-400 font-semibold">Verified Answer Consensus</p>
          <p className="text-2xl font-black text-[#1AFF00]">96.8%</p>
          <p className="text-[10px] text-emerald-400 font-mono">Across 14+ sources</p>
        </div>

        <div className="p-[#111615] p-4 rounded-xl bg-[#111615] border border-white/10 space-y-1">
          <p className="text-xs text-gray-400 font-semibold">OCR Processing Rate</p>
          <p className="text-2xl font-black text-white">140 pgs/min</p>
          <p className="text-[10px] text-gray-400 font-mono">Parallel GPU pipeline</p>
        </div>
      </div>

      {/* Visual Analytics Chart Containers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Bar Chart Mockup: Query Throughput */}
        <div className="p-5 rounded-2xl bg-[#111615] border border-white/10 space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#1AFF00]" />
              Monthly Query Volume & Throughput
            </h3>
            <span className="text-xs font-mono text-gray-400">August 2026</span>
          </div>

          <div className="h-48 flex items-end gap-3 pt-6 px-2">
            {[45, 60, 52, 78, 90, 84, 95, 110, 105, 125, 140, 135].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div
                  className="w-full bg-[#0C3D06] group-hover:bg-[#1AFF00] rounded-t-md transition-all duration-300 relative"
                  style={{ height: `${height}%` }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-[#1AFF00] px-2 py-0.5 rounded text-[10px] font-mono font-bold whitespace-nowrap border border-[#1AFF00]/40 z-10 transition-opacity">
                    {height * 500} queries
                  </div>
                </div>
                <span className="text-[9px] text-gray-500 font-mono">Day {i * 2 + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Searches Ranking */}
        <div className="p-5 rounded-2xl bg-[#111615] border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Search className="w-4 h-4 text-[#1AFF00]" />
              Popular Search Queries
            </h3>
          </div>

          <div className="space-y-3">
            {popularSearches.map((item, index) => (
              <div key={index} className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white leading-tight">{item.query}</p>
                  <span className="text-[10px] text-gray-400 font-mono">{item.category}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#1AFF00]/10 text-[#1AFF00] text-[10px] font-mono font-bold">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
