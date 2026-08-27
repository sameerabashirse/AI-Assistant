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
    <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-md flex items-center justify-center p-4">
      <div className="surface-elevated w-full max-w-sm rounded-2xl p-6 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center">
          <span className="text-xs font-mono font-bold text-[var(--accent-strong-text)] uppercase tracking-wider">
            {MOCK_UI_STRINGS.voiceQuery[language]}
          </span>
          <button
            onClick={onClose}
            className="btn-soft p-1.5 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Animated Microphone Glow */}
        <div className="relative py-4">
          <div
            className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center transition-all ${
              isListening
                ? 'bg-[var(--theme-muted)] border-2 border-[var(--accent-border)] animate-pulse'
                : 'bg-[var(--accent)] text-white shadow-sm'
            }`}
          >
            <Mic className="w-10 h-10 text-white" />
          </div>

          {isListening && (
            <div className="mt-3 flex items-center justify-center gap-1">
              <span className="w-1.5 h-6 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="w-1.5 h-10 rounded-full bg-[var(--accent)] animate-pulse delay-100" />
              <span className="w-1.5 h-4 rounded-full bg-[var(--accent)] animate-pulse delay-200" />
            </div>
          )}
        </div>

        {/* Transcript Box */}
        <div className="p-4 rounded-xl bg-[var(--theme-muted)] border border-[var(--theme-border)] text-xs min-h-[70px] flex items-center justify-center font-medium">
          {isListening ? (
            <span className="text-[var(--theme-text-muted)] font-mono italic animate-pulse">
              Listening in {language.toUpperCase()}... Speak query clearly.
            </span>
          ) : (
            <span className="text-[var(--theme-text-main)] leading-relaxed font-serif text-sm">
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
              className="btn-soft py-2 px-3 rounded-xl font-bold text-xs"
            >
              Retry
            </button>
            <button
              onClick={handleConfirm}
              className="btn-primary py-2 px-5 rounded-xl font-bold text-xs"
            >
              Submit Query →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
