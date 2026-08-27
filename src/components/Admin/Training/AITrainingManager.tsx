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
      <div className="surface p-5 rounded-2xl border border-[var(--theme-border)] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl surface-muted text-[var(--accent-strong-text)]">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[var(--theme-text-main)]">AI Grounding & Model Response Tuning</h3>
            <p className="text-xs text-[var(--theme-text-muted)] mt-0.5">
              Review AI generated answers against source citations and tune strictness thresholds.
            </p>
          </div>
        </div>

        <span className="accent-pill px-3 py-1 rounded-full text-xs font-mono font-bold">
          Strict Mode: Enforced
        </span>
      </div>

      <div className="surface rounded-2xl border border-[var(--theme-border)] overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[var(--theme-border)] text-[var(--theme-text-muted)] font-mono uppercase text-[10px] bg-[var(--theme-muted)]">
                <th className="py-3 px-4">Question Prompt</th>
                <th className="py-3 px-4">Generated AI Response</th>
                <th className="py-3 px-4">Grounded Sources</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--theme-border-subtle)] text-[var(--theme-text-secondary)]">
              {items.map((trn) => (
                <tr key={trn.id} className="hover:bg-[var(--accent-soft)] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[var(--theme-text-main)] max-w-xs">{trn.question}</td>
                  <td className="py-3.5 px-4 max-w-sm leading-relaxed text-[var(--theme-text-secondary)]">{trn.aiAnswer}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1">
                      {trn.sources.map((s, idx) => (
                        <span key={idx} className="accent-pill px-2 py-0.5 rounded text-[10px] font-mono font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[var(--accent-strong-text)]">
                    {trn.confidenceScore}%
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        trn.status === 'Approved'
                          ? 'bg-[var(--success-soft)] text-[var(--success-text)] border border-[var(--success-text)]/30'
                          : 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
                      }`}
                    >
                      <ShieldCheck className="w-3 h-3" />
                      {trn.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {trn.status !== 'Approved' && (
                        <button
                          onClick={() => handleApprove(trn.id)}
                          className="btn-primary px-2.5 py-1 rounded-lg font-bold text-[10px] transition-all cursor-pointer"
                        >
                          Approve Template
                        </button>
                      )}
                      <button
                        onClick={() => handleReject(trn.id)}
                        className="btn-soft p-1.5 rounded-lg text-[var(--theme-text-muted)] hover:text-red-500 cursor-pointer"
                        title="Override AI Answer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
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
