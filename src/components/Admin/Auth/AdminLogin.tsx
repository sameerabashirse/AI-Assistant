'use client';

import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles, AlertCircle, CheckCircle2, KeyRound, X, Loader2 } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onReturnToHome: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onReturnToHome,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter your admin email address.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid corporate email format (e.g. admin@balochidigital.org).');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Invalid password credential. Please check your admin password.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess();
    }, 1200);
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      setIsGoogleLoading(false);
      onLoginSuccess();
    }, 1500);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotEmail) {
      setForgotSent(true);
      setTimeout(() => {
        setForgotSent(false);
        setIsForgotModalOpen(false);
        setForgotEmail('');
      }, 2000);
    }
  };

  return (
    <div className="premium-shell min-h-screen w-full flex items-center justify-center p-4 relative font-sans selection:bg-[var(--accent)] selection:text-white overflow-hidden">
      {/* Top Left Return Button */}
      <button
        onClick={onReturnToHome}
        className="btn-soft absolute top-6 left-6 px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-2 backdrop-blur-md"
      >
        <span>← Public Platform</span>
      </button>

      {/* Centered Admin Login Card */}
      <div className="surface-elevated w-full max-w-md rounded-[24px] p-6 md:p-8 space-y-6 relative z-10 animate-in fade-in zoom-in-95 duration-300">
        {/* Card Header Logo */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[var(--accent)] border border-[var(--accent-border)] mx-auto flex items-center justify-center shadow-sm">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-[var(--theme-text-main)] tracking-tight leading-tight">
              Balochi Digital
            </h1>
            <span className="accent-pill inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-mono font-bold mt-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Enterprise Admin Control Portal
            </span>
          </div>
          <p className="text-xs text-[var(--theme-text-muted)] font-normal pt-1">
            Sign in to access protected platform management & AI knowledge curation.
          </p>
        </div>

        {/* Error Alert Message */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-[var(--error-soft)] border border-[var(--error-text)]/40 text-[var(--error-text)] text-xs flex items-center gap-2.5 animate-in fade-in font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-[var(--error-text)]" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Email / Password Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--theme-text-secondary)] block">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3 text-[var(--theme-text-muted)]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@balochidigital.org"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--theme-muted)] border border-[var(--theme-border)] text-xs text-[var(--theme-text-main)] placeholder:text-[var(--theme-text-muted)] focus:outline-none focus:border-[var(--accent)] transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[var(--theme-text-secondary)]">
                Password
              </label>
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(true)}
                className="text-[11px] font-semibold text-[var(--accent-strong-text)] hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3 text-[var(--theme-text-muted)]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--theme-muted)] border border-[var(--theme-border)] text-xs text-[var(--theme-text-main)] placeholder:text-[var(--theme-text-muted)] focus:outline-none focus:border-[var(--accent)] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full py-3 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Authenticating Admin Session...</span>
              </>
            ) : (
              <>
                <span>Sign In to Admin Panel</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-[var(--theme-border)] w-full" />
          <span className="bg-[var(--theme-card-elevated)] px-3 text-[10px] uppercase font-mono text-[var(--theme-text-muted)] relative">
            OR
          </span>
        </div>

        {/* Continue with Google Option */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading}
          className="btn-soft w-full py-2.5 px-4 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-3 cursor-pointer"
        >
          {isGoogleLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-[#60A5FA]" />
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          )}
          <span>{isGoogleLoading ? 'Connecting to Google OAuth...' : 'Continue with Google'}</span>
        </button>

        {/* Footer info */}
        <div className="pt-2 text-center text-[11px] text-[var(--theme-text-muted)] font-mono">
          <span>Protected Area • Authorized Administrators Only</span>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleForgotSubmit}
            className="surface-elevated w-full max-w-sm rounded-2xl p-6 space-y-4 text-left animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-3">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-[var(--accent-strong-text)]" />
                <h3 className="text-sm font-bold text-[var(--theme-text-main)]">Reset Admin Password</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(false)}
                className="btn-soft p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {forgotSent ? (
              <div className="accent-pill p-4 rounded-xl text-center space-y-2 text-xs">
                <CheckCircle2 className="w-8 h-8 mx-auto" />
                <p className="font-bold text-[var(--theme-text-main)]">Password Reset Link Sent!</p>
                <p className="text-[var(--theme-text-secondary)]">
                  Check your admin inbox ({forgotEmail}) for recovery instructions.
                </p>
              </div>
            ) : (
              <>
                <p className="text-xs text-[var(--theme-text-secondary)]">
                  Enter your registered corporate admin email address to receive a secure password recovery token:
                </p>

                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="admin@balochidigital.org"
                  className="w-full px-3 py-2 rounded-xl bg-[var(--theme-muted)] border border-[var(--theme-border)] text-xs text-[var(--theme-text-main)] placeholder:text-[var(--theme-text-muted)] focus:outline-none focus:border-[var(--accent)]"
                />

                <div className="pt-2 flex justify-end gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setIsForgotModalOpen(false)}
                    className="btn-soft py-2 px-3 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary py-2 px-4 rounded-xl font-bold"
                  >
                    Send Recovery Email
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      )}
    </div>
  );
};
