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
      <div className="surface p-4 rounded-2xl border border-[var(--theme-border)] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-[var(--theme-text-muted)]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search source title or author..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[var(--theme-card)] border border-[var(--theme-border)] text-xs text-[var(--theme-text-main)] placeholder:text-[var(--theme-text-muted)] focus:outline-none focus:border-[var(--accent)]"
            />
          </div>

          <div className="flex gap-1 overflow-x-auto">
            {['All', 'Book', 'Dictionary', 'Research Paper', 'Website'].map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  typeFilter === t
                    ? 'accent-pill font-bold'
                    : 'btn-soft'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <button className="btn-primary w-full md:w-auto py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Add New Source Entry</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSources.map((src) => (
          <div
            key={src.id}
            className="surface p-5 rounded-2xl border border-[var(--theme-border)] hover:border-[var(--accent-border)] transition-all flex flex-col justify-between space-y-4 shadow-md group"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="accent-pill px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold">
                  {src.type}
                </span>

                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    src.verificationStatus === 'Verified'
                      ? 'bg-[var(--success-soft)] text-[var(--success-text)] border border-[var(--success-text)]/30'
                      : 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
                  }`}
                >
                  <ShieldCheck className="w-3 h-3" />
                  {src.verificationStatus}
                </span>
              </div>

              <h3 className="text-sm font-bold text-[var(--theme-text-main)] group-hover:text-[var(--accent-strong-text)] transition-colors leading-snug">
                {src.title}
              </h3>
              <p className="text-xs text-[var(--theme-text-muted)] mt-1 font-medium">By {src.author} ({src.year})</p>
            </div>

            <div className="pt-3 border-t border-[var(--theme-border-subtle)] flex items-center justify-between text-xs">
              <span className="text-[11px] font-mono text-[var(--theme-text-muted)]">
                {src.pages} Indexed Pages
              </span>

              <div className="flex items-center gap-1">
                {src.verificationStatus !== 'Verified' && (
                  <button
                    onClick={() => handleVerifySource(src.id)}
                    className="btn-primary px-2.5 py-1 rounded-lg font-bold text-[10px] cursor-pointer"
                  >
                    Verify
                  </button>
                )}
                <button
                  onClick={() => handleDeleteSource(src.id)}
                  className="btn-soft p-1.5 rounded-lg text-[var(--theme-text-muted)] hover:text-red-500 cursor-pointer"
                  title="Remove Source"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
