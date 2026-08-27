'use client';

import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import type { Language } from '../types';
import { MOCK_UI_STRINGS } from '../data/mockData';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalyzeDocument: (query: string) => void;
  language: Language;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onAnalyzeDocument,
  language,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingState, setUploadingState] = useState<'idle' | 'scanning' | 'success'>('idle');
  const [scannedDocName, setScannedDocName] = useState('Marri_Balochi_Manuscript_1892.pdf');

  if (!isOpen) return null;

  const handleSimulatedUpload = (fileTitle?: string) => {
    if (fileTitle) setScannedDocName(fileTitle);
    setUploadingState('scanning');

    setTimeout(() => {
      setUploadingState('success');
    }, 2200);
  };

  const handleAnalyze = () => {
    onAnalyzeDocument(
      `Analyze digitized manuscript document "${scannedDocName}" and verify all dictionary citations and historical references.`
    );
    setUploadingState('idle');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-md flex items-center justify-center p-4">
      <div className="surface-elevated w-full max-w-md rounded-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-3">
          <div className="flex items-center gap-2">
            <div className="accent-pill p-2 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--theme-text-main)] leading-tight">
                {MOCK_UI_STRINGS.uploadDoc[language]}
              </h3>
              <p className="text-xs text-[var(--accent-strong-text)] font-mono">
                OCR & Manuscript Verification Engine
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn-soft p-1.5 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {uploadingState === 'idle' && (
          <div className="space-y-4 text-xs">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const file = e.dataTransfer.files[0];
                if (file) handleSimulatedUpload(file.name);
              }}
              onClick={() => handleSimulatedUpload()}
              className={`p-6 rounded-2xl border-2 border-dashed transition-all text-center cursor-pointer ${
                isDragging
                  ? 'border-[var(--accent)] bg-[var(--accent-soft)]'
                  : 'border-[var(--theme-border)] hover:border-[var(--accent-border)] bg-[var(--theme-muted)]'
              }`}
            >
              <Upload className="w-10 h-10 text-[var(--accent-strong-text)] mx-auto mb-2" />
              <p className="font-bold text-[var(--theme-text-main)] text-sm">Drop PDF Manuscript or Book Scan</p>
              <p className="text-[var(--theme-text-muted)] mt-1">Supports PDF, PNG high-res scans up to 100MB</p>
            </div>

            <div className="p-3 rounded-xl bg-[var(--theme-muted)] border border-[var(--theme-border-subtle)] space-y-1.5">
              <p className="font-bold text-[var(--theme-text-main)]">Sample Manuscript Presets:</p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Sher_Marri_Balochi_Dict.pdf',
                  'Dames_Popular_Poetry_1907.pdf',
                  'Zahirok_Melodies_Scan.png',
                ].map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => handleSimulatedUpload(name)}
                    className="accent-pill px-2.5 py-1 rounded-lg font-mono text-[10px] transition-colors"
                  >
                    + {name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {uploadingState === 'scanning' && (
          <div className="py-10 text-center space-y-4">
            <Loader2 className="w-12 h-12 text-[var(--accent-strong-text)] animate-spin mx-auto" />
            <div>
              <p className="text-sm font-bold text-[var(--theme-text-main)]">Running Optical OCR & Alignment...</p>
              <p className="text-xs text-[var(--accent-strong-text)] font-mono mt-1">
                Digitizing "{scannedDocName}"...
              </p>
            </div>
          </div>
        )}

        {uploadingState === 'success' && (
          <div className="py-6 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-[var(--accent-strong-text)] mx-auto" />
            <div>
              <h4 className="text-base font-bold text-[var(--theme-text-main)]">OCR Extraction Complete!</h4>
              <p className="text-xs text-[var(--theme-text-secondary)] mt-1 font-mono">{scannedDocName}</p>
            </div>

            <div className="p-3 rounded-xl bg-[var(--theme-muted)] border border-[var(--theme-border)] text-left text-xs font-mono text-[var(--theme-text-secondary)]">
              ✓ 142 pages indexed into Vector HNSW index.
            </div>

            <button
              onClick={handleAnalyze}
              className="btn-primary w-full py-2.5 rounded-xl font-bold text-xs"
            >
              Analyze with Verified AI Assistant →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
