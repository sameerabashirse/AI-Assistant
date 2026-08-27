'use client';

import React, { useState, useEffect } from 'react';
import { X, Mic } from 'lucide-react';
import type { Language } from '../types';
import { MOCK_UI_STRINGS } from '../data/mockData';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendVoiceQuery: (query: string) => void;
  language: Language;
}

export const VoiceModal: React.FC<VoiceModalProps> = ({
  isOpen,
  onClose,
  onSendVoiceQuery,
  language,
}) => {
  const [isListening, setIsListening] = useState(true);
  const [transcript, setTranscript] = useState('');

  const sampleTranscripts: Record<Language, string> = {
    english: 'What is the exact meaning of the Balochi word Zahirok in classical music?',
    balochi: 'بلوچی لبز ظہیروک ئے لبزانکی مانا چی انت؟',
    roman: 'Balochi labz Zahirok ay labzanki mana che ent?',
    urdu: 'بلوچی لفظ ظہیروک کے لغوی معنی کیا ہیں؟',
  };

  useEffect(() => {
    if (isOpen) {
      setIsListening(true);
      setTranscript('');

      const timer = setTimeout(() => {
        setTranscript(sampleTranscripts[language] || sampleTranscripts.english);
        setIsListening(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, language]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (transcript) {
      onSendVoiceQuery(transcript);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#111827] border border-[#2563EB]/40 rounded-2xl p-6 shadow-2xl text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center">
          <span className="text-xs font-mono font-bold text-[#60A5FA] uppercase tracking-wider">
            {MOCK_UI_STRINGS.voiceQuery[language]}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Animated Microphone Glow */}
        <div className="relative py-4">
          <div
            className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center transition-all ${
              isListening
                ? 'bg-[#0B1F3A] border-2 border-[#2563EB] shadow-[0_0_40px_rgba(37,99,235,0.6)] animate-pulse'
                : 'bg-[#2563EB] text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]'
            }`}
          >
            <Mic className="w-10 h-10 text-white" />
          </div>

          {isListening && (
            <div className="mt-3 flex items-center justify-center gap-1">
              <span className="w-1.5 h-6 rounded-full bg-[#2563EB] animate-pulse" />
              <span className="w-1.5 h-10 rounded-full bg-[#60A5FA] animate-pulse delay-100" />
              <span className="w-1.5 h-4 rounded-full bg-[#2563EB] animate-pulse delay-200" />
            </div>
          )}
        </div>

        {/* Transcript Box */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs min-h-[70px] flex items-center justify-center font-medium">
          {isListening ? (
            <span className="text-gray-400 font-mono italic animate-pulse">
              Listening in {language.toUpperCase()}... Speak query clearly.
            </span>
          ) : (
            <span className="text-white leading-relaxed font-serif text-sm">
              "{transcript}"
            </span>
          )}
        </div>

        {!isListening && (
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => {
                setIsListening(true);
                setTranscript('');
              }}
              className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-bold text-xs"
            >
              Retry
            </button>
            <button
              onClick={handleConfirm}
              className="py-2 px-5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs shadow-[0_0_15px_rgba(37,99,235,0.4)]"
            >
              Submit Query →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
