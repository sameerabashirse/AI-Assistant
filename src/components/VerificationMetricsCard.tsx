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
  const confLabel = MOCK_UI_STRINGS.confidenceLabel[language];
  const srcLabel = MOCK_UI_STRINGS.sourceVerified[language];
  const citLabel = MOCK_UI_STRINGS.citationChecked[language];

  return (
    <div className="my-4 p-4 rounded-xl bg-[#0C3D06]/40 border border-[#1AFF00]/30 backdrop-blur-md shadow-[0_0_20px_rgba(12,61,6,0.3)]">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1AFF00]/20">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#1AFF00]" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#1AFF00]">
            System Verification Audit Report
          </h4>
        </div>
        <span className="font-mono text-[10px] text-[#1AFF00]/70 bg-[#0C3D06] px-2 py-0.5 rounded border border-[#1AFF00]/30">
          HASH: {verification.hash}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {/* Metric 1: Evidence Confidence */}
        <div className="p-3 rounded-lg bg-black/20 border border-[#1AFF00]/15 flex flex-col justify-between">
          <div className="text-[11px] text-gray-300 font-medium flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1AFF00]" />
            <span>{confLabel}</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-[#1AFF00]">
              {verification.confidenceScore}%
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">HIGH</span>
          </div>
          <div className="w-full bg-emerald-950/60 rounded-full h-1.5 mt-2 overflow-hidden border border-[#1AFF00]/20">
            <div
              className="bg-[#1AFF00] h-1.5 rounded-full shadow-[0_0_8px_#1AFF00]"
              style={{ width: `${verification.confidenceScore}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Source Verified */}
        <div className="p-3 rounded-lg bg-black/20 border border-[#1AFF00]/15 flex flex-col justify-between">
          <div className="text-[11px] text-gray-300 font-medium flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-[#1AFF00]" />
            <span>{srcLabel}</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-5 h-5 text-[#1AFF00]" />
            <span className="text-sm font-bold text-white">Yes</span>
          </div>
          <p className="text-[10px] text-gray-400 mt-2">
            {verification.peerReviewedCount} peer-reviewed sources
          </p>
        </div>

        {/* Metric 3: Citation Checked */}
        <div className="p-3 rounded-lg bg-black/20 border border-[#1AFF00]/15 flex flex-col justify-between">
          <div className="text-[11px] text-gray-300 font-medium flex items-center gap-1.5">
            <FileCheck2 className="w-3.5 h-3.5 text-[#1AFF00]" />
            <span>{citLabel}</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-5 h-5 text-[#1AFF00]" />
            <span className="text-sm font-bold text-white">Yes</span>
          </div>
          <p className="text-[10px] text-gray-400 mt-2 truncate">
            Cross-matched OCR scan
          </p>
        </div>
      </div>

      {verification.auditorNotes && (
        <div className="mt-3 pt-2 text-[11px] text-gray-300 flex items-center gap-2 border-t border-white/5">
          <KeyRound className="w-3.5 h-3.5 text-[#1AFF00] shrink-0" />
          <span className="italic truncate">{verification.auditorNotes}</span>
        </div>
      )}
    </div>
  );
};
