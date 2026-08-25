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
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-30 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 z-40 h-full w-72 md:w-80 bg-[#18181B]/95 border-r border-[#6366F1]/20 flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header */}
        <div className="p-4 space-y-3 border-b border-[#6366F1]/20 bg-[#1E1B4B]/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#A78BFA] font-bold text-xs uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Research Threads</span>
            </div>

            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
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
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#4F46E5] hover:to-[#7C3AED] text-white font-bold text-xs transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{newChatText}</span>
          </button>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search chat history..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#6366F1]"
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
                    ? 'bg-[#6366F1]/30 text-[#A78BFA] border border-[#6366F1]/50 font-bold'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Thread History Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {filteredThreads.length === 0 ? (
            <div className="text-center py-8 text-xs text-gray-500 font-mono">
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
                  className={`group relative p-3 rounded-xl cursor-pointer transition-all border ${
                    isActive
                      ? 'bg-[#1E1B4B]/80 border-[#6366F1]/50 text-white shadow-[0_0_15px_rgba(99,102,241,0.25)]'
                      : 'bg-black/20 border-white/5 text-gray-300 hover:bg-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <MessageSquare
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isActive ? 'text-[#A78BFA]' : 'text-gray-400'
                        }`}
                      />
                      <h4 className="text-xs font-bold truncate">{thread.title}</h4>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteThread(thread.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-950 hover:text-red-400 text-gray-400 transition-all"
                      title="Delete Thread"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[11px] text-gray-400 line-clamp-1 mt-1 font-medium">
                    {thread.preview}
                  </p>

                  <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-gray-500">
                    <span>{thread.createdAt}</span>
                    <span className="px-1.5 py-0.2 rounded bg-white/5 text-gray-300">
                      {thread.category}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#6366F1]/20 bg-[#1E1B4B]/20 text-[11px] font-mono text-gray-400 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#A78BFA]" />
            <span>Balochi Digital Index</span>
          </span>
          <span className="text-[10px] bg-[#6366F1]/20 text-[#A78BFA] px-2 py-0.5 rounded border border-[#6366F1]/30">
            25.4K Sources
          </span>
        </div>
      </aside>
    </>
  );
};
