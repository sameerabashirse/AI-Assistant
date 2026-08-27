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
    <div className="my-4 p-4 rounded-xl surface-muted">
      <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-[var(--theme-border-subtle)]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[var(--accent-strong-text)]" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--theme-text-main)]">
            System Verification Audit Report
          </h4>
        </div>

        <span className="font-mono text-[10px] text-[var(--theme-text-muted)] truncate">
          Hash: {verification.hash}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-2.5 rounded-lg bg-[var(--theme-card)] border border-[var(--theme-border-subtle)] space-y-1">
          <span className="text-[10px] text-[var(--theme-text-muted)] block">{confLabel}</span>
          <p className="font-bold text-[var(--accent-strong-text)] text-base">{verification.confidenceScore}%</p>
        </div>

        <div className="p-2.5 rounded-lg bg-[var(--theme-card)] border border-[var(--theme-border-subtle)] space-y-1">
          <span className="text-[10px] text-[var(--theme-text-muted)] block">{srcLabel}</span>
          <p className="font-bold text-[var(--theme-text-main)] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-strong-text)]" />
            Passed
          </p>
        </div>

        <div className="p-2.5 rounded-lg bg-[var(--theme-card)] border border-[var(--theme-border-subtle)] space-y-1">
          <span className="text-[10px] text-[var(--theme-text-muted)] block">{citLabel}</span>
          <p className="font-bold text-[var(--theme-text-main)] flex items-center gap-1">
            <FileCheck2 className="w-3.5 h-3.5 text-[var(--accent-strong-text)]" />
            100% Valid
          </p>
        </div>

        <div className="p-2.5 rounded-lg bg-[var(--theme-card)] border border-[var(--theme-border-subtle)] space-y-1">
          <span className="text-[10px] text-[var(--theme-text-muted)] block">Peer Consensus</span>
          <p className="font-bold text-[var(--theme-text-main)] flex items-center gap-1">
            <Database className="w-3.5 h-3.5 text-[var(--accent-strong-text)]" />
            {verification.peerReviewedCount} Sources
          </p>
        </div>
      </div>

      {verification.auditorNotes && (
        <div className="mt-3 pt-2 border-t border-[var(--theme-border-subtle)] text-[11px] text-[var(--theme-text-secondary)] flex items-center gap-1.5 font-mono">
          <KeyRound className="w-3.5 h-3.5 text-[var(--accent-strong-text)]" />
          <span>Note: {verification.auditorNotes}</span>
        </div>
      )}
    </div>
  );
};
