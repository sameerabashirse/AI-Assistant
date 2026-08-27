'use client';

import React, { useState } from 'react';
import { Plus, MessageSquare, Trash2, Search, Layers, ChevronLeft, ShieldCheck } from 'lucide-react';
import type { Thread, Language } from '../types';
import { MOCK_UI_STRINGS } from '../data/mockData';

interface SidebarHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  threads: Thread[];
  activeThreadId: string | null;
  onSelectThread: (threadId: string) => void;
  onNewThread: () => void;
  onDeleteThread: (threadId: string) => void;
  language: Language;
}

export const SidebarHistory: React.FC<SidebarHistoryProps> = ({
  isOpen,
  onClose,
  threads,
  activeThreadId,
  onSelectThread,
  onNewThread,
  onDeleteThread,
  language,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const newChatText = MOCK_UI_STRINGS.newChat[language];
  const categories = ['All', 'Language', 'Literature', 'History', 'Culture'];

  const filteredThreads = threads.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.preview.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || t.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 lg:hidden"
        />
      )}

      <aside
        className={`surface fixed lg:static top-0 left-0 z-40 h-full w-72 md:w-80 border-r flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header */}
        <div className="p-4 space-y-3 border-b border-[var(--theme-border)] bg-[var(--theme-card-elevated)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[var(--theme-text-main)] font-bold text-sm tracking-tight">
              <Layers className="w-4 h-4 text-[var(--accent-strong-text)]" />
              <span className="text-sm font-bold uppercase tracking-wider">RESEARCH THREADS</span>
            </div>

            <button
              onClick={onClose}
              className="lg:hidden btn-soft p-1.5 rounded-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* New Chat Button */}
          <button
            onClick={() => {
              onNewThread();
              if (window.innerWidth < 1024) onClose();
            }}
            className="btn-primary w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{newChatText}</span>
          </button>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[var(--theme-text-muted)]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search chat history..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[var(--theme-card)] border border-[var(--theme-border)] text-xs text-[var(--theme-text-main)] placeholder:text-[var(--theme-text-muted)] focus:outline-none focus:border-[var(--accent)]"
            />
          </div>

          {/* Category Pill Filters */}
          <div className="flex items-center gap-1 overflow-x-auto pt-1 pb-0.5 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'accent-pill font-bold'
                    : 'btn-soft'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Thread History Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filteredThreads.length === 0 ? (
            <div className="text-center py-8 text-xs text-[var(--theme-text-muted)] font-mono">
              No matching research threads found.
            </div>
          ) : (
            filteredThreads.map((thread) => {
              const isActive = thread.id === activeThreadId;
              return (
                <div
                  key={thread.id}
                  onClick={() => {
                    onSelectThread(thread.id);
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className={`group relative p-3.5 rounded-2xl cursor-pointer transition-all border ${
                    isActive
                      ? 'accent-pill border-[var(--accent-border)] text-[var(--theme-text-main)]'
                      : 'surface-muted text-[var(--theme-text-secondary)] hover:border-[var(--accent-border)]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <MessageSquare
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isActive
                            ? 'text-[var(--accent-strong-text)]'
                            : 'text-[var(--theme-text-muted)]'
                        }`}
                      />
                      <h4 className="text-xs font-bold truncate text-[var(--theme-text-main)]">
                        {thread.title}
                      </h4>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteThread(thread.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/15 hover:text-red-500 text-[var(--theme-text-muted)] transition-all"
                      title="Delete Thread"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[11px] text-[var(--theme-text-muted)] line-clamp-1 mt-1 font-medium">
                    {thread.preview}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-[var(--theme-text-muted)]">
                    <span>{thread.createdAt}</span>
                    <span className="accent-pill px-2 py-0.5 rounded-full font-bold">
                      {thread.category}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[var(--theme-border)] bg-[var(--theme-card-elevated)] text-[11px] font-mono text-[var(--theme-text-muted)] flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-bold text-[var(--theme-text-main)]">
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-strong-text)]" />
            <span>Balochi Digital Index</span>
          </span>
          <span className="accent-pill text-[10px] px-2 py-0.5 rounded-full font-bold">
            25.4K Sources
          </span>
        </div>
      </aside>
    </>
  );
};
