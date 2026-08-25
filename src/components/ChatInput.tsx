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
      <div className="glass-panel rounded-[30px] p-2 md:p-3 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-[#1AFF00]/30 transition-all focus-within:border-[#1AFF00] focus-within:shadow-[0_0_30px_rgba(26,255,0,0.2)]">
        <div className="flex items-end gap-2">
          {/* Document Upload Button */}
          <button
            type="button"
            onClick={onOpenUpload}
            className="p-2.5 rounded-full bg-black/30 hover:bg-[#0C3D06] text-gray-300 hover:text-[#1AFF00] border border-white/10 hover:border-[#1AFF00]/40 transition-all shrink-0 mb-1"
            title="Upload Balochi Document or Scan"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          {/* Voice Search Button */}
          <button
            type="button"
            onClick={onOpenVoice}
            className="p-2.5 rounded-full bg-black/30 hover:bg-[#0C3D06] text-gray-300 hover:text-[#1AFF00] border border-white/10 hover:border-[#1AFF00]/40 transition-all shrink-0 mb-1"
            title="Voice Search"
          >
            <Mic className="w-4 h-4" />
          </button>

          {/* Auto-expanding Textarea */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={text}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className="flex-1 bg-transparent border-none text-sm md:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-0 resize-none py-2 px-2 max-h-32 min-h-[40px] leading-relaxed"
          />

          {/* Send Button */}
          <button
            type="button"
            onClick={handleSend}
            disabled={!text.trim() || disabled}
            className={`p-3 rounded-full transition-all duration-300 shrink-0 mb-1 flex items-center justify-center ${
              text.trim() && !disabled
                ? 'bg-[#1AFF00] hover:bg-[#16e000] text-black shadow-[0_0_20px_#1AFF00] scale-105 cursor-pointer'
                : 'bg-white/10 text-gray-500 cursor-not-allowed border border-white/5'
            }`}
            title="Send Query"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Footer info pill inside input container */}
        <div className="mt-2 px-3 pt-1 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-400 font-mono">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#1AFF00]" />
            Strict Knowledge Verification Engine Active
          </span>
          <span className="hidden sm:inline">
            Press <kbd className="text-gray-300 bg-white/10 px-1 rounded">Enter ↵</kbd> to send, <kbd className="text-gray-300 bg-white/10 px-1 rounded">Shift + Enter</kbd> for line
          </span>
        </div>
      </div>
    </div>
  );
};
