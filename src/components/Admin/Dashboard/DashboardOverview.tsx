import React from 'react';
import {
  Users,
  MessageSquare,
  BookOpen,
  ShieldCheck,
  FileCheck2,
  Cpu,
  Plus,
  Upload,
  ArrowRight,
  Zap,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import { StatsCard } from './StatsCard';
import { MOCK_ADMIN_STATS, MOCK_SYSTEM_LOGS } from '../../../data/adminMockData';

interface DashboardOverviewProps {
  onNavigate: (tab: any) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      {/* 6 Key Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatsCard
          title="Total Users"
          value="1.2M"
          growth={MOCK_ADMIN_STATS.userGrowth}
          icon={<Users className="w-4 h-4 text-[#1AFF00]" />}
          subtitle="Registered accounts"
        />
        <StatsCard
          title="AI Queries"
          value="850K"
          growth={MOCK_ADMIN_STATS.queryGrowth}
          icon={<MessageSquare className="w-4 h-4 text-[#1AFF00]" />}
          subtitle="Total verified requests"
        />
        <StatsCard
          title="Verified Sources"
          value="25,430"
          growth={MOCK_ADMIN_STATS.sourcesGrowth}
          icon={<BookOpen className="w-4 h-4 text-[#1AFF00]" />}
          subtitle="Indexed manuscripts & papers"
        />
        <StatsCard
          title="AI Accuracy"
          value={`${MOCK_ADMIN_STATS.aiAccuracy}%`}
          growth={1.2}
          icon={<ShieldCheck className="w-4 h-4 text-[#1AFF00]" />}
          subtitle="Grounding audit rating"
        />
        <StatsCard
          title="Processed Books"
          value="1,240"
          growth={5.4}
          icon={<Cpu className="w-4 h-4 text-[#1AFF00]" />}
          subtitle="Digitized catalog items"
        />
        <StatsCard
          title="Pending Reviews"
          value="340"
          icon={<FileCheck2 className="w-4 h-4 text-amber-400" />}
          subtitle="Awaiting OCR approval"
        />
      </div>

      {/* Quick Actions & System Status Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Workflow Actions */}
        <div className="p-5 rounded-2xl bg-[#111615] border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#1AFF00]" />
              Quick Admin Actions
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            <button
              onClick={() => onNavigate('users')}
              className="w-full py-2.5 px-4 rounded-xl bg-[#0C3D06] hover:bg-[#16e000] text-[#1AFF00] hover:text-black border border-[#1AFF00]/30 font-bold text-xs transition-all flex items-center justify-between shadow-[0_0_15px_rgba(26,255,0,0.15)] group"
            >
              <span className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add New Administrator / Researcher
              </span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('books')}
              className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-[#0C3D06] text-gray-200 hover:text-[#1AFF00] border border-white/10 hover:border-[#1AFF00]/30 font-semibold text-xs transition-all flex items-center justify-between group"
            >
              <span className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#1AFF00]" />
                Upload New Manuscript PDF
              </span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('reviews')}
              className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-[#0C3D06] text-gray-200 hover:text-[#1AFF00] border border-white/10 hover:border-[#1AFF00]/30 font-semibold text-xs transition-all flex items-center justify-between group"
            >
              <span className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-[#1AFF00]" />
                Review OCR Extraction Queue (340)
              </span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Infrastructure & Engine Status */}
        <div className="p-5 rounded-2xl bg-[#111615] border border-white/10 space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#1AFF00]" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Engine Infrastructure Status
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#1AFF00]/15 text-[#1AFF00] border border-[#1AFF00]/30 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#1AFF00]" />
              All Systems Operational
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
              <p className="text-[11px] text-gray-400">Vector Index Uptime</p>
              <p className="text-xl font-bold text-[#1AFF00]">99.98%</p>
              <p className="text-[10px] text-gray-500 font-mono">HNSW Index v4.2</p>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
              <p className="text-[11px] text-gray-400">Avg Response Latency</p>
              <p className="text-xl font-bold text-white">320ms</p>
              <p className="text-[10px] text-emerald-400 font-mono">-15ms vs last week</p>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
              <p className="text-[11px] text-gray-400">OCR Pipeline Throughput</p>
              <p className="text-xl font-bold text-white">140 pgs/min</p>
              <p className="text-[10px] text-gray-500 font-mono">Parallel GPU Node</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#0C3D06]/30 border border-[#1AFF00]/20 text-xs text-gray-300 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#1AFF00]" />
              <span>Strict Knowledge Grounding Policy Enforced</span>
            </span>
            <button
              onClick={() => onNavigate('settings')}
              className="text-[#1AFF00] hover:underline font-bold text-[11px]"
            >
              Configure Policy →
            </button>
          </div>
        </div>
      </div>

      {/* Recent System Activity Stream Table */}
      <div className="p-5 rounded-2xl bg-[#111615] border border-white/10 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#1AFF00]" />
            Recent Administrative Audit Stream
          </h3>
          <button
            onClick={() => onNavigate('logs')}
            className="text-xs font-bold text-[#1AFF00] hover:underline flex items-center gap-1"
          >
            <span>View Full Audit Logs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 font-mono uppercase text-[10px]">
                <th className="py-2.5 px-3">Action Description</th>
                <th className="py-2.5 px-3">Administrator</th>
                <th className="py-2.5 px-3">Role</th>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {MOCK_SYSTEM_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3 font-semibold text-white">{log.action}</td>
                  <td className="py-3 px-3">{log.user}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-gray-300">
                      {log.role}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-gray-400">
                    {log.date} {log.time}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        log.status === 'Success'
                          ? 'bg-[#1AFF00]/15 text-[#1AFF00] border border-[#1AFF00]/30'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
