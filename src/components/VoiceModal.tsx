import React, { useState, useEffect } from 'react';
import { X, Mic, Sparkles } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#071705] border border-[#1AFF00]/30 rounded-2xl p-6 shadow-2xl text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center">
          <span className="text-xs font-mono font-bold text-[#1AFF00] uppercase tracking-wider">
            {MOCK_UI_STRINGS.voiceQuery[language]}
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Animated Mic Sphere */}
        <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
          <div
            className={`w-20 h-20 rounded-full bg-[#0C3D06] border-2 border-[#1AFF00] flex items-center justify-center shadow-[0_0_30px_rgba(26,255,0,0.4)] ${
              isListening ? 'animate-pulse' : ''
            }`}
          >
            <Mic className={`w-8 h-8 text-[#1AFF00] ${isListening ? 'animate-bounce' : ''}`} />
          </div>

          {/* Glowing waveform animation rings */}
          {isListening && (
            <>
              <div className="absolute inset-0 rounded-full border border-[#1AFF00] animate-ping opacity-40" />
              <div className="absolute -inset-2 rounded-full border border-[#1AFF00] animate-ping opacity-20" />
            </>
          )}
        </div>

        <div>
          <h4 className="text-sm font-bold text-white">
            {isListening ? 'Listening for speech input...' : 'Voice Transcribed Successfully'}
          </h4>
          <p className="text-xs text-gray-400 mt-1">
            {isListening
              ? 'Speak your question in Balochi, English or Urdu'
              : 'Review transcribed query below:'}
          </p>
        </div>

        {/* Transcript Result Box */}
        <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-emerald-200 italic min-h-[60px] flex items-center justify-center">
          {isListening ? (
            <div className="flex items-center gap-1.5 text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1AFF00] animate-ping" />
              <span>Listening to audio waveform...</span>
            </div>
          ) : (
            <span>"{transcript}"</span>
          )}
        </div>

        {!isListening && (
          <button
            onClick={handleConfirm}
            className="w-full py-2.5 px-4 rounded-xl bg-[#1AFF00] hover:bg-[#16e000] text-black font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(26,255,0,0.3)]"
          >
            <Sparkles className="w-4 h-4" />
            <span>Send Spoken Query</span>
          </button>
        )}
      </div>
    </div>
  );
};
