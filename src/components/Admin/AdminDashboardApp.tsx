'use client';

import React, { useState } from 'react';
import { AdminSidebar } from './Layout/AdminSidebar';
import type { AdminTab } from './Layout/AdminSidebar';
import { AdminHeader } from './Layout/AdminHeader';
import { DashboardOverview } from './Dashboard/DashboardOverview';
import { UserManagement } from './Users/UserManagement';
import { KnowledgeDatabase } from './Knowledge/KnowledgeDatabase';
import { SourceManagement } from './Sources/SourceManagement';
import { BookManagement } from './Books/BookManagement';
import { OCRReviewPanel } from './Review/OCRReviewPanel';
import { AITrainingManager } from './Training/AITrainingManager';
import { AnalyticsDashboard } from './Analytics/AnalyticsDashboard';
import { SystemLogsTable } from './Logs/SystemLogsTable';
import { AdminSettings } from './Settings/AdminSettings';

import type { ThemeMode } from '../../types';

interface AdminDashboardAppProps {
  onSwitchToUserApp: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

const VALID_TABS: AdminTab[] = [
  'dashboard',
  'users',
  'knowledge',
  'sources',
  'books',
  'reviews',
  'training',
  'analytics',
  'logs',
  'settings',
];

const getTabFromUrl = (): AdminTab => {
  if (typeof window === 'undefined') return 'dashboard';
  const hash = window.location.hash;
  const pathname = window.location.pathname;
  const path = hash ? hash.replace(/^#/, '') : pathname;
  const parts = path.split('/').filter(Boolean);
  if (parts[0] === 'admin' && parts[1]) {
    if (VALID_TABS.includes(parts[1] as AdminTab)) {
      return parts[1] as AdminTab;
    }
  }
  return 'dashboard';
};

export const AdminDashboardApp: React.FC<AdminDashboardAppProps> = ({
  onSwitchToUserApp,
  theme,
  onToggleTheme,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>(getTabFromUrl);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleSelectTab = (tab: AdminTab) => {
    setActiveTab(tab);
    window.location.hash = `#/admin/${tab}`;
  };

  React.useEffect(() => {
    const syncTabFromUrl = () => {
      const currentTab = getTabFromUrl();
      setActiveTab(currentTab);
    };

    window.addEventListener('hashchange', syncTabFromUrl);
    window.addEventListener('popstate', syncTabFromUrl);
    return () => {
      window.removeEventListener('hashchange', syncTabFromUrl);
      window.removeEventListener('popstate', syncTabFromUrl);
    };
  }, []);

  return (
    <div className="premium-shell min-h-screen bg-[var(--admin-bg)] text-[var(--theme-text-main)] flex overflow-hidden font-sans selection:bg-[var(--accent)] selection:text-white">
      {/* Left Navigation Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onSwitchToUserApp={onSwitchToUserApp}
        isOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Admin Workspace Area */}
      <div className="flex-1 flex flex-col justify-between min-w-0 h-screen overflow-hidden">
        <AdminHeader
          activeTab={activeTab}
          onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onSwitchToUserApp={onSwitchToUserApp}
          onSelectTab={handleSelectTab}
          theme={theme}
          onToggleTheme={onToggleTheme}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6">
          {activeTab === 'dashboard' && (
            <DashboardOverview onNavigate={handleSelectTab} />
          )}

          {activeTab === 'users' && <UserManagement />}

          {activeTab === 'knowledge' && <KnowledgeDatabase />}

          {activeTab === 'sources' && <SourceManagement />}

          {activeTab === 'books' && <BookManagement />}

          {activeTab === 'reviews' && <OCRReviewPanel />}

          {activeTab === 'training' && <AITrainingManager />}

          {activeTab === 'analytics' && <AnalyticsDashboard />}

          {activeTab === 'logs' && <SystemLogsTable />}

          {activeTab === 'settings' && <AdminSettings />}
        </main>
      </div>
    </div>
  );
};
