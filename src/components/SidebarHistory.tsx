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
        className={`fixed lg:static top-0 left-0 z-40 h-full w-72 md:w-80 bg-[#070B14] light:bg-[#F8FAFC] border-r border-white/10 light:border-[#E2E8F0] flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header */}
        <div className="p-4 space-y-3 border-b border-white/10 light:border-[#E2E8F0] bg-[#0B1F3A]/40 light:bg-[#FFFFFF]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#60A5FA] light:text-[#0F172A] font-bold text-sm tracking-tight">
              <Layers className="w-4 h-4 text-[#2563EB]" />
              <span className="text-sm font-bold uppercase tracking-wider">RESEARCH THREADS</span>
            </div>

            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white light:hover:text-black hover:bg-white/10 light:hover:bg-slate-100"
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
            className="w-full py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{newChatText}</span>
          </button>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400 light:text-[#64748B]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search chat history..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#111827] light:bg-[#FFFFFF] border border-white/10 light:border-[#CBD5E1] text-xs text-white light:text-[#0F172A] placeholder-gray-500 light:placeholder-[#64748B] focus:outline-none focus:border-[#2563EB]"
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
                    ? 'bg-[#123B73] text-[#60A5FA] light:bg-[#DBEAFE] light:text-[#1D4ED8] border border-[#2563EB]/40 light:border-[#93C5FD] font-bold'
                    : 'bg-white/5 light:bg-[#FFFFFF] text-gray-400 light:text-[#334155] border border-transparent light:border-[#E2E8F0] hover:text-white light:hover:text-[#0F172A]'
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
            <div className="text-center py-8 text-xs text-gray-500 light:text-[#64748B] font-mono">
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
                      ? 'bg-[#123B73] light:bg-[#EFF6FF] border-2 border-[#2563EB] text-white light:text-[#1E3A8A] shadow-[0_4px_15px_rgba(37,99,235,0.2)]'
                      : 'bg-[#111827]/60 light:bg-[#FFFFFF] border-white/5 light:border-[#E2E8F0] text-gray-300 light:text-[#0F172A] hover:bg-white/5 light:hover:bg-slate-50 shadow-[0_4px_12px_rgba(15,23,42,0.04)]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <MessageSquare
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isActive
                            ? 'text-[#60A5FA] light:text-[#2563EB]'
                            : 'text-gray-400 light:text-[#64748B]'
                        }`}
                      />
                      <h4 className="text-xs font-bold truncate text-white light:text-[#0F172A]">
                        {thread.title}
                      </h4>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteThread(thread.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-950 light:hover:bg-red-50 hover:text-red-400 light:hover:text-red-600 text-gray-400 light:text-[#64748B] transition-all"
                      title="Delete Thread"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[11px] text-gray-400 light:text-[#475569] line-clamp-1 mt-1 font-medium">
                    {thread.preview}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-gray-500 light:text-[#64748B]">
                    <span>{thread.createdAt}</span>
                    <span className="px-2 py-0.5 rounded-full font-bold bg-white/5 light:bg-[#DBEAFE] text-gray-300 light:text-[#1D4ED8] border border-transparent light:border-[#93C5FD]">
                      {thread.category}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 light:border-[#E2E8F0] bg-[#0B1F3A]/30 light:bg-[#FFFFFF] text-[11px] font-mono text-gray-400 light:text-[#64748B] flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-bold text-gray-300 light:text-[#0F172A]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Balochi Digital Index</span>
          </span>
          <span className="text-[10px] bg-[#2563EB]/20 light:bg-[#DBEAFE] text-[#60A5FA] light:text-[#1D4ED8] px-2 py-0.5 rounded-full font-bold border border-[#2563EB]/30 light:border-[#93C5FD]">
            25.4K Sources
          </span>
        </div>
      </aside>
    </>
  );
};
