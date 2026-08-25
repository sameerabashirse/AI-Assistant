import React, { useState } from 'react';
import { Settings, Cpu, KeyRound, Save, CheckCircle2 } from 'lucide-react';

export const AdminSettings: React.FC = () => {
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
    <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
      {/* Save Toast Notification */}
      {savedSuccess && (
        <div className="p-4 rounded-xl bg-[#0C3D06] border border-[#1AFF00] text-[#1AFF00] font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(26,255,0,0.3)] animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-[#1AFF00]" />
          <span>Platform Settings & Grounding Policy Saved Successfully!</span>
        </div>
      )}

      {/* General Settings Section */}
      <div className="p-6 rounded-2xl bg-[#111615] border border-white/10 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/10 pb-3">
          <Settings className="w-4 h-4 text-[#1AFF00]" />
          General Platform Configuration
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Platform Public Title</label>
            <input
              type="text"
              value={platformName}
              onChange={(e) => setPlatformName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-[#1AFF00]"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Default UI Language</label>
            <select className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#1AFF00]">
              <option value="english">English (Default)</option>
              <option value="balochi">Balochi (بلوچی)</option>
              <option value="roman">Roman Balochi</option>
              <option value="urdu">Urdu (اردو)</option>
            </select>
          </div>
        </div>
      </div>

      {/* AI Grounding Settings */}
      <div className="p-6 rounded-2xl bg-[#111615] border border-white/10 space-y-4">
        <h3 className="text-sm font-bold text-[#1AFF00] uppercase tracking-wider flex items-center gap-2 border-b border-white/10 pb-3">
          <Cpu className="w-4 h-4 text-[#1AFF00]" />
          AI Grounding & Confidence Policy
        </h3>

        <div className="space-y-4 text-xs">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-gray-300 font-semibold">Minimum Confidence Threshold</label>
              <span className="font-mono font-bold text-[#1AFF00]">{confidenceThreshold}%</span>
            </div>
            <input
              type="range"
              min={80}
              max={99}
              value={confidenceThreshold}
              onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
              className="w-full accent-[#1AFF00]"
            />
            <p className="text-[10px] text-gray-400 mt-1">
              Responses falling below {confidenceThreshold}% match will be flagged for expert OCR review before rendering.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
            <div>
              <p className="font-bold text-white">Strict Citation Enforcement</p>
              <p className="text-[10px] text-gray-400">Reject answers without exact book/page citation numbers.</p>
            </div>
            <input
              type="checkbox"
              checked={strictCitation}
              onChange={(e) => setStrictCitation(e.target.checked)}
              className="w-4 h-4 accent-[#1AFF00]"
            />
          </div>
        </div>
      </div>

      {/* Security & Admin Session Settings */}
      <div className="p-6 rounded-2xl bg-[#111615] border border-white/10 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/10 pb-3">
          <KeyRound className="w-4 h-4 text-[#1AFF00]" />
          Admin Session & Security Policy
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Inactivity Session Timeout</label>
            <select
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#1AFF00]"
            >
              <option value="15 mins">15 Minutes (Strict)</option>
              <option value="30 mins">30 Minutes</option>
              <option value="1 hour">1 Hour</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Super Admin 2FA Policy</label>
            <input
              type="text"
              disabled
              value="Mandatory Hardware/TOTP Enabled"
              className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-gray-400 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="py-3 px-6 rounded-xl bg-[#1AFF00] hover:bg-[#16e000] text-black font-bold text-xs transition-all shadow-[0_0_20px_rgba(26,255,0,0.3)] flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Admin Settings</span>
        </button>
      </div>
    </form>
  );
};
