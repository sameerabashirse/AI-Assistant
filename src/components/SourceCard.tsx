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
          ? 'bg-[#0C3D06] border-[#1AFF00] shadow-[0_0_20px_rgba(26,255,0,0.25)]'
          : 'bg-black/30 hover:bg-[#0C3D06]/40 border-white/10 hover:border-[#1AFF00]/40'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#0C3D06] border border-[#1AFF00]/30 text-[#1AFF00] shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white group-hover:text-[#1AFF00] transition-colors leading-snug">
              {citation.bookTitle}
            </h4>
            <p className="text-xs text-gray-400 font-medium">
              {citation.author} {citation.edition ? `• ${citation.edition}` : ''}
            </p>
          </div>
        </div>
        <span className="shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#1AFF00]/10 text-[#1AFF00] border border-[#1AFF00]/30">
          Page {citation.pageNumber}
        </span>
      </div>

      {/* Quoted text snippet */}
      <div className="mt-3 p-2.5 rounded-lg bg-black/40 border border-white/5 text-xs text-gray-300 italic leading-relaxed font-serif">
        "{citation.originalQuote}"
      </div>

      <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/10 text-xs">
        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#1AFF00]" />
          <span>{Math.round(citation.relevanceScore * 100)}% Match</span>
        </div>

        <div className="flex items-center gap-2">
          {onOpenSource && (
            <button
              onClick={() => onOpenSource(citation)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/10 hover:bg-[#1AFF00] hover:text-black text-gray-200 transition-all"
            >
              <ExternalLink className="w-3 h-3" />
              <span>{viewSrcText}</span>
            </button>
          )}

          {onOpenEvidence && (
            <button
              onClick={() => onOpenEvidence(citation)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#0C3D06] hover:bg-[#16e000] text-[#1AFF00] hover:text-black border border-[#1AFF00]/30 transition-all"
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
