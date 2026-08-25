import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { MOCK_UI_STRINGS } from '../data/mockData';
import type { Language } from '../types';

interface VerifiedBadgeProps {
  language: Language;
  score?: number;
  compact?: boolean;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({
  language,
  score = 98,
  compact = false
}) => {
  const badgeText = MOCK_UI_STRINGS.verifiedBadge[language] || MOCK_UI_STRINGS.verifiedBadge.english;

  if (compact) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#6366F1]/20 text-[#A78BFA] border border-[#6366F1]/40 shadow-[0_0_12px_rgba(99,102,241,0.25)]">
        <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5CF6]" />
        <span>✓ {badgeText} ({score}%)</span>
      </span>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#6366F1]/20 text-[#A78BFA] border border-[#6366F1]/40 shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-transform hover:scale-[1.02]">
      <ShieldCheck className="w-4 h-4 text-[#8B5CF6] animate-pulse" />
      <span className="tracking-wide">✓ {badgeText}</span>
      <span className="ml-1 px-1.5 py-0.5 rounded bg-[#8B5CF6]/20 text-[#A78BFA] text-[10px] font-mono font-bold border border-[#8B5CF6]/30">
        {score}% Match
      </span>
    </div>
  );
};
