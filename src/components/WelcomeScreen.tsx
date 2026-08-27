'use client';

import React from 'react';
import { Sparkles, BookOpen, ScrollText, Compass, FileCheck, ArrowRight, ShieldCheck } from 'lucide-react';
import type { SuggestionCard, Language } from '../types';
import { MOCK_UI_STRINGS, SUGGESTIONS } from '../data/mockData';

interface WelcomeScreenProps {
  language: Language;
  onSelectSuggestion: (suggestion: SuggestionCard) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="w-5 h-5 text-[var(--accent-strong-text)]" />,
  ScrollText: <ScrollText className="w-5 h-5 text-[var(--accent-strong-text)]" />,
  Compass: <Compass className="w-5 h-5 text-[var(--accent-strong-text)]" />,
  FileCheck: <FileCheck className="w-5 h-5 text-[var(--accent-strong-text)]" />,
};

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  language,
  onSelectSuggestion,
}) => {
  const heroTitle = MOCK_UI_STRINGS.heroTitle[language];
  const heroSubtitle = MOCK_UI_STRINGS.heroSubtitle[language];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 max-w-4xl mx-auto w-full text-center my-auto animate-in fade-in zoom-in-95 duration-500">
      {/* Assistant identity mark */}
      <div className="relative mb-6">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[var(--accent)] border border-[var(--accent-border)] flex items-center justify-center shadow-md animate-pulse-glow">
          <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-white" />
        </div>
        <div className="accent-pill absolute -bottom-2 right-0 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" />
          Verified AI
        </div>
      </div>

      {/* Hero Heading */}
      <h2 className="text-3xl md:text-5xl font-black text-[var(--theme-text-main)] tracking-tight leading-tight max-w-2xl">
        {heroTitle}
      </h2>

      {/* Hero Subtitle */}
      <p className="mt-3 text-sm md:text-base text-[var(--theme-text-secondary)] max-w-xl font-normal leading-relaxed">
        {heroSubtitle}
      </p>

      {/* Suggestions Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left">
        {SUGGESTIONS.map((card) => {
          const titleText = card.title[language] || card.title.english;
          const subText = card.subtitle[language] || card.subtitle.english;
          const icon = ICON_MAP[card.iconName] || <BookOpen className="w-5 h-5 text-[#2563EB]" />;

          return (
            <button
              key={card.id}
              onClick={() => onSelectSuggestion(card)}
              className="surface group relative p-4 md:p-5 rounded-2xl hover:border-[var(--accent-border)] transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="surface-muted p-2 rounded-xl text-[var(--accent-strong-text)] group-hover:scale-105 transition-transform">
                    {icon}
                  </div>
                  <span className="accent-pill text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full">
                    Featured
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[var(--theme-text-main)] group-hover:text-[var(--accent-strong-text)] transition-colors leading-snug">
                  {titleText}
                </h3>
                <p className="mt-1 text-xs text-[var(--theme-text-muted)] font-normal leading-relaxed">
                  {subText}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs font-semibold text-[var(--accent-strong-text)] pt-2.5 border-t border-[var(--theme-border-subtle)]">
                <span>Ask Verified Assistant</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
