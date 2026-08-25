import React, { useState } from 'react';
import { Search, Trash2, Plus, ShieldCheck } from 'lucide-react';
import type { AdminSource } from '../../../types/admin';
import { MOCK_ADMIN_SOURCES } from '../../../data/adminMockData';

export const SourceManagement: React.FC = () => {
  const [sources, setSources] = useState<AdminSource[]>(MOCK_ADMIN_SOURCES);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const filteredSources = sources.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || s.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleVerifySource = (id: string) => {
    setSources((prev) =>
      prev.map((s) => (s.id === id ? { ...s, verificationStatus: 'Verified' } : s))
    );
  };

  const handleDeleteSource = (id: string) => {
    setSources((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="p-4 rounded-2xl bg-[#111615] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search source title or author..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#1AFF00]"
            />
          </div>

          <div className="flex gap-1 overflow-x-auto">
            {['All', 'Book', 'Dictionary', 'Research Paper', 'Website'].map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  typeFilter === t
                    ? 'bg-[#0C3D06] text-[#1AFF00] border border-[#1AFF00]/40'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <button className="w-full md:w-auto py-2.5 px-4 rounded-xl bg-[#0C3D06] hover:bg-[#16e000] text-[#1AFF00] hover:text-black border border-[#1AFF00]/40 font-bold text-xs transition-all shadow-[0_0_15px_rgba(26,255,0,0.2)] flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          <span>Add New Source Entry</span>
        </button>
      </div>

      {/* Sources Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSources.map((src) => (
          <div
            key={src.id}
            className="p-5 rounded-2xl bg-[#111615] border border-white/10 hover:border-[#1AFF00]/40 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#0C3D06] text-[#1AFF00] border border-[#1AFF00]/30">
                  {src.type}
                </span>

                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    src.verificationStatus === 'Verified'
                      ? 'bg-[#1AFF00]/15 text-[#1AFF00] border border-[#1AFF00]/30'
                      : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  <ShieldCheck className="w-3 h-3 text-[#1AFF00]" />
                  {src.verificationStatus}
                </span>
              </div>

              <h4 className="text-base font-bold text-white group-hover:text-[#1AFF00] transition-colors leading-snug">
                {src.title}
              </h4>
              <p className="text-xs text-gray-400 mt-1 font-medium">
                Author: {src.author} {src.year ? `(${src.year})` : ''}
              </p>

              <div className="mt-3 p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1 text-xs font-mono text-gray-300">
                <p>• Language: {src.language}</p>
                <p>• Dialect: {src.dialect}</p>
                <p>• Indexed Pages: {src.pages} pages</p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-[10px] text-gray-500 font-mono">ID: {src.id}</span>

              <div className="flex items-center gap-2">
                {src.verificationStatus !== 'Verified' && (
                  <button
                    onClick={() => handleVerifySource(src.id)}
                    className="px-3 py-1.5 rounded-lg bg-[#0C3D06] hover:bg-[#16e000] text-[#1AFF00] hover:text-black font-bold text-[11px] border border-[#1AFF00]/30 transition-all"
                  >
                    Verify Source
                  </button>
                )}
                <button
                  onClick={() => handleDeleteSource(src.id)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-red-950 text-gray-400 hover:text-red-400 transition-colors"
                  title="Remove Source"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
