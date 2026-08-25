import React, { useState } from 'react';
import { X, BookOpen, ExternalLink, Sparkles, FileText } from 'lucide-react';
import type { Citation, Language } from '../types';
import { MOCK_UI_STRINGS, MOCK_MANUSCRIPT_PREVIEWS } from '../data/mockData';
import { SourceCard } from './SourceCard';

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
    <aside className="w-80 lg:w-96 shrink-0 h-full border-l border-[#1AFF00]/20 bg-[#071705]/95 backdrop-blur-xl flex flex-col justify-between z-20 transition-all duration-300 shadow-2xl">
      {/* Header */}
      <div className="p-4 border-b border-[#1AFF00]/20 flex items-center justify-between bg-[#0C3D06]/40">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#1AFF00]/10 text-[#1AFF00]">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white leading-none">{title}</h3>
            <span className="text-[10px] text-emerald-400 font-mono">
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
          className={`pb-2 font-semibold border-b-2 transition-colors ${
            activeTab === 'citations'
              ? 'border-[#1AFF00] text-[#1AFF00]'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          Active Citations ({citations.length})
        </button>
        <button
          onClick={() => setActiveTab('manuscripts')}
          className={`pb-2 font-semibold border-b-2 transition-colors ${
            activeTab === 'manuscripts'
              ? 'border-[#1AFF00] text-[#1AFF00]'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          Manuscript Vault
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'citations' ? (
          <>
            {citations.length === 0 ? (
              <div className="text-center py-10 text-gray-400 text-xs">
                <BookOpen className="w-8 h-8 text-emerald-600 mx-auto mb-2 opacity-50" />
                <p>Select an AI response to view verified citations.</p>
              </div>
            ) : (
              citations.map((cit) => (
                <SourceCard
                  key={cit.id}
                  citation={cit}
                  language={language}
                  isSelected={cit.id === (activeCitationId || selectedCitation?.id)}
                  onOpenSource={(c) => setSelectedCitation(c)}
                  onOpenEvidence={(c) => onOpenEvidence(c)}
                />
              ))
            )}

            {/* Selected Citation Scan Mockup */}
            {selectedCitation && (
              <div className="mt-4 p-4 rounded-xl bg-black/40 border border-[#1AFF00]/20 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#1AFF00] font-mono">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    OCR Scan Preview
                  </span>
                  <span>Page {selectedCitation.pageNumber}</span>
                </div>

                {selectedCitation.scanImageUrl ? (
                  <div className="relative rounded-lg overflow-hidden border border-white/10 aspect-video group">
                    <img
                      src={selectedCitation.scanImageUrl}
                      alt="Manuscript Scan"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex items-end p-2">
                      <span className="text-[10px] text-gray-300 font-mono truncate">
                        {selectedCitation.bookTitle} (Archival Scan)
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-xs text-gray-300 font-serif">
                    <p className="line-clamp-4">"{selectedCitation.originalQuote}"</p>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-gray-400">
              Digitized manuscripts cross-checked by the Balochi Digital AI Engine:
            </p>
            {MOCK_MANUSCRIPT_PREVIEWS.map((ms, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border ${ms.coverBg} hover:border-[#1AFF00]/50 transition-all flex items-center justify-between`}
              >
                <div>
                  <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#1AFF00]/20 text-[#1AFF00] font-mono">
                    {ms.badge}
                  </span>
                  <h5 className="text-xs font-bold text-white mt-1">{ms.title}</h5>
                  <p className="text-[11px] text-gray-400">{ms.author} • {ms.pages}</p>
                </div>
                <button
                  onClick={() => onOpenEvidence()}
                  className="p-2 rounded-lg bg-black/40 hover:bg-[#1AFF00] hover:text-black text-[#1AFF00] transition-colors"
                  title="Inspect Manuscript"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Action */}
      <div className="p-4 border-t border-[#1AFF00]/20 bg-[#0C3D06]/40">
        <button
          onClick={() => onOpenEvidence()}
          className="w-full py-2.5 px-4 rounded-xl bg-[#0C3D06] hover:bg-[#16e000] text-[#1AFF00] hover:text-black border border-[#1AFF00]/40 font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(26,255,0,0.15)]"
        >
          <Sparkles className="w-4 h-4" />
          <span>Inspect Full Vector Evidence Trail</span>
        </button>
      </div>
    </aside>
  );
};
