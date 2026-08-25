import React, { useState } from 'react';
import {
  FileCheck2,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Edit3,
} from 'lucide-react';
import type { OCRReview } from '../../../types/admin';
import { MOCK_OCR_REVIEWS } from '../../../data/adminMockData';

export const OCRReviewPanel: React.FC = () => {
  const [reviews, setReviews] = useState<OCRReview[]>(MOCK_OCR_REVIEWS);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  const activeReview = reviews[activeReviewIndex] || reviews[0];
  const [editedText, setEditedText] = useState(activeReview?.correctedText || '');

  const handleApprove = () => {
    setReviews((prev) =>
      prev.map((r, i) => (i === activeReviewIndex ? { ...r, status: 'Approved' } : r))
    );
    if (activeReviewIndex < reviews.length - 1) {
      setActiveReviewIndex(activeReviewIndex + 1);
      setEditedText(reviews[activeReviewIndex + 1]?.correctedText || '');
    }
  };

  const handleReject = () => {
    setReviews((prev) =>
      prev.map((r, i) => (i === activeReviewIndex ? { ...r, status: 'Rejected' } : r))
    );
  };

  return (
    <div className="space-y-4">
      {/* Review Selector Bar */}
      <div className="p-4 rounded-2xl bg-[#111615] border border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#0C3D06] border border-[#1AFF00]/30 text-[#1AFF00]">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white leading-none">
              OCR Verification Queue ({reviews.length} Queue Items)
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              {activeReview.bookTitle} — Page {activeReview.pageNumber}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
              activeReview.status === 'Approved'
                ? 'bg-[#1AFF00]/15 text-[#1AFF00] border border-[#1AFF00]/30'
                : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
            }`}
          >
            Status: {activeReview.status}
          </span>

          <div className="flex items-center gap-1 ml-2">
            <button
              disabled={activeReviewIndex === 0}
              onClick={() => {
                setActiveReviewIndex(activeReviewIndex - 1);
                setEditedText(reviews[activeReviewIndex - 1].correctedText);
              }}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 disabled:opacity-30 text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-gray-400 px-1">
              {activeReviewIndex + 1} / {reviews.length}
            </span>
            <button
              disabled={activeReviewIndex === reviews.length - 1}
              onClick={() => {
                setActiveReviewIndex(activeReviewIndex + 1);
                setEditedText(reviews[activeReviewIndex + 1].correctedText);
              }}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 disabled:opacity-30 text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Side-by-Side Review Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* LEFT COLUMN: Original Book Page Scan Image */}
        <div className="p-4 rounded-2xl bg-[#111615] border border-white/10 space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="font-bold text-white flex items-center gap-1.5">
              <ZoomIn className="w-4 h-4 text-[#1AFF00]" />
              Original Manuscript Scan (Page {activeReview.pageNumber})
            </span>
            <span className="font-mono text-[10px] text-[#1AFF00]">300 DPI Resolution</span>
          </div>

          <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-video md:aspect-[4/3] bg-black group">
            <img
              src={activeReview.originalScanUrl}
              alt="Original Scan"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <p className="text-xs text-gray-300 font-mono">
                Source Document: {activeReview.bookTitle}
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-gray-400">
            <p className="font-bold text-white">Reviewer Note:</p>
            <p className="italic mt-0.5">"{activeReview.reviewerNotes}"</p>
          </div>
        </div>

        {/* RIGHT COLUMN: Extracted vs Expert Corrected Text */}
        <div className="p-4 rounded-2xl bg-[#111615] border border-white/10 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1AFF00] flex items-center gap-1.5">
                <Edit3 className="w-4 h-4" />
                Text Extraction & Correction Editor
              </h4>
              <span className="text-[10px] text-gray-400 font-mono">
                Audit Time: {activeReview.timestamp}
              </span>
            </div>

            {/* RAW OCR Extracted Output */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-gray-400 block">
                1. Raw Machine OCR Output (Before):
              </label>
              <div className="p-3 rounded-xl bg-black/40 border border-red-500/20 text-xs font-mono text-red-300 leading-relaxed">
                {activeReview.extractedText}
              </div>
            </div>

            {/* Expert Corrected Output (Editable) */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-[#1AFF00] block">
                2. Expert Verified & Corrected Text (After):
              </label>
              <textarea
                rows={5}
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="w-full p-3 rounded-xl bg-emerald-950/30 border border-[#1AFF00]/40 text-xs text-white leading-relaxed font-serif focus:outline-none focus:border-[#1AFF00]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
            <button
              onClick={handleReject}
              className="py-2 px-4 rounded-xl bg-red-950 hover:bg-red-900 text-red-300 border border-red-500/30 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <XCircle className="w-4 h-4" />
              <span>Reject Scan</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleApprove}
                className="py-2 px-5 rounded-xl bg-[#0C3D06] hover:bg-[#16e000] text-[#1AFF00] hover:text-black border border-[#1AFF00]/40 font-bold text-xs transition-all shadow-[0_0_15px_rgba(26,255,0,0.2)] flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve & Index Page</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
