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
      <nav className="rounded-2xl px-4 py-2.5 flex items-center justify-between shadow-[0_8px_32px_0_rgba(7,11,20,0.5)] border border-white/10 bg-[#0B1F3A]/95 backdrop-blur-xl transition-all">
        {/* Left Side: Sidebar toggle & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl bg-white/5 hover:bg-[#123B73] text-gray-300 hover:text-white border border-white/10 hover:border-[#2563EB]/40 transition-all"
            title="Toggle Sidebar"
          >
            <PanelLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2.5 cursor-pointer">
            {/* Balochi Digital Logo Symbol - Navy & Accent Blue */}
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#0B1F3A] to-[#2563EB] border border-[#60A5FA]/40 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              <Sparkles className="w-5 h-5 text-[#60A5FA] animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#60A5FA] ring-2 ring-[#070B14] animate-ping" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-extrabold tracking-tight text-white leading-none">
                  {appTitle}
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#2563EB]/20 text-[#60A5FA] border border-[#2563EB]/40">
                  <ShieldCheck className="w-3 h-3 text-[#60A5FA]" />
                  v2.4 Verified
                </span>
              </div>
              <p className="text-[11px] text-gray-300 font-medium">
                {appSubtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Center: Public User Navigation Items */}
        <div className="hidden xl:flex items-center gap-1 bg-[#070B14]/60 p-1 rounded-full border border-white/10 text-xs">
          <button
            onClick={() => setActivePublicTab('assistant')}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition-all flex items-center gap-1.5 ${
              activePublicTab === 'assistant'
                ? 'bg-[#2563EB] text-white font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)]'
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
                ? 'bg-[#2563EB] text-white font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)]'
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
                ? 'bg-[#2563EB] text-white font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)]'
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
                ? 'bg-[#2563EB] text-white font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)]'
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
                ? 'bg-[#2563EB] text-white font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)]'
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
            className="p-2 rounded-full bg-white/5 hover:bg-[#123B73] text-gray-300 hover:text-[#60A5FA] border border-white/10 hover:border-[#2563EB]/40 transition-all"
            title="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-[#60A5FA]" />
            )}
          </button>

          {/* Toggle Sources Drawer Quick Button */}
          <button
            onClick={onToggleSourcesDrawer}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white border border-[#2563EB]/50 text-xs font-bold transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] cursor-pointer"
            title="Open Verified Sources Drawer"
          >
            <span>Sources</span>
            {sourcesCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-white text-[#2563EB] text-[10px] font-extrabold flex items-center justify-center">
                {sourcesCount}
              </span>
            )}
          </button>

          {/* User Profile Avatar */}
          <div className="relative group cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0B1F3A] to-[#2563EB] p-0.5 shadow-[0_0_12px_rgba(37,99,235,0.4)]">
              <div className="w-full h-full rounded-full bg-[#070B14] flex items-center justify-center font-bold text-xs text-[#60A5FA]">
                BD
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#2563EB] ring-2 ring-[#070B14]" />
          </div>
        </div>
      </nav>
    </header>
  );
};
