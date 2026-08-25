import React from 'react';
import { Sparkles, BookOpen, ScrollText, Compass, FileCheck, ArrowRight, ShieldCheck } from 'lucide-react';
import type { SuggestionCard, Language } from '../types';
import { MOCK_UI_STRINGS, SUGGESTIONS } from '../data/mockData';

interface WelcomeScreenProps {
  language: Language;
  onSelectSuggestion: (suggestion: SuggestionCard) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="w-5 h-5 text-[#60A5FA]" />,
  ScrollText: <ScrollText className="w-5 h-5 text-[#60A5FA]" />,
  Compass: <Compass className="w-5 h-5 text-[#60A5FA]" />,
  FileCheck: <FileCheck className="w-5 h-5 text-[#60A5FA]" />,
};

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  language,
  onSelectSuggestion,
}) => {
  const heroTitle = MOCK_UI_STRINGS.heroTitle[language];
  const heroSubtitle = MOCK_UI_STRINGS.heroSubtitle[language];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 max-w-4xl mx-auto w-full text-center my-auto animate-in fade-in zoom-in-95 duration-500">
      {/* Hero Visual Orb - Navy & Accent Blue */}
      <div className="relative mb-6">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-[#0B1F3A] via-[#123B73] to-[#2563EB] border-2 border-[#60A5FA] flex items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.5)] animate-pulse-glow">
          <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-white animate-pulse" />
        </div>
        <div className="absolute -bottom-2 right-0 px-2 py-0.5 rounded-full bg-[#0B1F3A] text-[#60A5FA] border border-[#2563EB]/50 text-[10px] font-mono font-bold flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-[#60A5FA]" />
          Verified AI
        </div>
      </div>

      {/* Hero Heading */}
      <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-2xl bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-[#60A5FA]">
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
          const icon = ICON_MAP[card.iconName] || <BookOpen className="w-5 h-5 text-[#60A5FA]" />;

          return (
            <button
              key={card.id}
              onClick={() => onSelectSuggestion(card)}
              className="group relative p-4 md:p-5 rounded-2xl bg-[#111827] hover:bg-[#172033] border border-white/10 hover:border-[#2563EB] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.3)] hover:-translate-y-1 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-xl bg-[#0B1F3A] border border-[#2563EB]/40 group-hover:scale-110 transition-transform">
                    {icon}
                  </div>
                  <span className="text-[10px] font-mono text-[#60A5FA] bg-[#2563EB]/15 px-2 py-0.5 rounded-full border border-[#2563EB]/30">
                    Featured
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-[#60A5FA] transition-colors leading-snug">
                  {titleText}
                </h3>
                <p className="mt-1 text-xs text-gray-400 font-normal leading-relaxed">
                  {subText}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs font-semibold text-[#60A5FA] group-hover:text-white pt-2 border-t border-white/5">
                <span>Ask Verified Assistant</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#2563EB]" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
