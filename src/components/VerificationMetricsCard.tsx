import React from 'react';
import { ShieldCheck, CheckCircle2, FileCheck2, Database, KeyRound } from 'lucide-react';
import type { VerificationData, Language } from '../types';
import { MOCK_UI_STRINGS } from '../data/mockData';

interface VerificationMetricsCardProps {
  verification: VerificationData;
  language: Language;
}

export const VerificationMetricsCard: React.FC<VerificationMetricsCardProps> = ({
  verification,
  language,
}) => {
  const confLabel = MOCK_UI_STRINGS.confidenceLabel[language] || MOCK_UI_STRINGS.confidenceLabel.english;
  const srcLabel = MOCK_UI_STRINGS.sourceVerified[language] || MOCK_UI_STRINGS.sourceVerified.english;
  const citLabel = MOCK_UI_STRINGS.citationChecked[language] || MOCK_UI_STRINGS.citationChecked.english;

  return (
    <div className="my-4 p-4 rounded-xl bg-[#1E1B4B]/50 border border-[#6366F1]/30 backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.25)]">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#6366F1]/20">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#8B5CF6]" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#A78BFA]">
            System Verification Audit Report
          </h4>
        </div>

        <span className="font-mono text-[10px] text-gray-400">
          Hash: {verification.hash}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1">
          <span className="text-[10px] text-gray-400 block">{confLabel}</span>
          <p className="font-bold text-[#A78BFA] text-base">{verification.confidenceScore}%</p>
        </div>

        <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1">
          <span className="text-[10px] text-gray-400 block">{srcLabel}</span>
          <p className="font-bold text-white flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5CF6]" />
            Passed
          </p>
        </div>

        <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1">
          <span className="text-[10px] text-gray-400 block">{citLabel}</span>
          <p className="font-bold text-white flex items-center gap-1">
            <FileCheck2 className="w-3.5 h-3.5 text-[#8B5CF6]" />
            100% Valid
          </p>
        </div>

        <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1">
          <span className="text-[10px] text-gray-400 block">Peer Consensus</span>
          <p className="font-bold text-white flex items-center gap-1">
            <Database className="w-3.5 h-3.5 text-[#8B5CF6]" />
            {verification.peerReviewedCount} Sources
          </p>
        </div>
      </div>

      {verification.auditorNotes && (
        <div className="mt-3 pt-2 border-t border-white/5 text-[11px] text-indigo-200 flex items-center gap-1.5 font-mono">
          <KeyRound className="w-3.5 h-3.5 text-[#8B5CF6]" />
          <span>Note: {verification.auditorNotes}</span>
        </div>
      )}
    </div>
  );
};
