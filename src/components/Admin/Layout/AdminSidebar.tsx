import React from 'react';
import {
  LayoutDashboard,
  Users,
  Database,
  BookOpen,
  FileCheck2,
  Cpu,
  BarChart3,
  ShieldAlert,
  Settings,
  Sparkles,
  LogOut,
  ChevronLeft,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';

export type AdminTab =
  | 'dashboard'
  | 'users'
  | 'knowledge'
  | 'sources'
  | 'books'
  | 'reviews'
  | 'training'
  | 'analytics'
  | 'logs'
  | 'settings';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onSwitchToUserApp: () => void;
  isOpen: boolean;
  onCloseMobile: () => void;
}

const NAV_ITEMS: { id: AdminTab; label: string; icon: React.ReactNode; badge?: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { id: 'users', label: 'User Management', icon: <Users className="w-4 h-4" />, badge: '5' },
  { id: 'knowledge', label: 'AI Knowledge', icon: <Database className="w-4 h-4" /> },
  { id: 'sources', label: 'Verified Sources', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'books', label: 'Book Catalog', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'reviews', label: 'OCR Reviews', icon: <FileCheck2 className="w-4 h-4" />, badge: '340' },
  { id: 'training', label: 'AI Training', icon: <Cpu className="w-4 h-4" /> },
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
  { id: 'logs', label: 'System Audit Logs', icon: <ShieldAlert className="w-4 h-4" /> },
  { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
  onSwitchToUserApp,
  isOpen,
  onCloseMobile,
}) => {
  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-full w-64 bg-[#070B14] border-r border-white/10 flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header Logo */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0B1F3A] border border-[#2563EB]/50 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.3)]">
              <Sparkles className="w-5 h-5 text-[#60A5FA]" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white leading-tight">
                Balochi Digital
              </h2>
              <span className="text-[10px] text-[#60A5FA] font-mono font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#60A5FA]" />
                Admin Portal
              </span>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase text-gray-500 tracking-wider">
            Control Center
          </div>

          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  if (window.innerWidth < 1024) onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#102A56] text-[#60A5FA] border border-[#2563EB]/50 shadow-[0_0_15px_rgba(37,99,235,0.2)] font-bold'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-[#60A5FA]' : 'text-gray-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      isActive
                        ? 'bg-[#2563EB] text-white font-extrabold'
                        : 'bg-white/10 text-gray-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Section: Admin Profile & Return */}
        <div className="p-3 border-t border-white/10 space-y-2 bg-[#0A0E1A]">
          <button
            onClick={onSwitchToUserApp}
            className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-[#102A56] text-gray-300 hover:text-[#60A5FA] border border-white/10 hover:border-[#2563EB]/30 text-xs font-semibold transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to User AI App</span>
          </button>

          <div className="p-2.5 rounded-xl bg-[#111827] border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0B1F3A] to-[#2563EB] p-0.5">
                <div className="w-full h-full rounded-full bg-[#070B14] flex items-center justify-center text-[10px] font-bold text-[#60A5FA]">
                  AK
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">Ahmed Khan</p>
                <p className="text-[10px] text-[#60A5FA] font-mono">Super Admin</p>
              </div>
            </div>

            <button
              onClick={onSwitchToUserApp}
              className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-red-400"
              title="Sign Out Admin Session"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
