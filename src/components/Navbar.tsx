import React from 'react';
import { Sparkles, Sun, Moon, Search, PanelLeft, ShieldCheck, ShieldAlert } from 'lucide-react';
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
  onOpenAdmin: () => void;
  sourcesCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  theme,
  onToggleTheme,
  onToggleSidebar,
  onToggleSourcesDrawer,
  onOpenAdmin,
  sourcesCount = 0,
}) => {
  const appTitle = MOCK_UI_STRINGS.appTitle[currentLanguage];
  const appSubtitle = MOCK_UI_STRINGS.appSubtitle[currentLanguage];

  return (
    <header className="sticky top-3 z-40 mx-3 md:mx-6 my-2">
      <nav className="glass-panel rounded-2xl px-4 py-2.5 flex items-center justify-between shadow-[0_8px_32px_0_rgba(12,61,6,0.37)] border border-[#1AFF00]/25 transition-all">
        {/* Left Side: Sidebar toggle & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl bg-black/20 hover:bg-[#0C3D06] text-gray-300 hover:text-[#1AFF00] border border-white/10 hover:border-[#1AFF00]/30 transition-all"
            title="Toggle Sidebar"
          >
            <PanelLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2.5 cursor-pointer">
            {/* Balochi Digital Logo Symbol */}
            <div className="relative w-9 h-9 rounded-xl bg-[#0C3D06] border border-[#1AFF00]/50 flex items-center justify-center shadow-[0_0_15px_rgba(26,255,0,0.3)]">
              <Sparkles className="w-5 h-5 text-[#1AFF00] animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#1AFF00] ring-2 ring-[#071705] animate-ping" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-extrabold tracking-tight text-white leading-none">
                  {appTitle}
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#0C3D06] text-[#1AFF00] border border-[#1AFF00]/30">
                  <ShieldCheck className="w-3 h-3 text-[#1AFF00]" />
                  v2.4 Verified
                </span>
              </div>
              <p className="text-[11px] text-gray-300 font-medium">
                {appSubtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Center: Search / Status Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 border border-white/10 text-xs text-gray-400">
          <Search className="w-3.5 h-3.5 text-[#1AFF00]" />
          <span>Search verified manuscripts & dictionary items...</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-gray-300 font-mono">
            ⌘K
          </kbd>
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
            className="p-2 rounded-full bg-black/20 hover:bg-[#0C3D06] text-gray-300 hover:text-[#1AFF00] border border-white/10 hover:border-[#1AFF00]/40 transition-all"
            title="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-[#1AFF00]" />
            )}
          </button>

          {/* Toggle Sources Drawer Quick Button */}
          <button
            onClick={onToggleSourcesDrawer}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0C3D06] hover:bg-[#16e000] text-[#1AFF00] hover:text-black border border-[#1AFF00]/40 text-xs font-semibold transition-all shadow-[0_0_12px_rgba(26,255,0,0.15)]"
            title="Open Verified Sources Drawer"
          >
            <span>Sources</span>
            {sourcesCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#1AFF00] text-black text-[10px] font-extrabold flex items-center justify-center">
                {sourcesCount}
              </span>
            )}
          </button>

          {/* Admin Control Panel Switcher */}
          <button
            onClick={onOpenAdmin}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#0C3D06] text-gray-200 hover:text-[#1AFF00] border border-white/10 hover:border-[#1AFF00]/40 text-xs font-semibold transition-all"
            title="Open Admin Control Panel"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#1AFF00]" />
            <span>Admin Portal</span>
          </button>

          {/* Profile Avatar */}
          <div className="relative group cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0C3D06] to-[#1AFF00] p-0.5 shadow-[0_0_10px_rgba(26,255,0,0.3)]">
              <div className="w-full h-full rounded-full bg-[#071705] flex items-center justify-center font-bold text-xs text-[#1AFF00]">
                BD
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#1AFF00] ring-2 ring-[#071705]" />
          </div>
        </div>
      </nav>
    </header>
  );
};
