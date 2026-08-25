import React from 'react';
import { User } from 'lucide-react';
import type { Message, Citation, Language } from '../types';
import { AIResponseCard } from './AIResponseCard';

interface ChatMessageProps {
  message: Message;
  language: Language;
  onOpenSources: (citations?: Citation[]) => void;
  onOpenEvidence: (citation?: Citation) => void;
  onSelectCitation: (citation: Citation) => void;
  onRegenerate?: () => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  language,
  onOpenSources,
  onOpenEvidence,
  onSelectCitation,
  onRegenerate,
}) => {
  if (message.sender === 'user') {
    return (
      <div className="flex justify-end my-4 animate-in fade-in duration-200">
        <div className="flex items-start gap-3 max-w-2xl">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0C3D06] to-[#051902] text-white border border-[#1AFF00]/30 shadow-[0_4px_20px_rgba(12,61,6,0.5)]">
            <p className="text-sm md:text-base leading-relaxed font-medium">
              {message.text}
            </p>
            <div className="mt-1.5 text-right">
              <span className="text-[10px] text-emerald-300 font-mono">
                {message.timestamp}
              </span>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-emerald-900 border border-[#1AFF00]/40 flex items-center justify-center text-white shrink-0 shadow-lg">
            <User className="w-4 h-4 text-[#1AFF00]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-6">
      <AIResponseCard
        message={message}
        language={language}
        onOpenSources={onOpenSources}
        onOpenEvidence={onOpenEvidence}
        onSelectCitation={onSelectCitation}
        onRegenerate={onRegenerate}
      />
    </div>
  );
};
