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

export const AdminDashboardApp: React.FC<AdminDashboardAppProps> = ({
  onSwitchToUserApp,
  theme,
  onToggleTheme,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--admin-bg)] text-white flex overflow-hidden font-sans selection:bg-[#2563EB] selection:text-white">
      {/* Left Navigation Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
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
          onSelectTab={setActiveTab}
          theme={theme}
          onToggleTheme={onToggleTheme}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6">
          {activeTab === 'dashboard' && (
            <DashboardOverview onNavigate={(tab) => setActiveTab(tab)} />
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
