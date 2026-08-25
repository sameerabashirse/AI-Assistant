import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle2, Sparkles, Loader2 } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#071705] border border-[#1AFF00]/30 rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-[#1AFF00]/20 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#0C3D06] border border-[#1AFF00]/40 text-[#1AFF00]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                {MOCK_UI_STRINGS.uploadDoc[language]}
              </h3>
              <p className="text-xs text-emerald-400 font-mono">
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
              handleSimulatedUpload(file ? file.name : undefined);
            }}
            onClick={() => handleSimulatedUpload()}
            className={`p-8 rounded-xl border-2 border-dashed transition-all cursor-pointer text-center space-y-3 ${
              isDragging
                ? 'border-[#1AFF00] bg-[#0C3D06]/50 shadow-[0_0_20px_rgba(26,255,0,0.3)]'
                : 'border-white/20 hover:border-[#1AFF00]/60 bg-black/30 hover:bg-[#0C3D06]/30'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-[#0C3D06] border border-[#1AFF00]/40 flex items-center justify-center mx-auto text-[#1AFF00] shadow-[0_0_15px_rgba(26,255,0,0.2)]">
              <Upload className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                Drag & Drop Balochi Manuscript or Scan
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Supports PDF, PNG, JPG scans, and TXT files (Max 50MB)
              </p>
            </div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#1AFF00]/10 text-[#1AFF00] border border-[#1AFF00]/30">
              Click to browse files
            </span>
          </div>
        )}

        {uploadingState === 'scanning' && (
          <div className="py-10 text-center space-y-4">
            <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
              <Loader2 className="w-12 h-12 text-[#1AFF00] animate-spin" />
              <div className="absolute inset-0 rounded-full border-2 border-[#1AFF00] animate-ping opacity-30" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                Scanning "{scannedDocName}"...
              </p>
              <p className="text-xs text-emerald-400 font-mono mt-1">
                Applying OCR & Cross-referencing Vector Database...
              </p>
            </div>
          </div>
        )}

        {uploadingState === 'success' && (
          <div className="p-4 rounded-xl bg-[#0C3D06]/60 border border-[#1AFF00]/40 space-y-3">
            <div className="flex items-center gap-2 text-[#1AFF00]">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm font-bold text-white">
                Document Digitized Successfully!
              </span>
            </div>
            <div className="p-3 rounded-lg bg-black/40 text-xs font-mono space-y-1 text-gray-300">
              <p className="text-white font-bold">{scannedDocName}</p>
              <p>• 42 Pages Extracted</p>
              <p>• Language Identified: Balochi (Classical Verse)</p>
              <p>• 99.1% Optical OCR Confidence</p>
            </div>

            <button
              onClick={handleAnalyze}
              className="w-full py-2.5 px-4 rounded-xl bg-[#1AFF00] hover:bg-[#16e000] text-black font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(26,255,0,0.3)]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI Assistant About This Document</span>
            </button>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={onClose}
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
