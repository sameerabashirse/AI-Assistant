'use client';

import React, { useState } from 'react';
import { Sparkles, Copy, Check, Volume2, RefreshCw, BookOpen, ShieldCheck } from 'lucide-react';
import type { Message, Citation, Language } from '../types';
import { VerifiedBadge } from './VerifiedBadge';
import { VerificationMetricsCard } from './VerificationMetricsCard';
import { CitationCard } from './CitationCard';

interface AIResponseCardProps {
  message: Message;
  language: Language;
  onOpenSources: (citations?: Citation[]) => void;
  onOpenEvidence: (citation?: Citation) => void;
  onSelectCitation: (citation: Citation) => void;
  onRegenerate?: () => void;
}

export const AIResponseCard: React.FC<AIResponseCardProps> = ({
  message,
  language,
  onOpenSources,
  onOpenEvidence,
  onSelectCitation,
  onRegenerate,
}) => {
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(message.text.replace(/[#*`]/g, ''));
        utterance.rate = 0.95;
        utterance.onend = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
      }
    }
  };

  // Helper function to render text with highlighted terms & clickable citation pills
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');

    return lines.map((line, idx) => {
      if (line.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-base md:text-lg font-bold text-[var(--theme-text-main)] mt-4 mb-2 flex items-center gap-2 border-b border-[var(--theme-border-subtle)] pb-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            {line.replace('### ', '')}
          </h3>
        );
      }
      if (line.startsWith('#### ')) {
        return (
          <h4 key={idx} className="text-sm md:text-base font-bold text-[var(--accent-strong-text)] mt-3 mb-1.5">
            {line.replace('#### ', '')}
          </h4>
        );
      }
      if (line.startsWith('* ') || line.startsWith('- ')) {
        return (
          <li key={idx} className="ml-4 list-disc text-[var(--theme-text-secondary)] my-1 leading-relaxed">
            {line.substring(2)}
          </li>
        );
      }
      if (line.startsWith('> ')) {
        return (
          <blockquote key={idx} className="my-3 p-3 rounded-xl bg-[var(--theme-muted)] border-l-4 border-[var(--accent)] italic text-xs md:text-sm text-[var(--theme-text-secondary)] font-serif">
            {line.replace('> ', '')}
          </blockquote>
        );
      }
      if (line.trim() === '') {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p key={idx} className="text-sm text-[var(--theme-text-secondary)] leading-7 my-1.5 font-normal">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="surface w-full rounded-2xl p-5 md:p-6 animate-in fade-in duration-300">
      {/* AI Card Header */}
      <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-[var(--theme-border-subtle)]">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-xl bg-[var(--accent)] border border-[var(--accent-border)] flex items-center justify-center shadow-sm">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-[var(--theme-text-main)]">AI Assistant</span>
              <span className="text-[10px] text-[var(--theme-text-muted)] font-mono">{message.timestamp}</span>
            </div>
            <p className="text-[11px] text-[var(--accent-strong-text)] font-medium">Balochi Knowledge Engine</p>
          </div>
        </div>

        {/* Verified Answer Badge */}
        {message.verification && (
          <VerifiedBadge
            language={language}
            score={message.verification.confidenceScore}
          />
        )}
      </div>

      {/* Streaming Indicator if response is loading */}
      {message.isStreaming ? (
        <div className="py-6 flex items-center gap-3 text-sm text-[var(--accent-strong-text)]">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] typing-dot-1" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] typing-dot-2" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] typing-dot-3" />
          </div>
          <span className="font-mono text-xs animate-pulse">
            Cross-referencing 14 verified Balochi manuscripts & dictionaries...
          </span>
        </div>
      ) : (
        <>
          {/* Main Answer Content */}
          <div className="max-w-none text-sm md:text-base leading-relaxed">
            {renderFormattedText(message.text)}
          </div>

          {/* Inline Citation Pills */}
          {message.citations && message.citations.length > 0 && (
            <div className="mt-4 pt-3 border-t border-[var(--theme-border-subtle)] flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[var(--theme-text-muted)] mr-1 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-[var(--accent-strong-text)]" />
                Sources:
              </span>
              {message.citations.map((cit, i) => (
                <CitationCard
                  key={cit.id}
                  citation={cit}
                  index={i + 1}
                  onSelect={onSelectCitation}
                />
              ))}
            </div>
          )}

          {/* Metrics & Action Bar */}
          <div className="mt-5 pt-3 border-t border-[var(--theme-border-subtle)] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenSources(message.citations)}
                className="accent-pill px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>View Sources ({message.citations?.length || 0})</span>
              </button>

              <button
                onClick={() => onOpenEvidence(message.citations?.[0])}
                className="btn-soft px-3 py-1.5 rounded-xl font-medium transition-all flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Audit Evidence</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleSpeak}
                className={`p-2 rounded-xl border transition-all ${
                  isPlayingAudio
                    ? 'btn-primary'
                    : 'btn-soft'
                }`}
                title="Read AI Answer Aloud"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleCopy}
                className="btn-soft p-2 rounded-xl transition-all"
                title="Copy Answer Text"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[var(--accent-strong-text)]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              {onRegenerate && (
                <button
                  onClick={onRegenerate}
                  className="btn-soft p-2 rounded-xl transition-all"
                  title="Regenerate Answer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Extended Metrics Card */}
          {message.verification && (
            <div className="mt-4">
              <VerificationMetricsCard verification={message.verification} language={language} />
            </div>
          )}
        </>
      )}
    </div>
  );
};
