import React, { useState } from 'react';
import { KeyRound, ShieldCheck, Smartphone, Laptop, CheckCircle2, Save } from 'lucide-react';

export const AdminSecuritySettings: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [saveToast, setSaveToast] = useState(false);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || newPassword !== confirmPassword) return;
    setSaveToast(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setSaveToast(false), 2500);
  };

  const activeSessions = [
    { device: 'Windows PC (Chrome 128)', location: 'Quetta, PK', ip: '192.168.1.42', current: true, time: 'Active now' },
    { device: 'MacBook Pro (Safari 17)', location: 'Karachi, PK', ip: '192.168.1.18', current: false, time: '2 hours ago' },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      {saveToast && (
        <div className="p-4 rounded-xl bg-[var(--success-soft)] border border-[var(--success-text)] text-[var(--success-text)] font-bold text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-[var(--success-text)]" />
          <span>Security Settings & Password Updated Successfully!</span>
        </div>
      )}

      {/* Change Password Form */}
      <form onSubmit={handlePasswordChange} className="surface p-6 rounded-2xl border border-[var(--theme-border)] space-y-4 shadow-md">
        <h3 className="text-sm font-bold text-[var(--theme-text-main)] uppercase tracking-wider flex items-center gap-2 border-b border-[var(--theme-border)] pb-3">
          <KeyRound className="w-4 h-4 text-[var(--accent-strong-text)]" />
          Change Administrator Password
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-[var(--theme-text-secondary)] font-semibold mb-1">Current Password</label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3 py-2 rounded-xl bg-[var(--theme-card)] border border-[var(--theme-border)] text-xs text-[var(--theme-text-main)] focus:outline-none focus:border-[var(--accent)]"
            />
          </div>

          <div>
            <label className="block text-[var(--theme-text-secondary)] font-semibold mb-1">New Password</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3 py-2 rounded-xl bg-[var(--theme-card)] border border-[var(--theme-border)] text-xs text-[var(--theme-text-main)] focus:outline-none focus:border-[var(--accent)]"
            />
          </div>

          <div>
            <label className="block text-[var(--theme-text-secondary)] font-semibold mb-1">Confirm New Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3 py-2 rounded-xl bg-[var(--theme-card)] border border-[var(--theme-border)] text-xs text-[var(--theme-text-main)] focus:outline-none focus:border-[var(--accent)]"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="btn-primary py-2.5 px-5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Update Admin Password</span>
          </button>
        </div>
      </form>

      {/* Two-Factor Authentication (2FA) */}
      <div className="surface p-6 rounded-2xl border border-[var(--theme-border)] space-y-4 shadow-md">
        <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-3">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-[var(--accent-strong-text)]" />
            <div>
              <h3 className="text-sm font-bold text-[var(--theme-text-main)] uppercase tracking-wider">
                Two-Factor Authentication (2FA)
              </h3>
              <p className="text-xs text-[var(--theme-text-muted)] mt-0.5">
                Require TOTP hardware token for all super admin sessions.
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={twoFactorEnabled}
              onChange={(e) => setTwoFactorEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[var(--theme-muted)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent)]" />
          </label>
        </div>

        <div className="surface-muted p-3.5 rounded-xl border border-[var(--theme-border-subtle)] text-xs text-[var(--theme-text-secondary)] flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[var(--accent-strong-text)]" />
            <span>Status: {twoFactorEnabled ? '2FA Active (Google Authenticator)' : 'Disabled'}</span>
          </span>
          <span className="font-mono text-[10px] text-[var(--theme-text-muted)]">TOTP Key Linked</span>
        </div>
      </div>

      {/* Active Admin Sessions Table */}
      <div className="surface p-6 rounded-2xl border border-[var(--theme-border)] space-y-4 shadow-md">
        <h3 className="text-sm font-bold text-[var(--theme-text-main)] uppercase tracking-wider flex items-center gap-2 border-b border-[var(--theme-border)] pb-3">
          <Laptop className="w-4 h-4 text-[var(--accent-strong-text)]" />
          Active Administrative Sessions
        </h3>

        <div className="space-y-3">
          {activeSessions.map((session, idx) => (
            <div
              key={idx}
              className="surface-muted p-3.5 rounded-xl border border-[var(--theme-border-subtle)] flex items-center justify-between text-xs"
            >
              <div>
                <p className="font-bold text-[var(--theme-text-main)] flex items-center gap-2">
                  {session.device}
                  {session.current && (
                    <span className="accent-pill px-2 py-0.5 rounded-full text-[10px] font-mono font-bold">
                      Current Device
                    </span>
                  )}
                </p>
                <p className="text-[11px] text-[var(--theme-text-muted)] mt-0.5">
                  IP: {session.ip} • {session.location} • {session.time}
                </p>
              </div>

              {!session.current && (
                <button className="px-3 py-1 rounded-lg bg-[var(--error-soft)] hover:opacity-90 text-[var(--error-text)] text-[11px] font-bold cursor-pointer">
                  Revoke Session
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
