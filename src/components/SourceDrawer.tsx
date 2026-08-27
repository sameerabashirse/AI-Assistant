'use client';

import React, { useState } from 'react';
import { X, BookOpen, ShieldCheck } from 'lucide-react';
import type { Citation, Language } from '../types';
import { MOCK_UI_STRINGS, MOCK_MANUSCRIPT_PREVIEWS } from '../data/mockData';

interface SourceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  citations: Citation[];
  language: Language;
  onOpenEvidence: (citation?: Citation) => void;
  activeCitationId?: string;
}

export const SourceDrawer: React.FC<SourceDrawerProps> = ({
  isOpen,
  onClose,
  citations,
  language,
  onOpenEvidence,
  activeCitationId,
}) => {
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(
    citations.length > 0 ? citations[0] : null
  );
  const [activeTab, setActiveTab] = useState<'citations' | 'manuscripts'>('citations');

  const title = MOCK_UI_STRINGS.sourcesPanelTitle[language];

  if (!isOpen) return null;

  return (
    <aside className="w-80 lg:w-96 shrink-0 h-full border-l border-white/10 bg-[#070B14]/95 backdrop-blur-xl flex flex-col justify-between z-20 transition-all duration-300 shadow-2xl">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#0B1F3A]/50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#2563EB]/20 text-[#60A5FA]">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white leading-none">{title}</h3>
            <span className="text-[10px] text-[#60A5FA] font-mono">
              {citations.length} Verified Entries
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          title="Close panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-3 flex gap-2 border-b border-white/10 text-xs">
        <button
          onClick={() => setActiveTab('citations')}
          className={`pb-2.5 px-3 font-bold transition-all border-b-2 ${
            activeTab === 'citations'
              ? 'border-[#2563EB] text-[#60A5FA]'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          Citations ({citations.length})
        </button>

        <button
          onClick={() => setActiveTab('manuscripts')}
          className={`pb-2.5 px-3 font-bold transition-all border-b-2 ${
            activeTab === 'manuscripts'
              ? 'border-[#2563EB] text-[#60A5FA]'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          Scanned Manuscripts ({MOCK_MANUSCRIPT_PREVIEWS.length})
        </button>
      </div>

      {/* Drawer Body Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'citations' ? (
          citations.length === 0 ? (
            <div className="text-center py-10 text-xs text-gray-500 font-mono">
              No active citations for this thread.
            </div>
          ) : (
            <div className="space-y-3">
              {citations.map((cit, idx) => (
                <div
                  key={cit.id}
                  onClick={() => setSelectedCitation(cit)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    selectedCitation?.id === cit.id || activeCitationId === cit.id
                      ? 'bg-[#123B73] border-[#2563EB] text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]'
                      : 'bg-[#111827] border-white/10 text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#2563EB]/20 text-[#60A5FA] border border-[#2563EB]/30">
                      Citation [{idx + 1}]
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#60A5FA]">
                      {Math.round(cit.relevanceScore * 100)}% Match
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white leading-snug">{cit.bookTitle}</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">Author: {cit.author}</p>
                  <p className="text-[10px] font-mono text-gray-500 mt-1">
                    {cit.edition} • Page {cit.pageNumber}
                  </p>

                  <div className="mt-2.5 p-2 rounded-lg bg-black/40 border border-white/5 text-[11px] text-blue-200 italic font-serif leading-relaxed">
                    "{cit.originalQuote}"
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="space-y-3">
            {MOCK_MANUSCRIPT_PREVIEWS.map((ms, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#111827] border border-white/10 space-y-2 hover:border-[#2563EB]/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#2563EB]/20 text-[#60A5FA] border border-[#2563EB]/30">
                    {ms.badge}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">{ms.pages}</span>
                </div>

                <h4 className="text-xs font-bold text-white">{ms.title}</h4>
                <p className="text-[11px] text-gray-400 font-mono">Collector / Author: {ms.author}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Action Footer */}
      <div className="p-3 border-t border-white/10 bg-[#0B1F3A]/30 space-y-2">
        <button
          onClick={() => onOpenEvidence(selectedCitation || undefined)}
          className="w-full py-2.5 px-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Audit Evidence Trail</span>
        </button>
      </div>
    </aside>
  );
};
