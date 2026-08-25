import React, { useState, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { Send, Paperclip, Mic, ShieldCheck } from 'lucide-react';
import type { Language } from '../types';
import { MOCK_UI_STRINGS } from '../data/mockData';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  onOpenUpload: () => void;
  onOpenVoice: () => void;
  language: Language;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onOpenUpload,
  onOpenVoice,
  language,
  disabled = false,
}) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const placeholder = MOCK_UI_STRINGS.inputPlaceholder[language];

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (text.trim() && !disabled) {
      onSendMessage(text.trim());
      setText('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  return (
    <div className="sticky bottom-4 z-30 mx-3 md:mx-6 mt-2 max-w-4xl w-full self-center">
      <div className="glass-panel rounded-[30px] p-2 md:p-3 shadow-[0_10px_40px_rgba(0,0,0,0.6)] border border-[#6366F1]/30 transition-all focus-within:border-[#8B5CF6] focus-within:shadow-[0_0_30px_rgba(139,92,246,0.25)] bg-[#18181B]/90 backdrop-blur-xl">
        <div className="flex items-end gap-2">
          {/* Document Upload Button */}
          <button
            type="button"
            onClick={onOpenUpload}
            className="p-2.5 rounded-full bg-white/5 hover:bg-[#6366F1]/20 text-gray-300 hover:text-[#A78BFA] border border-white/10 hover:border-[#6366F1]/40 transition-all shrink-0 mb-1 cursor-pointer"
            title="Upload Balochi Document or Scan"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          {/* Voice Prompt Simulation */}
          <button
            type="button"
            onClick={onOpenVoice}
            className="p-2.5 rounded-full bg-white/5 hover:bg-[#6366F1]/20 text-gray-300 hover:text-[#A78BFA] border border-white/10 hover:border-[#6366F1]/40 transition-all shrink-0 mb-1 cursor-pointer"
            title="Speak Query in Balochi"
          >
            <Mic className="w-4 h-4" />
          </button>

          {/* Main Textarea Input */}
          <div className="flex-1 min-w-0">
            <textarea
              ref={textareaRef}
              rows={1}
              value={text}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              placeholder={placeholder}
              className="w-full bg-transparent text-white placeholder-gray-400 text-xs md:text-sm focus:outline-none resize-none max-h-32 py-2 px-1 font-normal leading-relaxed"
            />
          </div>

          {/* Send Query Button */}
          <button
            type="button"
            onClick={handleSend}
            disabled={!text.trim() || disabled}
            className={`p-3 rounded-full transition-all shrink-0 mb-1 flex items-center justify-center cursor-pointer ${
              text.trim() && !disabled
                ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#4F46E5] hover:to-[#7C3AED] text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] scale-105'
                : 'bg-white/5 text-gray-600 border border-white/5 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Input Footer Note */}
        <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between px-2 text-[10px] text-gray-400 font-mono">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#A78BFA]" />
            Strict Grounding Active (98% Min Confidence)
          </span>
          <span className="hidden sm:inline">Press Enter to Send • Shift+Enter for New Line</span>
        </div>
      </div>
    </div>
  );
};
