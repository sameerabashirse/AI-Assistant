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
          <h3 key={idx} className="text-base md:text-lg font-bold text-white mt-4 mb-2 flex items-center gap-2 border-b border-[#6366F1]/20 pb-1">
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
            {line.replace('### ', '')}
          </h3>
        );
      }
      if (line.startsWith('#### ')) {
        return (
          <h4 key={idx} className="text-sm md:text-base font-bold text-[#A78BFA] mt-3 mb-1.5">
            {line.replace('#### ', '')}
          </h4>
        );
      }
      if (line.startsWith('* ') || line.startsWith('- ')) {
        return (
          <li key={idx} className="ml-4 list-disc text-gray-200 my-1 leading-relaxed">
            {line.substring(2)}
          </li>
        );
      }
      if (line.startsWith('> ')) {
        return (
          <blockquote key={idx} className="my-3 p-3 rounded-xl bg-black/40 border-l-4 border-[#8B5CF6] italic text-xs md:text-sm text-indigo-200 font-serif">
            {line.replace('> ', '')}
          </blockquote>
        );
      }
      if (line.trim() === '') {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p key={idx} className="text-sm text-gray-100 leading-relaxed my-1.5 font-normal">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-[#18181B]/90 via-[#1E1B4B]/30 to-[#09090B]/90 border border-[#6366F1]/30 backdrop-blur-xl p-5 md:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] animate-in fade-in duration-300">
      {/* AI Card Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#6366F1]/20">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#1E1B4B] to-[#6366F1] border border-[#8B5CF6]/50 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)]">
            <Sparkles className="w-5 h-5 text-[#A78BFA]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-white">AI Assistant</span>
              <span className="text-[10px] text-gray-400 font-mono">{message.timestamp}</span>
            </div>
            <p className="text-[11px] text-[#A78BFA] font-medium">Balochi Knowledge Engine</p>
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
        <div className="py-6 flex items-center gap-3 text-sm text-[#A78BFA]">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6] typing-dot-1" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6] typing-dot-2" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6] typing-dot-3" />
          </div>
          <span className="font-mono text-xs animate-pulse">
            Cross-referencing 14 verified Balochi manuscripts & dictionaries...
          </span>
        </div>
      ) : (
        <>
          {/* Main Answer Content */}
          <div className="prose prose-invert max-w-none text-sm md:text-base leading-relaxed">
            {renderFormattedText(message.text)}
          </div>

          {/* Inline Citation Pills */}
          {message.citations && message.citations.length > 0 && (
            <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-gray-400 mr-1 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-[#A78BFA]" />
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
          <div className="mt-5 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenSources(message.citations)}
                className="px-3 py-1.5 rounded-xl bg-[#6366F1]/20 hover:bg-[#6366F1]/30 text-[#A78BFA] border border-[#6366F1]/40 font-bold transition-all flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>View Sources ({message.citations?.length || 0})</span>
              </button>

              <button
                onClick={() => onOpenEvidence(message.citations?.[0])}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 font-medium transition-all flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>Audit Evidence</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleSpeak}
                className={`p-2 rounded-xl border transition-all ${
                  isPlayingAudio
                    ? 'bg-[#8B5CF6] text-white border-[#8B5CF6]'
                    : 'bg-white/5 hover:bg-white/10 text-gray-300 border-white/10'
                }`}
                title="Read AI Answer Aloud"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleCopy}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-all"
                title="Copy Answer Text"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#8B5CF6]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              {onRegenerate && (
                <button
                  onClick={onRegenerate}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-all"
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
