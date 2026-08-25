import React, { useState, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { Send, Paperclip, Mic, ShieldCheck, Sparkles } from 'lucide-react';
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
    e.target.style.height = `${Math.min(e.target.scrollHeight, 140)}px`;
  };

  return (
    <div className="sticky bottom-4 z-30 mx-3 md:mx-6 mt-3 max-w-3xl w-full self-center">
      {/* Modern Floating Chat Composer (ChatGPT / Gemini Level) */}
      <div className="rounded-[24px] p-3 md:p-3.5 bg-[#111827]/95 light:bg-[#FFFFFF] border border-white/10 light:border-[#E5E7EB] shadow-[0_10px_40px_rgba(7,11,20,0.6)] light:shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-200 focus-within:border-[#2563EB] focus-within:ring-4 focus-within:ring-[#2563EB]/10">
        <div className="flex items-end gap-2.5">
          {/* Document Upload Icon */}
          <button
            type="button"
            onClick={onOpenUpload}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-[#123B73] light:bg-slate-100/80 light:hover:bg-slate-200 text-gray-300 light:text-[#475569] hover:text-[#60A5FA] border border-white/10 light:border-slate-200 transition-all shrink-0 mb-0.5 cursor-pointer hover:scale-105"
            title="Upload Balochi Document or Scan"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          {/* Voice Prompt Simulation Icon */}
          <button
            type="button"
            onClick={onOpenVoice}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-[#123B73] light:bg-slate-100/80 light:hover:bg-slate-200 text-gray-300 light:text-[#475569] hover:text-[#60A5FA] border border-white/10 light:border-slate-200 transition-all shrink-0 mb-0.5 cursor-pointer hover:scale-105"
            title="Speak Query in Balochi"
          >
            <Mic className="w-4 h-4" />
          </button>

          {/* Main Textarea Input Field */}
          <div className="flex-1 min-w-0">
            <textarea
              ref={textareaRef}
              rows={1}
              value={text}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              placeholder={placeholder}
              className="w-full bg-transparent text-white light:text-[#111827] placeholder-gray-400 light:placeholder-[#6B7280] text-sm md:text-base focus:outline-none resize-none max-h-36 py-1.5 px-1 font-normal leading-relaxed"
            />
          </div>

          {/* Send Query Button Circle */}
          <button
            type="button"
            onClick={handleSend}
            disabled={!text.trim() || disabled}
            className={`p-2.5 rounded-full transition-all duration-200 shrink-0 mb-0.5 flex items-center justify-center cursor-pointer ${
              text.trim() && !disabled
                ? 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-[0_4px_16px_rgba(37,99,235,0.4)] scale-105 active:scale-95'
                : 'bg-white/5 light:bg-slate-100 text-gray-600 light:text-slate-400 border border-white/5 light:border-slate-200 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Bottom Input Footer Note */}
        <div className="mt-2.5 pt-2 border-t border-white/5 light:border-slate-100 flex items-center justify-between px-1 text-[11px] text-gray-400 light:text-[#6B7280] font-mono">
          <span className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Strict Grounding Active</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#2563EB]/20 light:bg-[#EFF6FF] text-[#60A5FA] light:text-[#1D4ED8] border border-[#2563EB]/30 light:border-[#BFDBFE]">
              98.4% Min Confidence
            </span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#2563EB]" />
            Enter to Send • Shift+Enter for New Line
          </span>
        </div>
      </div>
    </div>
  );
};
