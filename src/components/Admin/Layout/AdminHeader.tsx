import React, { useState, useRef, useEffect } from 'react';
import { Menu, Search, Bell, ShieldCheck, Sun, Moon, LogOut, KeyRound, Settings, ChevronDown } from 'lucide-react';
import type { AdminTab } from './AdminSidebar';
import type { ThemeMode } from '../../../types';

interface AdminHeaderProps {
  activeTab: AdminTab;
  onToggleSidebar: () => void;
  onSwitchToUserApp: () => void;
  onSelectTab?: (tab: AdminTab) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

const TAB_TITLES: Record<AdminTab, { title: string; subtitle: string }> = {
  dashboard: {
    title: 'Dashboard Overview',
    subtitle: 'System performance, query metrics, and real-time knowledge health.',
  },
  users: {
    title: 'User Management',
    subtitle: 'Manage administrative roles, researcher accounts, and permissions.',
  },
  knowledge: {
    title: 'AI Knowledge Database',
    subtitle: 'Curate, verify, and dialect-tag Balochi vocabulary and grammar.',
  },
  sources: {
    title: 'Verified Sources & Citations',
    subtitle: 'Manage peer-reviewed manuscripts, dictionaries, and research publications.',
  },
  books: {
    title: 'Book Catalog & OCR Pipeline',
    subtitle: 'Upload, digitize, and index historical Balochi literature.',
  },
  reviews: {
    title: 'OCR Extraction Review Panel',
    subtitle: 'Side-by-side verification of original book scans vs AI extracted text.',
  },
  training: {
    title: 'AI Training & Model Tuning',
    subtitle: 'Evaluate AI responses, tune grounding parameters, and override templates.',
  },
  analytics: {
    title: 'Analytics & Usage Intelligence',
    subtitle: 'Query throughput, average response latency, and popular search topics.',
  },
  logs: {
    title: 'System Audit Logs',
    subtitle: 'Security event logs, administrative actions, and access history.',
  },
  settings: {
    title: 'Platform & Security Settings',
    subtitle: 'AI grounding parameters, citation rules, and admin session security.',
  },
};

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeTab,
  onToggleSidebar,
  onSwitchToUserApp,
  onSelectTab,
  theme,
  onToggleTheme,
}) => {
  const currentTab = TAB_TITLES[activeTab] || TAB_TITLES.dashboard;
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="surface sticky top-0 z-30 border-x-0 border-t-0 px-4 md:px-6 py-3.5 flex items-center justify-between gap-3">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden btn-soft p-2 rounded-xl cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base md:text-lg font-extrabold text-[var(--theme-text-main)] tracking-tight leading-none">
              {currentTab.title}
            </h1>
            <span className="accent-pill hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold">
              <ShieldCheck className="w-3 h-3" />
              Super Admin Verified
            </span>
          </div>
          <p className="text-xs text-[var(--theme-text-muted)] font-medium hidden sm:block mt-0.5">
            {currentTab.subtitle}
          </p>
        </div>
      </div>

      {/* Right: Search, Notifications, Theme Toggle, Profile */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Global Search Input */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--theme-card-elevated)] border border-[var(--theme-border)] text-xs text-[var(--theme-text-muted)] w-48 lg:w-60 focus-within:border-[var(--accent)]">
          <Search className="w-3.5 h-3.5 text-[var(--accent-strong-text)]" />
          <input
            type="text"
            placeholder="Search admin records..."
            className="w-full bg-transparent border-none text-xs text-[var(--theme-text-main)] placeholder:text-[var(--theme-text-muted)] focus:outline-none"
          />
        </div>

        {/* Theme Switcher Toggle */}
        <button
          onClick={onToggleTheme}
          className="btn-soft p-2 rounded-full transition-all cursor-pointer"
          title="Toggle Dark / Light Theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-[var(--accent-strong-text)]" />
          )}
        </button>

        {/* Notification Bell */}
        <button
          className="btn-soft relative p-2 rounded-full transition-all cursor-pointer"
          title="Notifications (340 Pending Reviews)"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-[var(--accent)] ring-2 ring-[var(--theme-card)] animate-pulse" />
        </button>

        {/* Admin Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="btn-soft flex items-center gap-2 p-1.5 rounded-full transition-all cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-[var(--accent)] border border-[var(--accent-border)] flex items-center justify-center text-white text-xs font-bold">
              AK
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-[11px] font-bold text-[var(--theme-text-main)] leading-none">Ahmed Khan</p>
              <p className="text-[9px] text-[var(--accent-strong-text)] font-mono">Super Admin</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[var(--theme-text-muted)]" />
          </button>

          {isProfileMenuOpen && (
            <div className="surface-elevated absolute right-0 mt-2 w-52 rounded-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 border-b border-[var(--theme-border)] mb-1">
                <p className="text-xs font-bold text-[var(--theme-text-main)]">Ahmed Khan Baloch</p>
                <p className="text-[10px] text-[var(--accent-strong-text)] font-mono">ahmed.khan@balochidigital.org</p>
              </div>

              <button
                onClick={() => {
                  if (onSelectTab) onSelectTab('settings');
                  setIsProfileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-[var(--theme-text-secondary)] hover:bg-[var(--theme-muted)] hover:text-[var(--theme-text-main)] transition-colors cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5 text-[var(--accent-strong-text)]" />
                <span>Account Settings</span>
              </button>

              <button
                onClick={() => {
                  if (onSelectTab) onSelectTab('settings');
                  setIsProfileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-[var(--theme-text-secondary)] hover:bg-[var(--theme-muted)] hover:text-[var(--theme-text-main)] transition-colors cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Security & 2FA</span>
              </button>

              <div className="border-t border-[var(--theme-border)] my-1" />

              <button
                onClick={() => {
                  setIsProfileMenuOpen(false);
                  onSwitchToUserApp();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-400 hover:bg-red-950/40 light:hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out Admin Session</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
