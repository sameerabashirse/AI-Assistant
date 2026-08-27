import React, { useState } from 'react';
import { Settings, Cpu, Save, CheckCircle2 } from 'lucide-react';
import { AdminSecuritySettings } from './AdminSecuritySettings';

export const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'ai' | 'security'>('general');

  const [platformName, setPlatformName] = useState('Balochi Digital');
  const [confidenceThreshold, setConfidenceThreshold] = useState(95);
  const [strictCitation, setStrictCitation] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('15 mins');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Sub Tabs */}
      <div className="flex gap-2 border-b border-[var(--theme-border)] pb-3 text-xs">
        <button
          onClick={() => setActiveTab('general')}
          className={`px-4 py-2 rounded-xl font-bold transition-all ${
            activeTab === 'general'
              ? 'accent-pill font-bold'
              : 'btn-soft'
          }`}
        >
          General Configuration
        </button>

        <button
          onClick={() => setActiveTab('ai')}
          className={`px-4 py-2 rounded-xl font-bold transition-all ${
            activeTab === 'ai'
              ? 'accent-pill font-bold'
              : 'btn-soft'
          }`}
        >
          AI Grounding & Confidence
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 rounded-xl font-bold transition-all ${
            activeTab === 'security'
              ? 'accent-pill font-bold'
              : 'btn-soft'
          }`}
        >
          Security & Admin Sessions
        </button>
      </div>

      {activeTab === 'security' ? (
        <AdminSecuritySettings />
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {savedSuccess && (
            <div className="p-4 rounded-xl bg-[var(--success-soft)] border border-[var(--success-text)] text-[var(--success-text)] font-bold text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-[var(--success-text)]" />
              <span>Platform Settings Saved Successfully!</span>
            </div>
          )}

          {activeTab === 'general' && (
            <div className="surface p-6 rounded-2xl border border-[var(--theme-border)] space-y-4 shadow-md">
              <h3 className="text-sm font-bold text-[var(--theme-text-main)] uppercase tracking-wider flex items-center gap-2 border-b border-[var(--theme-border)] pb-3">
                <Settings className="w-4 h-4 text-[var(--accent-strong-text)]" />
                General Platform Configuration
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[var(--theme-text-secondary)] font-semibold mb-1">Platform Public Title</label>
                  <input
                    type="text"
                    value={platformName}
                    onChange={(e) => setPlatformName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--theme-card)] border border-[var(--theme-border)] text-xs text-[var(--theme-text-main)] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block text-[var(--theme-text-secondary)] font-semibold mb-1">Default UI Language</label>
                  <select className="w-full px-3 py-2 rounded-xl bg-[var(--theme-card)] border border-[var(--theme-border)] text-xs text-[var(--theme-text-main)] focus:outline-none focus:border-[var(--accent)]">
                    <option value="english">English (Default)</option>
                    <option value="balochi">Balochi (بلوچی)</option>
                    <option value="roman">Roman Balochi</option>
                    <option value="urdu">Urdu (اردو)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[var(--theme-text-secondary)] font-semibold mb-1">Session Inactivity Timeout</label>
                  <select
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--theme-card)] border border-[var(--theme-border)] text-xs text-[var(--theme-text-main)] focus:outline-none focus:border-[var(--accent)]"
                  >
                    <option value="15 mins">15 Minutes Inactivity</option>
                    <option value="30 mins">30 Minutes Inactivity</option>
                    <option value="1 hour">1 Hour Inactivity</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="surface p-6 rounded-2xl border border-[var(--theme-border)] space-y-4 shadow-md">
              <h3 className="text-sm font-bold text-[var(--accent-strong-text)] uppercase tracking-wider flex items-center gap-2 border-b border-[var(--theme-border)] pb-3">
                <Cpu className="w-4 h-4 text-[var(--accent-strong-text)]" />
                AI Grounding & Confidence Policy
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[var(--theme-text-secondary)] font-semibold">Minimum Confidence Threshold</label>
                    <span className="font-mono font-bold text-[var(--accent-strong-text)]">{confidenceThreshold}%</span>
                  </div>
                  <input
                    type="range"
                    min={80}
                    max={99}
                    value={confidenceThreshold}
                    onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                    className="w-full accent-[var(--accent)]"
                  />
                  <p className="text-[10px] text-[var(--theme-text-muted)] mt-1">
                    Responses falling below {confidenceThreshold}% match will be flagged for expert OCR review before rendering.
                  </p>
                </div>

                <div className="surface-muted p-3.5 rounded-xl border border-[var(--theme-border-subtle)] flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[var(--theme-text-main)]">Strict Citation Enforcement</p>
                    <p className="text-[10px] text-[var(--theme-text-muted)]">Reject answers without exact book/page citation numbers.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={strictCitation}
                    onChange={(e) => setStrictCitation(e.target.checked)}
                    className="w-4 h-4 accent-[var(--accent)] cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn-primary py-3 px-6 rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Admin Settings</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
