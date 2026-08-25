import React, { useState } from 'react';
import { Cpu, XCircle, ShieldCheck } from 'lucide-react';
import type { AITrainingItem } from '../../../types/admin';
import { MOCK_AI_TRAINING } from '../../../data/adminMockData';

export const AITrainingManager: React.FC = () => {
  const [items, setItems] = useState<AITrainingItem[]>(MOCK_AI_TRAINING);

  const handleApprove = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'Approved', evaluatedBy: 'Super Admin' } : item))
    );
  };

  const handleReject = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'Overridden', evaluatedBy: 'Super Admin' } : item))
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-[#111615] border border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#0C3D06] border border-[#1AFF00]/30 text-[#1AFF00]">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">AI Grounding & Model Response Tuning</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Review AI generated answers against source citations and tune strictness thresholds.
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#1AFF00]/15 text-[#1AFF00] border border-[#1AFF00]/30">
          Strict Mode: Enforced
        </span>
      </div>

      {/* Training Table */}
      <div className="rounded-2xl bg-[#111615] border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 font-mono uppercase text-[10px] bg-black/30">
                <th className="py-3 px-4">Question Prompt</th>
                <th className="py-3 px-4">Generated AI Response</th>
                <th className="py-3 px-4">Grounded Sources</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {items.map((trn) => (
                <tr key={trn.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white max-w-xs">{trn.question}</td>
                  <td className="py-3.5 px-4 max-w-sm leading-relaxed text-gray-200">{trn.aiAnswer}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1">
                      {trn.sources.map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-gray-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#1AFF00]">
                    {trn.confidenceScore}%
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        trn.status === 'Approved'
                          ? 'bg-[#1AFF00]/15 text-[#1AFF00] border border-[#1AFF00]/30'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      <ShieldCheck className="w-3 h-3 text-[#1AFF00]" />
                      {trn.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {trn.status !== 'Approved' && (
                        <button
                          onClick={() => handleApprove(trn.id)}
                          className="px-2.5 py-1 rounded-lg bg-[#0C3D06] hover:bg-[#16e000] text-[#1AFF00] hover:text-black font-bold text-[10px] border border-[#1AFF00]/30 transition-all"
                        >
                          Approve Template
                        </button>
                      )}
                      <button
                        onClick={() => handleReject(trn.id)}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-red-400"
                        title="Override AI Answer"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
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
