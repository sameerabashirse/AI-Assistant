'use client';

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
      <nav className="surface rounded-2xl px-3.5 md:px-4 py-2.5 flex items-center justify-between gap-3 transition-all">
        {/* Left Side: Sidebar toggle & Logo */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onToggleSidebar}
            className="btn-soft p-2 rounded-xl transition-all cursor-pointer shrink-0"
            title="Toggle Sidebar"
          >
            <PanelLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2.5 cursor-pointer min-w-0">
            {/* Balochi Digital Logo Symbol - Navy & Accent Blue */}
            <div className="relative w-9 h-9 rounded-xl bg-[var(--accent)] border border-[var(--accent-border)] flex items-center justify-center shadow-sm shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[var(--success-text)] ring-2 ring-[var(--theme-card)]" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-sm md:text-base font-extrabold tracking-tight text-[var(--theme-text-main)] leading-none truncate">
                  {appTitle}
                </h1>
                <span className="hidden sm:inline-flex accent-pill items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                  <ShieldCheck className="w-3 h-3" />
                  v2.4 Verified
                </span>
              </div>
              <p className="hidden sm:block text-[11px] text-[var(--theme-text-muted)] font-medium truncate">
                {appSubtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Center: Public User Navigation Items */}
        <div className="hidden xl:flex items-center gap-1 surface-muted p-1 rounded-full text-xs">
          <button
            onClick={() => setActivePublicTab('assistant')}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition-all flex items-center gap-1.5 ${
              activePublicTab === 'assistant'
                ? 'btn-primary font-bold'
                : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-main)]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Assistant</span>
          </button>

          <button
            onClick={() => setActivePublicTab('research')}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition-all flex items-center gap-1.5 ${
              activePublicTab === 'research'
                ? 'btn-primary font-bold'
                : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-main)]'
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
                ? 'btn-primary font-bold'
                : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-main)]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Verified Sources</span>
          </button>

          <button
            onClick={() => setActivePublicTab('library')}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition-all flex items-center gap-1.5 ${
              activePublicTab === 'library'
                ? 'btn-primary font-bold'
                : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-main)]'
            }`}
          >
            <Library className="w-3.5 h-3.5" />
            <span>Library</span>
          </button>

          <button
            onClick={() => setActivePublicTab('about')}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition-all flex items-center gap-1.5 ${
              activePublicTab === 'about'
                ? 'btn-primary font-bold'
                : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-main)]'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>About</span>
          </button>
        </div>

        {/* Right Side: Language, Theme, Sources Drawer, Profile */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <LanguageSwitcher
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
          />

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="btn-soft p-2 rounded-full transition-all cursor-pointer"
            title="Toggle Light / Dark Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-[#2563EB]" />
            )}
          </button>

          {/* Toggle Sources Drawer Quick Button */}
          <button
            onClick={onToggleSourcesDrawer}
            className="btn-primary hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer"
            title="Open Verified Sources Drawer"
          >
            <span>Sources</span>
            {sourcesCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-white text-[#2563EB] text-[10px] font-extrabold flex items-center justify-center">
                {sourcesCount}
              </span>
            )}
          </button>

          {/* Admin Portal Quick Link */}
          <button
            onClick={() => {
              window.location.hash = '#/admin/login';
            }}
            className="btn-soft flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer"
            title="Open Admin Portal"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Admin</span>
          </button>

          {/* User Profile Avatar */}
          <div className="relative group cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-[var(--accent)] p-0.5 shadow-sm">
              <div className="w-full h-full rounded-full bg-[var(--theme-card)] flex items-center justify-center font-bold text-xs text-[var(--accent-strong-text)]">
                BD
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[var(--success-text)] ring-2 ring-[var(--theme-card)]" />
          </div>
        </div>
      </nav>
    </header>
  );
};
