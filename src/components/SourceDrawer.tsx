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
    <aside className="surface w-80 lg:w-96 shrink-0 h-full border-l flex flex-col justify-between z-20 transition-all duration-300">
      {/* Header */}
      <div className="p-4 border-b border-[var(--theme-border)] flex items-center justify-between bg-[var(--theme-card-elevated)]">
        <div className="flex items-center gap-2">
          <div className="accent-pill p-1.5 rounded-lg">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--theme-text-main)] leading-none">{title}</h3>
            <span className="text-[10px] text-[var(--accent-strong-text)] font-mono">
              {citations.length} Verified Entries
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="btn-soft p-1.5 rounded-lg transition-colors"
          title="Close panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-3 flex gap-2 border-b border-[var(--theme-border)] text-xs">
        <button
          onClick={() => setActiveTab('citations')}
          className={`pb-2.5 px-3 font-bold transition-all border-b-2 ${
            activeTab === 'citations'
              ? 'border-[var(--accent)] text-[var(--accent-strong-text)]'
              : 'border-transparent text-[var(--theme-text-muted)] hover:text-[var(--theme-text-main)]'
          }`}
        >
          Citations ({citations.length})
        </button>

        <button
          onClick={() => setActiveTab('manuscripts')}
          className={`pb-2.5 px-3 font-bold transition-all border-b-2 ${
            activeTab === 'manuscripts'
              ? 'border-[var(--accent)] text-[var(--accent-strong-text)]'
              : 'border-transparent text-[var(--theme-text-muted)] hover:text-[var(--theme-text-main)]'
          }`}
        >
          Scanned Manuscripts ({MOCK_MANUSCRIPT_PREVIEWS.length})
        </button>
      </div>

      {/* Drawer Body Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'citations' ? (
          citations.length === 0 ? (
            <div className="text-center py-10 text-xs text-[var(--theme-text-muted)] font-mono">
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
                      ? 'accent-pill border-[var(--accent-border)] text-[var(--theme-text-main)]'
                      : 'surface-muted text-[var(--theme-text-secondary)] hover:border-[var(--accent-border)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="accent-pill px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                      Citation [{idx + 1}]
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[var(--accent-strong-text)]">
                      {Math.round(cit.relevanceScore * 100)}% Match
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-[var(--theme-text-main)] leading-snug">{cit.bookTitle}</h4>
                  <p className="text-[11px] text-[var(--theme-text-muted)] mt-0.5">Author: {cit.author}</p>
                  <p className="text-[10px] font-mono text-[var(--theme-text-muted)] mt-1">
                    {cit.edition} • Page {cit.pageNumber}
                  </p>

                  <div className="mt-2.5 p-2 rounded-lg bg-[var(--theme-card)] border border-[var(--theme-border-subtle)] text-[11px] text-[var(--theme-text-secondary)] italic font-serif leading-relaxed">
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
                className="surface-muted p-3.5 rounded-xl space-y-2 hover:border-[var(--accent-border)] transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="accent-pill px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                    {ms.badge}
                  </span>
                  <span className="text-[10px] text-[var(--theme-text-muted)] font-mono">{ms.pages}</span>
                </div>

                <h4 className="text-xs font-bold text-[var(--theme-text-main)]">{ms.title}</h4>
                <p className="text-[11px] text-[var(--theme-text-muted)] font-mono">Collector / Author: {ms.author}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Action Footer */}
      <div className="p-3 border-t border-[var(--theme-border)] bg-[var(--theme-card-elevated)] space-y-2">
        <button
          onClick={() => onOpenEvidence(selectedCitation || undefined)}
          className="btn-primary w-full py-2.5 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Audit Evidence Trail</span>
        </button>
      </div>
    </aside>
  );
};
