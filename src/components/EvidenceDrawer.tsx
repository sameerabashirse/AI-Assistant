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
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end transition-opacity">
      <div className="w-full max-w-lg bg-[#071705] border-l border-[#1AFF00]/30 h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Top Bar */}
        <div className="p-5 border-b border-[#1AFF00]/20 bg-[#0C3D06]/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#0C3D06] border border-[#1AFF00]/40 text-[#1AFF00] shadow-[0_0_15px_rgba(26,255,0,0.2)]">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                {MOCK_UI_STRINGS.evidenceTitle[language]}
              </h3>
              <p className="text-xs text-emerald-400 font-mono">
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

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Status Header Banner */}
          <div className="p-4 rounded-xl bg-[#0C3D06] border border-[#1AFF00]/40 shadow-[0_0_20px_rgba(26,255,0,0.15)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#1AFF00]" />
              <div>
                <h4 className="text-sm font-bold text-white">Verified Knowledge Output</h4>
                <p className="text-xs text-gray-300">Audit Trail Certified by Balochi Digital Engine</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#1AFF00] text-black">
              {Math.round(defaultEvidence.retrievalScore * 100)}% Confidence
            </span>
          </div>

          {/* Reasoning Chain */}
          <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-3">
            <h4 className="text-xs font-bold text-[#1AFF00] uppercase tracking-wider flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-[#1AFF00]" />
              <span>AI Reasoning & Verification Chain</span>
            </h4>
            <div className="space-y-2 relative pl-4 border-l-2 border-[#1AFF00]/30">
              {defaultEvidence.reasoningChain.map((step, i) => (
                <div key={i} className="relative text-xs text-gray-200 flex items-start gap-2">
                  <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-[#1AFF00] ring-4 ring-[#071705]" />
                  <span className="font-mono text-[#1AFF00]/70 text-[10px]">{i + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Raw Retrieved OCR Text Chunk */}
          <div className="p-4 rounded-xl bg-black/40 border border-[#1AFF00]/20 space-y-2">
            <div className="flex items-center justify-between text-xs text-emerald-400">
              <span className="font-mono flex items-center gap-1.5 font-bold">
                <FileText className="w-4 h-4 text-[#1AFF00]" />
                Raw OCR Text Extract
              </span>
              <span className="text-[10px] text-gray-400 font-mono">
                Ref: {defaultEvidence.manuscriptRef}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-emerald-950/30 border border-white/5 font-mono text-xs text-emerald-200 leading-relaxed overflow-x-auto whitespace-pre-wrap select-all">
              {defaultEvidence.rawTextChunk}
            </div>
          </div>

          {/* Vector Storage & Security Metadata */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-black/30 border border-white/10 space-y-1">
              <div className="text-gray-400 flex items-center gap-1">
                <Binary className="w-3.5 h-3.5 text-[#1AFF00]" />
                <span>Vector Index ID</span>
              </div>
              <p className="font-mono text-[#1AFF00] font-semibold">{defaultEvidence.vectorId}</p>
            </div>

            <div className="p-3 rounded-xl bg-black/30 border border-white/10 space-y-1">
              <div className="text-gray-400 flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-[#1AFF00]" />
                <span>Embedding Model</span>
              </div>
              <p className="font-mono text-white font-semibold">Balochi-BERT-v2</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="p-4 border-t border-[#1AFF00]/20 bg-[#0C3D06]/40 flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-[#1AFF00] hover:bg-[#16e000] text-black font-bold text-xs transition-colors"
          >
            Close Audit Trail
          </button>
        </div>
      </div>
    </div>
  );
};
