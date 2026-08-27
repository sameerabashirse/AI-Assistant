'use client';

import React, { useState, useRef, useEffect } from 'react';
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
    <div className="sticky bottom-4 z-30 mx-3 md:mx-6 mt-3 max-w-3xl w-[calc(100%-1.5rem)] md:w-full self-center">
      {/* Modern Floating Chat Composer (ChatGPT / Gemini Level) */}
      <div className="surface rounded-[24px] p-3 md:p-3.5 transition-all duration-200 focus-within:border-[var(--accent-border)] focus-within:ring-4 focus-within:ring-[var(--accent-soft)]">
        <div className="flex items-end gap-2.5">
          {/* Document Upload Icon */}
          <button
            type="button"
            onClick={onOpenUpload}
            className="btn-soft p-2.5 rounded-xl transition-all shrink-0 mb-0.5 cursor-pointer hover:scale-[1.03]"
            title="Upload Balochi Document or Scan"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          {/* Voice Prompt Simulation Icon */}
          <button
            type="button"
            onClick={onOpenVoice}
            className="btn-soft p-2.5 rounded-xl transition-all shrink-0 mb-0.5 cursor-pointer hover:scale-[1.03]"
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
              className="w-full bg-transparent text-[var(--theme-text-main)] placeholder:text-[var(--theme-text-muted)] text-sm md:text-base focus:outline-none resize-none max-h-36 py-1.5 px-1 font-normal leading-relaxed"
            />
          </div>

          {/* Send Query Button Circle */}
          <button
            type="button"
            onClick={handleSend}
            disabled={!text.trim() || disabled}
            className={`p-2.5 rounded-full transition-all duration-200 shrink-0 mb-0.5 flex items-center justify-center cursor-pointer ${
              text.trim() && !disabled
                ? 'btn-primary scale-105 active:scale-95'
                : 'surface-muted text-[var(--theme-text-muted)] cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Bottom Input Footer Note */}
        <div className="mt-2.5 pt-2 border-t border-[var(--theme-border-subtle)] flex items-center justify-between px-1 text-[11px] text-[var(--theme-text-muted)] font-mono">
          <span className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-strong-text)]" />
            <span>Strict Grounding Active</span>
            <span className="accent-pill hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold">
              98.4% Min Confidence
            </span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[var(--accent-strong-text)]" />
            Enter to Send • Shift+Enter for New Line
          </span>
        </div>
      </div>
    </div>
  );
};
