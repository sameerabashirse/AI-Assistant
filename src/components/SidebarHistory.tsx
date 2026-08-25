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
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        className={`fixed lg:static top-0 left-0 z-40 h-full w-72 md:w-80 bg-[#071705]/95 border-r border-[#1AFF00]/20 flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header */}
        <div className="p-4 space-y-3 border-b border-[#1AFF00]/20 bg-[#0C3D06]/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#1AFF00] font-bold text-xs uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Research History</span>
            </div>

            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* New Thread Button */}
          <button
            onClick={() => {
              onNewThread();
              if (window.innerWidth < 1024) onClose();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-[#0C3D06] hover:bg-[#16e000] text-[#1AFF00] hover:text-black border border-[#1AFF00]/50 font-bold text-xs transition-all shadow-[0_0_20px_rgba(26,255,0,0.2)] flex items-center justify-center gap-2 group"
          >
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            <span>{newChatText}</span>
          </button>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter threads..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#1AFF00]"
            />
          </div>

          {/* Category Chips */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#1AFF00] text-black font-bold'
                    : 'bg-white/5 hover:bg-white/15 text-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Threads List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {filteredThreads.length === 0 ? (
            <div className="p-4 text-center text-xs text-gray-500">
              No threads found. Start a new research query!
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
                  className={`group relative p-3 rounded-xl cursor-pointer transition-all border ${
                    isActive
                      ? 'bg-[#0C3D06] border-[#1AFF00] text-white shadow-[0_0_15px_rgba(26,255,0,0.2)]'
                      : 'bg-black/20 hover:bg-white/5 border-transparent text-gray-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <MessageSquare className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#1AFF00]' : 'text-gray-400'}`} />
                      <h4 className="text-xs font-bold truncate leading-tight">
                        {thread.title}
                      </h4>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteThread(thread.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-400 transition-opacity"
                      title="Delete thread"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[11px] text-gray-400 line-clamp-1 mt-1 font-serif">
                    {thread.preview}
                  </p>

                  <div className="mt-2 flex items-center justify-between text-[10px] text-gray-500 font-mono">
                    <span className="px-1.5 py-0.5 rounded bg-white/5 text-[#1AFF00]/80">
                      {thread.category}
                    </span>
                    <span>{thread.createdAt}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Engine Footer */}
        <div className="p-3 border-t border-[#1AFF00]/20 bg-[#0C3D06]/40 text-xs">
          <div className="p-2.5 rounded-xl bg-black/40 border border-[#1AFF00]/20 flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#1AFF00]/10 text-[#1AFF00]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-white leading-tight">
                Balochi Digital Index v4.2
              </p>
              <p className="text-[10px] text-emerald-400 font-mono">
                14,200+ Manuscripts Indexed
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
