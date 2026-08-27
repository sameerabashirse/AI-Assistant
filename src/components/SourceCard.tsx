import React from 'react';
import { BookOpen, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import type { Citation, Language } from '../types';
import { MOCK_UI_STRINGS } from '../data/mockData';

interface SourceCardProps {
  citation: Citation;
  language: Language;
  onOpenSource?: (citation: Citation) => void;
  onOpenEvidence?: (citation: Citation) => void;
  isSelected?: boolean;
}

export const SourceCard: React.FC<SourceCardProps> = ({
  citation,
  language,
  onOpenSource,
  onOpenEvidence,
  isSelected = false,
}) => {
  const viewSrcText = MOCK_UI_STRINGS.viewSource[language];
  const viewEvidText = MOCK_UI_STRINGS.viewEvidence[language];

  return (
    <div
      className={`group relative p-4 rounded-xl transition-all duration-300 border ${
        isSelected
          ? 'accent-pill'
          : 'surface-muted hover:border-[var(--accent-border)]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="accent-pill p-2 rounded-lg shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[var(--theme-text-main)] group-hover:text-[var(--accent-strong-text)] transition-colors leading-snug">
              {citation.bookTitle}
            </h4>
            <p className="text-xs text-[var(--theme-text-muted)] font-medium">
              {citation.author} {citation.edition ? `• ${citation.edition}` : ''}
            </p>
          </div>
        </div>
        <span className="accent-pill shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-full">
          Page {citation.pageNumber}
        </span>
      </div>

      {/* Quoted text snippet */}
      <div className="mt-3 p-2.5 rounded-lg bg-[var(--theme-card)] border border-[var(--theme-border-subtle)] text-xs text-[var(--theme-text-secondary)] italic leading-relaxed font-serif">
        "{citation.originalQuote}"
      </div>

      <div className="mt-3 flex items-center justify-between pt-2 border-t border-[var(--theme-border-subtle)] text-xs">
        <div className="flex items-center gap-1.5 text-[var(--success-text)] font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{Math.round(citation.relevanceScore * 100)}% Match</span>
        </div>

        <div className="flex items-center gap-2">
          {onOpenSource && (
            <button
              onClick={() => onOpenSource(citation)}
              className="btn-soft inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all"
            >
              <ExternalLink className="w-3 h-3" />
              <span>{viewSrcText}</span>
            </button>
          )}

          {onOpenEvidence && (
            <button
              onClick={() => onOpenEvidence(citation)}
              className="accent-pill inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all"
            >
              <Sparkles className="w-3 h-3" />
              <span>{viewEvidText}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
