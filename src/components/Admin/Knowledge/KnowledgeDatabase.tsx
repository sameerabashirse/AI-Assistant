import React, { useState } from 'react';
import { Database, Plus, Search, Filter, CheckCircle2, AlertCircle, X } from 'lucide-react';
import type { KnowledgeWord } from '../../../types/admin';
import { MOCK_KNOWLEDGE_WORDS } from '../../../data/adminMockData';

export const KnowledgeDatabase: React.FC = () => {
  const [words, setWords] = useState<KnowledgeWord[]>(MOCK_KNOWLEDGE_WORDS);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialectFilter, setDialectFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newWord, setNewWord] = useState('');
  const [newScript, setNewScript] = useState('');
  const [newMeaning, setNewMeaning] = useState('');
  const [newDialect, setNewDialect] = useState<KnowledgeWord['dialect']>('Makrani (Coastal)');
  const [newSource, setNewSource] = useState('');

  const filteredWords = words.filter((w) => {
    const matchesSearch =
      w.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.balochiScript.includes(searchTerm);
    const matchesDialect = dialectFilter === 'All' || w.dialect.includes(dialectFilter);
    return matchesSearch && matchesDialect;
  });

  const handleAddWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord || !newMeaning) return;

    const wordEntry: KnowledgeWord = {
      id: `word-${Date.now()}`,
      word: newWord,
      balochiScript: newScript || newWord,
      meaning: newMeaning,
      dialect: newDialect,
      source: newSource || 'Manual Admin Entry',
      status: 'Verified',
      confidence: 99.0,
      addedBy: 'Super Admin',
    };

    setWords([wordEntry, ...words]);
    setNewWord('');
    setNewScript('');
    setNewMeaning('');
    setNewSource('');
    setIsAddModalOpen(false);
  };

  const handleVerifyWord = (id: string) => {
    setWords((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: 'Verified', confidence: 98.5 } : w))
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="surface p-4 rounded-xl border border-[var(--theme-border)] flex items-center justify-between">
          <div>
            <p className="text-xs text-[var(--theme-text-muted)] font-semibold">Total Verified Words</p>
            <p className="text-2xl font-black text-[var(--accent-strong-text)]">{words.length}</p>
          </div>
          <div className="p-2.5 rounded-xl surface-muted text-[var(--accent-strong-text)]">
            <Database className="w-5 h-5" />
          </div>
        </div>

        <div className="surface p-4 rounded-xl border border-[var(--theme-border)] flex items-center justify-between">
          <div>
            <p className="text-xs text-[var(--theme-text-muted)] font-semibold">Pending Verification</p>
            <p className="text-2xl font-black text-amber-500">
              {words.filter((w) => w.status === 'Pending').length}
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="surface p-4 rounded-xl border border-[var(--theme-border)] flex items-center justify-between">
          <div>
            <p className="text-xs text-[var(--theme-text-muted)] font-semibold">Dialects Cataloged</p>
            <p className="text-2xl font-black text-[var(--theme-text-main)]">4 Dialects</p>
          </div>
          <div className="p-2.5 rounded-xl surface-muted text-[var(--theme-text-secondary)]">
            <Filter className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="surface p-4 rounded-2xl border border-[var(--theme-border)] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-[var(--theme-text-muted)]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search words, script or meanings..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[var(--theme-card)] border border-[var(--theme-border)] text-xs text-[var(--theme-text-main)] placeholder:text-[var(--theme-text-muted)] focus:outline-none focus:border-[var(--accent)]"
            />
          </div>

          <div className="flex gap-1 overflow-x-auto">
            {['All', 'Makrani', 'Marri', 'Rakhshani', 'Sarawani'].map((d) => (
              <button
                key={d}
                onClick={() => setDialectFilter(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  dialectFilter === d
                    ? 'accent-pill font-bold'
                    : 'btn-soft'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary w-full md:w-auto py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Vocabulary Item</span>
        </button>
      </div>

      <div className="surface rounded-2xl border border-[var(--theme-border)] overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[var(--theme-border)] text-[var(--theme-text-muted)] font-mono uppercase text-[10px] bg-[var(--theme-muted)]">
                <th className="py-3 px-4">Balochi Word</th>
                <th className="py-3 px-4">Script</th>
                <th className="py-3 px-4">Dictionary Meaning</th>
                <th className="py-3 px-4">Dialect</th>
                <th className="py-3 px-4">Source Reference</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4 text-right">Status / Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--theme-border-subtle)] text-[var(--theme-text-secondary)]">
              {filteredWords.map((w) => (
                <tr key={w.id} className="hover:bg-[var(--accent-soft)] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[var(--theme-text-main)] text-sm">{w.word}</td>
                  <td className="py-3.5 px-4 font-serif text-[var(--accent-strong-text)] text-base">{w.balochiScript}</td>
                  <td className="py-3.5 px-4 max-w-xs leading-snug">{w.meaning}</td>
                  <td className="py-3.5 px-4">
                    <span className="accent-pill px-2 py-0.5 rounded text-[10px] font-mono font-semibold">
                      {w.dialect}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[var(--theme-text-muted)]">{w.source}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[var(--accent-strong-text)]">{w.confidence}%</td>
                  <td className="py-3.5 px-4 text-right">
                    {w.status === 'Verified' ? (
                      <span className="accent-pill inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    ) : (
                      <button
                        onClick={() => handleVerifyWord(w.id)}
                        className="btn-primary px-2.5 py-1 rounded-lg font-bold text-[10px] transition-colors cursor-pointer"
                      >
                        Approve Word
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleAddWord}
            className="w-full max-w-md bg-[#111827] border border-[#2563EB]/40 rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-[#60A5FA]" />
                <h3 className="text-base font-bold text-white">Add Balochi Word Record</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Roman Balochi Word</label>
                <input
                  type="text"
                  required
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  placeholder="e.g. Zahirok"
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Balochi Script (زهيروک)</label>
                <input
                  type="text"
                  value={newScript}
                  onChange={(e) => setNewScript(e.target.value)}
                  placeholder="زهيروک"
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white font-serif text-sm focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Dictionary Meaning</label>
                <textarea
                  rows={2}
                  required
                  value={newMeaning}
                  onChange={(e) => setNewMeaning(e.target.value)}
                  placeholder="Meaning and etymology..."
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#2563EB] resize-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Dialect Category</label>
                <select
                  value={newDialect}
                  onChange={(e) => setNewDialect(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#2563EB]"
                >
                  <option value="Makrani (Coastal)">Makrani (Coastal)</option>
                  <option value="Marri (Eastern)">Marri (Eastern)</option>
                  <option value="Rakhshani">Rakhshani</option>
                  <option value="Sarawani">Sarawani</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Book / Source Reference</label>
                <input
                  type="text"
                  value={newSource}
                  onChange={(e) => setNewSource(e.target.value)}
                  placeholder="Balochi Dictionary Page 124"
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-5 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-xs transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]"
              >
                Save Word Record
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
