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
      <div className="surface p-4 rounded-2xl border border-[var(--theme-border)] flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl surface-muted text-[var(--accent-strong-text)]">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--theme-text-main)] leading-none">
              OCR Verification Queue ({reviews.length} Queue Items)
            </h3>
            <p className="text-xs text-[var(--theme-text-muted)] mt-1">
              {activeReview.bookTitle} — Page {activeReview.pageNumber}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
              activeReview.status === 'Approved'
                ? 'bg-[var(--success-soft)] text-[var(--success-text)] border border-[var(--success-text)]/30'
                : 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
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
              className="btn-soft p-1.5 rounded-lg disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-[var(--theme-text-muted)] px-1">
              {activeReviewIndex + 1} / {reviews.length}
            </span>
            <button
              disabled={activeReviewIndex === reviews.length - 1}
              onClick={() => {
                setActiveReviewIndex(activeReviewIndex + 1);
                setEditedText(reviews[activeReviewIndex + 1].correctedText);
              }}
              className="btn-soft p-1.5 rounded-lg disabled:opacity-30 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* LEFT COLUMN: Original Scan */}
        <div className="surface p-4 rounded-2xl border border-[var(--theme-border)] space-y-3 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between text-xs text-[var(--theme-text-muted)]">
            <span className="font-bold text-[var(--theme-text-main)] flex items-center gap-1.5">
              <ZoomIn className="w-4 h-4 text-[var(--accent-strong-text)]" />
              Original Manuscript Scan (Page {activeReview.pageNumber})
            </span>
            <span className="font-mono text-[10px] text-[var(--accent-strong-text)] font-semibold">300 DPI Resolution</span>
          </div>

          <div className="relative rounded-xl overflow-hidden border border-[var(--theme-border)] aspect-video md:aspect-[4/3] bg-black group">
            <img
              src={activeReview.originalScanUrl}
              alt="Original Scan"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <p className="text-xs text-white font-mono">
                Source Document: {activeReview.bookTitle}
              </p>
            </div>
          </div>

          <div className="surface-muted p-3 rounded-xl border border-[var(--theme-border-subtle)] text-xs text-[var(--theme-text-muted)]">
            <p className="font-bold text-[var(--theme-text-main)]">Reviewer Note:</p>
            <p className="italic mt-0.5">"{activeReview.reviewerNotes}"</p>
          </div>
        </div>

        {/* RIGHT COLUMN: OCR Text Editor */}
        <div className="surface p-4 rounded-2xl border border-[var(--theme-border)] space-y-4 flex flex-col justify-between shadow-md">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--theme-border)]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--accent-strong-text)] flex items-center gap-1.5">
                <Edit3 className="w-4 h-4" />
                Text Extraction & Correction Editor
              </h4>
              <span className="text-[10px] text-[var(--theme-text-muted)] font-mono">
                Audit Time: {activeReview.timestamp}
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-[var(--theme-text-muted)] block">
                1. Raw Machine OCR Output (Before):
              </label>
              <div className="p-3 rounded-xl bg-[var(--error-soft)] border border-[var(--error-text)]/30 text-xs font-mono text-[var(--error-text)] leading-relaxed">
                {activeReview.extractedText}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-[var(--accent-strong-text)] block font-semibold">
                2. Expert Verified & Corrected Text (After):
              </label>
              <textarea
                rows={5}
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="w-full p-3 rounded-xl bg-[var(--theme-card)] border border-[var(--theme-border)] text-xs text-[var(--theme-text-main)] leading-relaxed font-serif focus:outline-none focus:border-[var(--accent)]"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--theme-border)] flex items-center justify-between gap-3">
            <button
              onClick={handleReject}
              className="py-2 px-4 rounded-xl bg-[var(--error-soft)] hover:opacity-90 text-[var(--error-text)] border border-[var(--error-text)]/30 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <XCircle className="w-4 h-4" />
              <span>Reject Scan</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleApprove}
                className="btn-primary py-2 px-5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
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
