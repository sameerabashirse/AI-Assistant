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
      <div className="rounded-[24px] md:rounded-[30px] p-2.5 md:p-3.5 shadow-[0_10px_40px_rgba(7,11,20,0.6)] light:shadow-[0_10px_40px_rgba(15,23,42,0.12)] border border-white/10 light:border-[#CBD5E1] transition-all focus-within:border-[#2563EB] focus-within:shadow-[0_0_0_4px_rgba(37,99,235,0.15)] bg-[#111827]/95 light:bg-[#FFFFFF] backdrop-blur-xl">
        <div className="flex items-end gap-2.5">
          {/* Document Upload Button */}
          <button
            type="button"
            onClick={onOpenUpload}
            className="p-2.5 rounded-full bg-white/5 hover:bg-[#123B73] light:bg-slate-100 light:hover:bg-slate-200 text-gray-300 light:text-[#475569] hover:text-[#60A5FA] border border-white/10 light:border-slate-200 transition-all shrink-0 mb-1 cursor-pointer"
            title="Upload Balochi Document or Scan"
          >
            <Paperclip className="w-4.5 h-4.5" />
          </button>

          {/* Voice Prompt Simulation */}
          <button
            type="button"
            onClick={onOpenVoice}
            className="p-2.5 rounded-full bg-white/5 hover:bg-[#123B73] light:bg-slate-100 light:hover:bg-slate-200 text-gray-300 light:text-[#475569] hover:text-[#60A5FA] border border-white/10 light:border-slate-200 transition-all shrink-0 mb-1 cursor-pointer"
            title="Speak Query in Balochi"
          >
            <Mic className="w-4.5 h-4.5" />
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
              className="w-full bg-transparent text-white light:text-[#0F172A] placeholder-gray-400 light:placeholder-[#64748B] text-sm md:text-base focus:outline-none resize-none max-h-32 py-2 px-1 font-normal leading-relaxed"
            />
          </div>

          {/* Send Query Button */}
          <button
            type="button"
            onClick={handleSend}
            disabled={!text.trim() || disabled}
            className={`p-3 rounded-full transition-all shrink-0 mb-1 flex items-center justify-center cursor-pointer ${
              text.trim() && !disabled
                ? 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-[0_0_20px_rgba(37,99,235,0.5)] scale-105'
                : 'bg-white/5 light:bg-slate-100 text-gray-600 light:text-slate-400 border border-white/5 light:border-slate-200 cursor-not-allowed'
            }`}
          >
            <Send className="w-4.5 h-4.5 text-white" />
          </button>
        </div>

        {/* Bottom Input Footer Note */}
        <div className="mt-2.5 pt-2 border-t border-white/5 light:border-slate-100 flex items-center justify-between px-2 text-[11px] text-gray-400 light:text-[#64748B] font-mono">
          <span className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Strict Grounding Active</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#2563EB]/20 light:bg-[#DBEAFE] text-[#60A5FA] light:text-[#1D4ED8] border border-[#2563EB]/30 light:border-[#93C5FD]">
              98% Min Confidence
            </span>
          </span>
          <span className="hidden sm:inline">Press Enter to Send • Shift+Enter for New Line</span>
        </div>
      </div>
    </div>
  );
};
