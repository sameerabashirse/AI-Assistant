import React, { useState } from 'react';
import { Sparkles, Sun, Moon, PanelLeft, ShieldCheck, BookOpen, Compass, Library, Info } from 'lucide-react';
import type { Language, ThemeMode } from '../types';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MOCK_UI_STRINGS } from '../data/mockData';

interface NavbarProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onToggleSidebar: () => void;
  onToggleSourcesDrawer: () => void;
  sourcesCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  theme,
  onToggleTheme,
  onToggleSidebar,
  onToggleSourcesDrawer,
  sourcesCount = 0,
}) => {
  const [activePublicTab, setActivePublicTab] = useState<'assistant' | 'research' | 'sources' | 'library' | 'about'>('assistant');

  const appTitle = MOCK_UI_STRINGS.appTitle[currentLanguage];
  const appSubtitle = MOCK_UI_STRINGS.appSubtitle[currentLanguage];

  return (
    <header className="sticky top-3 z-40 mx-3 md:mx-6 my-2">
      <nav className="glass-panel rounded-2xl px-4 py-2.5 flex items-center justify-between shadow-[0_8px_32px_0_rgba(99,102,241,0.25)] border border-[#6366F1]/30 transition-all bg-[#18181B]/90 backdrop-blur-xl">
        {/* Left Side: Sidebar toggle & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl bg-white/5 hover:bg-[#6366F1]/20 text-gray-300 hover:text-[#8B5CF6] border border-white/10 hover:border-[#6366F1]/40 transition-all"
            title="Toggle Sidebar"
          >
            <PanelLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2.5 cursor-pointer">
            {/* Balochi Digital Logo Symbol - Violet & Indigo Theme */}
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#1E1B4B] to-[#6366F1] border border-[#8B5CF6]/50 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.4)]">
              <Sparkles className="w-5 h-5 text-[#A78BFA] animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#8B5CF6] ring-2 ring-[#09090B] animate-ping" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-extrabold tracking-tight text-white leading-none">
                  {appTitle}
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#6366F1]/20 text-[#A78BFA] border border-[#6366F1]/40">
                  <ShieldCheck className="w-3 h-3 text-[#A78BFA]" />
                  v2.4 Verified
                </span>
              </div>
              <p className="text-[11px] text-gray-400 font-medium">
                {appSubtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Center: Public User Navigation Items */}
        <div className="hidden xl:flex items-center gap-1 bg-black/40 p-1 rounded-full border border-white/10 text-xs">
          <button
            onClick={() => setActivePublicTab('assistant')}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition-all flex items-center gap-1.5 ${
              activePublicTab === 'assistant'
                ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-bold shadow-[0_0_12px_rgba(99,102,241,0.4)]'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Assistant</span>
          </button>

          <button
            onClick={() => setActivePublicTab('research')}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition-all flex items-center gap-1.5 ${
              activePublicTab === 'research'
                ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-bold shadow-[0_0_12px_rgba(99,102,241,0.4)]'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Research</span>
          </button>

          <button
            onClick={() => {
              setActivePublicTab('sources');
              onToggleSourcesDrawer();
            }}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition-all flex items-center gap-1.5 ${
              activePublicTab === 'sources'
                ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-bold shadow-[0_0_12px_rgba(99,102,241,0.4)]'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Verified Sources</span>
          </button>

          <button
            onClick={() => setActivePublicTab('library')}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition-all flex items-center gap-1.5 ${
              activePublicTab === 'library'
                ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-bold shadow-[0_0_12px_rgba(99,102,241,0.4)]'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Library className="w-3.5 h-3.5" />
            <span>Library</span>
          </button>

          <button
            onClick={() => setActivePublicTab('about')}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition-all flex items-center gap-1.5 ${
              activePublicTab === 'about'
                ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-bold shadow-[0_0_12px_rgba(99,102,241,0.4)]'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>About</span>
          </button>
        </div>

        {/* Right Side: Language, Theme, Sources Drawer, Profile */}
        <div className="flex items-center gap-2 md:gap-3">
          <LanguageSwitcher
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
          />

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-full bg-white/5 hover:bg-[#6366F1]/20 text-gray-300 hover:text-[#A78BFA] border border-white/10 hover:border-[#6366F1]/40 transition-all"
            title="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-[#A78BFA]" />
            )}
          </button>

          {/* Toggle Sources Drawer Quick Button */}
          <button
            onClick={onToggleSourcesDrawer}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#6366F1] hover:bg-[#4F46E5] text-white border border-[#8B5CF6]/50 text-xs font-bold transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)] cursor-pointer"
            title="Open Verified Sources Drawer"
          >
            <span>Sources</span>
            {sourcesCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-white text-[#6366F1] text-[10px] font-extrabold flex items-center justify-center">
                {sourcesCount}
              </span>
            )}
          </button>

          {/* User Profile Avatar */}
          <div className="relative group cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#6366F1] to-[#8B5CF6] p-0.5 shadow-[0_0_12px_rgba(139,92,246,0.4)]">
              <div className="w-full h-full rounded-full bg-[#09090B] flex items-center justify-center font-bold text-xs text-[#A78BFA]">
                BD
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#8B5CF6] ring-2 ring-[#09090B]" />
          </div>
        </div>
      </nav>
    </header>
  );
};
