import React from 'react';
import { Menu, Search, Bell, ShieldCheck, UserCheck, ArrowRight } from 'lucide-react';
import type { AdminTab } from './AdminSidebar';

interface AdminHeaderProps {
  activeTab: AdminTab;
  onToggleSidebar: () => void;
  onSwitchToUserApp: () => void;
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
}) => {
  const currentTab = TAB_TITLES[activeTab] || TAB_TITLES.dashboard;

  return (
    <header className="sticky top-0 z-30 bg-[#080B0A]/90 border-b border-white/10 backdrop-blur-md px-4 md:px-6 py-3.5 flex items-center justify-between">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base md:text-lg font-black text-white tracking-tight leading-none">
              {currentTab.title}
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#0C3D06] text-[#1AFF00] border border-[#1AFF00]/30">
              <ShieldCheck className="w-3 h-3 text-[#1AFF00]" />
              Super Admin Verified
            </span>
          </div>
          <p className="text-xs text-gray-400 font-medium hidden sm:block mt-0.5">
            {currentTab.subtitle}
          </p>
        </div>
      </div>

      {/* Right: Search, Notifications, Admin Profile */}
      <div className="flex items-center gap-3">
        {/* Global Search */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111615] border border-white/10 text-xs text-gray-400 w-56 lg:w-64">
          <Search className="w-3.5 h-3.5 text-[#1AFF00]" />
          <input
            type="text"
            placeholder="Search admin records..."
            className="w-full bg-transparent border-none text-xs text-white placeholder-gray-500 focus:outline-none"
          />
        </div>

        {/* Notification Bell */}
        <button
          className="relative p-2 rounded-full bg-[#111615] hover:bg-[#0C3D06] text-gray-300 hover:text-[#1AFF00] border border-white/10 transition-all"
          title="Notifications (340 Pending Reviews)"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-[#1AFF00] ring-2 ring-[#080B0A]" />
        </button>

        {/* User Assistant Switcher */}
        <button
          onClick={onSwitchToUserApp}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0C3D06] hover:bg-[#16e000] text-[#1AFF00] hover:text-black border border-[#1AFF00]/40 text-xs font-semibold transition-all shadow-[0_0_12px_rgba(26,255,0,0.15)]"
        >
          <span>User AI Assistant</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {/* Admin Badge */}
        <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#111615] border border-white/10">
          <div className="w-7 h-7 rounded-full bg-[#0C3D06] border border-[#1AFF00]/50 flex items-center justify-center text-[#1AFF00] text-xs font-bold">
            <UserCheck className="w-4 h-4 text-[#1AFF00]" />
          </div>
          <div className="hidden xl:block text-left pr-2">
            <p className="text-[11px] font-bold text-white leading-none">Admin Control</p>
            <p className="text-[9px] text-[#1AFF00] font-mono">Verified Session</p>
          </div>
        </div>
      </div>
    </header>
  );
};
