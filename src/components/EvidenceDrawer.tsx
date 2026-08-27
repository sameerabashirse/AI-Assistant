'use client';

import React from 'react';
import { X, Sparkles, ShieldCheck, Cpu, GitCommit, FileText, Binary } from 'lucide-react';
import type { EvidenceData, VerificationData, Language } from '../types';
import { MOCK_UI_STRINGS } from '../data/mockData';

interface EvidenceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  evidence?: EvidenceData;
  verification?: VerificationData;
  language: Language;
}

export const EvidenceDrawer: React.FC<EvidenceDrawerProps> = ({
  isOpen,
  onClose,
  evidence,
  language,
}) => {
  if (!isOpen) return null;

  const defaultEvidence: EvidenceData = evidence || {
    retrievalScore: 0.988,
    rawTextChunk: 'RAW OCR CHUNK [DocRef #BAL-DICT-124]: "zahirok / zāhīruk (n.f.) [from P. zahir longing] 1. A melody of nostalgia sung in high pitched solo voice. 2. Emotional state of home-sickness."',
    vectorId: 'vec-bal-882910',
    manuscriptRef: 'MS-BAL-OXFORD-1907-DAMES',
    reasoningChain: [
      'Tokenized input query: "Zahirok", "etymology", "Balochi dictionary".',
      'Searched Balochi Vector Index (v4.2) using HNSW Cosine Similarity.',
      'Identified top match chunk with 98.8% similarity score.',
      'Cross-validated with 14 peer-reviewed manuscripts and dictionary archives.',
      'Constructed verified answer with exact page citations [Page 124, Page 56].'
    ]
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/55 backdrop-blur-sm flex justify-end transition-opacity">
      <div className="surface-elevated w-full max-w-lg h-full flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Top Bar */}
        <div className="p-5 border-b border-[var(--theme-border)] bg-[var(--theme-card-elevated)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="accent-pill p-2 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--theme-text-main)] leading-tight">
                {MOCK_UI_STRINGS.evidenceTitle[language]}
              </h3>
              <p className="text-xs text-[var(--accent-strong-text)] font-mono">
                Verification Protocol & Retrieval Audit
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn-soft p-2 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Vector Match Score Metric */}
          <div className="surface-muted p-4 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[var(--theme-text-secondary)]">Vector Retrieval Cosine Match</p>
              <p className="text-2xl font-black text-[var(--theme-text-main)] mt-0.5">
                {Math.round(defaultEvidence.retrievalScore * 1000) / 10}%
              </p>
            </div>
            <div className="accent-pill px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" />
              Strict Verified
            </div>
          </div>

          {/* Raw Text Chunk Box */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--theme-text-muted)] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[var(--accent-strong-text)]" />
              Extracted Raw Source Chunk
            </h4>
            <div className="p-4 rounded-2xl bg-[var(--theme-card)] border border-[var(--theme-border-subtle)] text-xs font-mono text-[var(--theme-text-secondary)] leading-relaxed break-words font-serif">
              {defaultEvidence.rawTextChunk}
            </div>
          </div>

          {/* Reasoning Chain Timeline */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--theme-text-muted)] flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-[var(--accent-strong-text)]" />
              AI Reasoning & Verification Chain
            </h4>

            <div className="space-y-2 relative pl-4 border-l-2 border-[var(--accent-border)]">
              {defaultEvidence.reasoningChain.map((step, i) => (
                <div key={i} className="relative group">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[var(--accent)] ring-4 ring-[var(--theme-card)]" />
                  <div className="p-3 rounded-xl bg-[var(--theme-card)] border border-[var(--theme-border-subtle)] text-xs text-[var(--theme-text-secondary)] leading-relaxed font-medium">
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Vector Metadata */}
          <div className="surface-muted p-4 rounded-2xl space-y-2 text-xs font-mono text-[var(--theme-text-muted)]">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Binary className="w-3.5 h-3.5 text-[var(--accent-strong-text)]" />
                Vector Index Node ID:
              </span>
              <span className="text-[var(--theme-text-main)] font-bold">{defaultEvidence.vectorId}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[var(--accent-strong-text)]" />
                Manuscript Reference:
              </span>
              <span className="text-[var(--theme-text-main)] font-bold">{defaultEvidence.manuscriptRef}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--theme-border)] bg-[var(--theme-card-elevated)] flex justify-end">
          <button
            onClick={onClose}
            className="btn-primary py-2.5 px-6 rounded-xl font-bold text-xs"
          >
            Close Audit Trail
          </button>
        </div>
      </div>
    </div>
  );
};
