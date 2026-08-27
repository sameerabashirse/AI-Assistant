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
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111827] border border-[#2563EB]/40 rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#0B1F3A] border border-[#2563EB]/40 text-[#60A5FA]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                {MOCK_UI_STRINGS.uploadDoc[language]}
              </h3>
              <p className="text-xs text-[#60A5FA] font-mono">
                OCR & Manuscript Verification Engine
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
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
                  ? 'border-[#2563EB] bg-[#0B1F3A]/80'
                  : 'border-white/20 hover:border-[#2563EB] bg-black/30'
              }`}
            >
              <Upload className="w-10 h-10 text-[#60A5FA] mx-auto mb-2 animate-bounce" />
              <p className="font-bold text-white text-sm">Drop PDF Manuscript or Book Scan</p>
              <p className="text-gray-400 mt-1">Supports PDF, PNG high-res scans up to 100MB</p>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
              <p className="font-bold text-white">Sample Manuscript Presets:</p>
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
                    className="px-2.5 py-1 rounded-lg bg-[#2563EB]/20 hover:bg-[#2563EB]/40 text-[#60A5FA] border border-[#2563EB]/30 font-mono text-[10px] transition-colors"
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
            <Loader2 className="w-12 h-12 text-[#60A5FA] animate-spin mx-auto" />
            <div>
              <p className="text-sm font-bold text-white">Running Optical OCR & Alignment...</p>
              <p className="text-xs text-[#60A5FA] font-mono mt-1">
                Digitizing "{scannedDocName}"...
              </p>
            </div>
          </div>
        )}

        {uploadingState === 'success' && (
          <div className="py-6 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-[#60A5FA] mx-auto" />
            <div>
              <h4 className="text-base font-bold text-white">OCR Extraction Complete!</h4>
              <p className="text-xs text-gray-300 mt-1 font-mono">{scannedDocName}</p>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-left text-xs font-mono text-blue-200">
              ✓ 142 pages indexed into Vector HNSW index.
            </div>

            <button
              onClick={handleAnalyze}
              className="w-full py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs shadow-[0_0_15px_rgba(37,99,235,0.4)]"
            >
              Analyze with Verified AI Assistant →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
