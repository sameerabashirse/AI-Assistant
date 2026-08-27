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
        className={`surface fixed lg:static top-0 left-0 z-50 h-full w-64 border-r flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header Logo */}
        <div className="p-4 border-b border-[var(--theme-border)] bg-[var(--theme-card-elevated)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="accent-pill w-9 h-9 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-[var(--theme-text-main)] leading-tight">
                Balochi Digital
              </h2>
              <span className="text-[10px] text-[var(--accent-strong-text)] font-mono font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Admin Control Panel
              </span>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="lg:hidden btn-soft p-1.5 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase text-[var(--theme-text-muted)] tracking-wider">
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
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'accent-pill font-bold'
                    : 'text-[var(--theme-text-muted)] hover:bg-[var(--theme-muted)] hover:text-[var(--theme-text-main)]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-[var(--accent-strong-text)]' : 'text-[var(--theme-text-muted)]'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      isActive
                        ? 'bg-[var(--accent)] text-white font-extrabold'
                        : 'surface-muted text-[var(--theme-text-secondary)]'
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
        <div className="p-3 border-t border-[var(--theme-border)] space-y-2 bg-[var(--theme-card-elevated)]">
          <button
            onClick={onSwitchToUserApp}
            className="btn-soft w-full py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public App</span>
          </button>

          <div className="surface-muted p-2.5 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[var(--accent)] p-0.5">
                <div className="w-full h-full rounded-full bg-[var(--theme-card)] flex items-center justify-center text-[10px] font-bold text-[var(--accent-strong-text)]">
                  AK
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[var(--theme-text-main)] truncate">Ahmed Khan</p>
                <p className="text-[10px] text-[var(--accent-strong-text)] font-mono">Super Admin</p>
              </div>
            </div>

            <button
              onClick={onSwitchToUserApp}
              className="p-1.5 rounded-lg hover:bg-[var(--theme-muted)] text-[var(--theme-text-muted)] hover:text-red-400 cursor-pointer"
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
