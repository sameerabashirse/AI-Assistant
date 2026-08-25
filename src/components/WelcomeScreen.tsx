import React from 'react';
import { Sparkles, BookOpen, ScrollText, Compass, FileCheck, ArrowRight, ShieldCheck } from 'lucide-react';
import type { SuggestionCard, Language } from '../types';
import { MOCK_UI_STRINGS, SUGGESTIONS } from '../data/mockData';

interface WelcomeScreenProps {
  language: Language;
  onSelectSuggestion: (suggestion: SuggestionCard) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="w-5 h-5 text-[#1AFF00]" />,
  ScrollText: <ScrollText className="w-5 h-5 text-[#1AFF00]" />,
  Compass: <Compass className="w-5 h-5 text-[#1AFF00]" />,
  FileCheck: <FileCheck className="w-5 h-5 text-[#1AFF00]" />,
};

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  language,
  onSelectSuggestion,
}) => {
  const heroTitle = MOCK_UI_STRINGS.heroTitle[language];
  const heroSubtitle = MOCK_UI_STRINGS.heroSubtitle[language];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 max-w-4xl mx-auto w-full text-center my-auto animate-in fade-in zoom-in-95 duration-500">
      {/* Hero Visual Orb */}
      <div className="relative mb-6">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-b from-[#0C3D06] to-black border-2 border-[#1AFF00] flex items-center justify-center shadow-[0_0_50px_rgba(26,255,0,0.4)] animate-pulse-glow">
          <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-[#1AFF00] animate-pulse" />
        </div>
        <div className="absolute -bottom-2 right-0 px-2 py-0.5 rounded-full bg-[#0C3D06] text-[#1AFF00] border border-[#1AFF00]/50 text-[10px] font-mono font-bold flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-[#1AFF00]" />
          Verified AI
        </div>
      </div>

      {/* Hero Heading */}
      <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-2xl bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-100 to-[#1AFF00]">
        {heroTitle}
      </h2>

      {/* Hero Subtitle */}
      <p className="mt-3 text-sm md:text-base text-gray-300 max-w-xl font-normal leading-relaxed">
        {heroSubtitle}
      </p>

      {/* Suggestions Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left">
        {SUGGESTIONS.map((card) => {
          const titleText = card.title[language] || card.title.english;
          const subText = card.subtitle[language] || card.subtitle.english;
          const icon = ICON_MAP[card.iconName] || <BookOpen className="w-5 h-5 text-[#1AFF00]" />;

          return (
            <button
              key={card.id}
              onClick={() => onSelectSuggestion(card)}
              className="group relative p-4 md:p-5 rounded-2xl bg-gradient-to-br from-[#0C3D06]/40 to-black/50 hover:from-[#0C3D06] hover:to-[#051902] border border-[#1AFF00]/20 hover:border-[#1AFF00] backdrop-blur-md transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(26,255,0,0.25)] hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-[#0C3D06] border border-[#1AFF00]/30 shadow-[0_0_10px_rgba(26,255,0,0.2)] group-hover:scale-110 transition-transform">
                    {icon}
                  </div>
                  <span className="text-[10px] uppercase font-mono font-bold text-[#1AFF00]/70 px-2 py-0.5 rounded bg-[#1AFF00]/10 border border-[#1AFF00]/20">
                    Verified Query
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-white group-hover:text-[#1AFF00] transition-colors leading-snug">
                  {titleText}
                </h3>
                <p className="mt-1.5 text-xs text-gray-400 group-hover:text-gray-200 line-clamp-2 leading-relaxed">
                  {subText}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-end text-xs font-bold text-[#1AFF00] opacity-80 group-hover:opacity-100">
                <span className="mr-1 text-[11px]">Ask Assistant</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
