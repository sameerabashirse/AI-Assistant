import React from 'react';
import { BookOpen } from 'lucide-react';
import type { Citation } from '../types';

interface CitationCardProps {
  citation: Citation;
  index: number;
  onSelect: (citation: Citation) => void;
  isActive?: boolean;
}

export const CitationCard: React.FC<CitationCardProps> = ({
  citation,
  index,
  onSelect,
  isActive = false,
}) => {
  return (
    <button
      onClick={() => onSelect(citation)}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
        isActive
          ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white border-[#8B5CF6] shadow-[0_0_12px_rgba(139,92,246,0.5)] font-bold'
          : 'bg-[#1E1B4B]/60 hover:bg-[#1E1B4B] text-[#A78BFA] border-[#6366F1]/40 hover:border-[#8B5CF6]'
      }`}
      title={`${citation.bookTitle} (Page ${citation.pageNumber})`}
    >
      <BookOpen className="w-3 h-3" />
      <span>[{index}]</span>
      <span className="max-w-[140px] truncate">{citation.bookTitle}</span>
      <span className="opacity-75 font-mono text-[10px]">p.{citation.pageNumber}</span>
    </button>
  );
};
