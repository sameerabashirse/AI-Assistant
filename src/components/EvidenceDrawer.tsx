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
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm flex justify-end transition-opacity">
      <div className="w-full max-w-lg bg-[#070B14] border-l border-white/10 h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Top Bar */}
        <div className="p-5 border-b border-white/10 bg-[#0B1F3A]/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#0B1F3A] border border-[#2563EB]/40 text-[#60A5FA] shadow-[0_0_15px_rgba(37,99,235,0.3)]">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                {MOCK_UI_STRINGS.evidenceTitle[language]}
              </h3>
              <p className="text-xs text-[#60A5FA] font-mono">
                Verification Protocol & Retrieval Audit
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Vector Match Score Metric */}
          <div className="p-4 rounded-2xl bg-[#111827] border border-white/10 flex items-center justify-between shadow-lg">
            <div>
              <p className="text-xs font-semibold text-gray-300">Vector Retrieval Cosine Match</p>
              <p className="text-2xl font-black text-white mt-0.5">
                {Math.round(defaultEvidence.retrievalScore * 1000) / 10}%
              </p>
            </div>
            <div className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#2563EB]/20 text-[#60A5FA] border border-[#2563EB]/40 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#60A5FA]" />
              Strict Verified
            </div>
          </div>

          {/* Raw Text Chunk Box */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#60A5FA]" />
              Extracted Raw Source Chunk
            </h4>
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs font-mono text-blue-200 leading-relaxed break-words font-serif">
              {defaultEvidence.rawTextChunk}
            </div>
          </div>

          {/* Reasoning Chain Timeline */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-[#60A5FA]" />
              AI Reasoning & Verification Chain
            </h4>

            <div className="space-y-2 relative pl-4 border-l-2 border-[#2563EB]/30">
              {defaultEvidence.reasoningChain.map((step, i) => (
                <div key={i} className="relative group">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#2563EB] ring-4 ring-[#070B14]" />
                  <div className="p-3 rounded-xl bg-[#111827] border border-white/5 text-xs text-gray-300 leading-relaxed font-medium">
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Vector Metadata */}
          <div className="p-4 rounded-2xl bg-[#111827] border border-white/10 space-y-2 text-xs font-mono text-gray-400">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Binary className="w-3.5 h-3.5 text-[#60A5FA]" />
                Vector Index Node ID:
              </span>
              <span className="text-white font-bold">{defaultEvidence.vectorId}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#2563EB]" />
                Manuscript Reference:
              </span>
              <span className="text-white font-bold">{defaultEvidence.manuscriptRef}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#0B1F3A]/30 flex justify-end">
          <button
            onClick={onClose}
            className="py-2.5 px-6 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs shadow-[0_0_15px_rgba(37,99,235,0.4)]"
          >
            Close Audit Trail
          </button>
        </div>
      </div>
    </div>
  );
};
