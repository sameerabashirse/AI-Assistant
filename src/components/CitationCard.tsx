import React from 'react';
import { BookOpen } from 'lucide-react';
import type { Citation } from '../types';

interface CitationCardProps {
  citation: Citation;
  index: number;
  onClick: (citation: Citation) => void;
  isActive?: boolean;
}

export const CitationCard: React.FC<CitationCardProps> = ({
  citation,
  index,
  onClick,
  isActive = false,
}) => {
  return (
    <button
      onClick={() => onClick(citation)}
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 my-0.5 mx-1 rounded-md text-xs font-medium border transition-all ${
        isActive
          ? 'bg-[#1AFF00] text-black border-[#1AFF00] shadow-[0_0_10px_#1AFF00]'
          : 'bg-[#0C3D06]/60 hover:bg-[#0C3D06] text-[#1AFF00] border-[#1AFF00]/40 hover:border-[#1AFF00]'
      }`}
      title={`${citation.bookTitle} (Page ${citation.pageNumber})`}
    >
      <BookOpen className="w-3 h-3" />
      <span>[{index + 1}]</span>
      <span className="max-w-[120px] truncate">{citation.bookTitle}</span>
      <span className="opacity-75 font-mono text-[10px]">p.{citation.pageNumber}</span>
    </button>
  );
};
