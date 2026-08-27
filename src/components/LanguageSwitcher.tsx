import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import type { Language } from '../types';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

const LANGUAGES: { id: Language; label: string; native: string }[] = [
  { id: 'english', label: 'English', native: 'English' },
  { id: 'balochi', label: 'Balochi', native: 'بلوچی (Balochi)' },
  { id: 'roman', label: 'Roman Balochi', native: 'Roman Balochi' },
  { id: 'urdu', label: 'Urdu', native: 'اردو (Urdu)' },
];

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeLang = LANGUAGES.find((l) => l.id === currentLanguage) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-soft flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
      >
        <Globe className="w-3.5 h-3.5 text-[var(--accent-strong-text)]" />
        <span className="hidden sm:inline">{activeLang.native}</span>
        <span className="sm:hidden">{activeLang.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-[var(--theme-text-muted)] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="surface-elevated absolute right-0 mt-2 w-52 rounded-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-[var(--theme-text-muted)] border-b border-[var(--theme-border)] mb-1">
            Select Language / زبان گچین
          </div>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              onClick={() => {
                onLanguageChange(lang.id);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                currentLanguage === lang.id
                  ? 'accent-pill font-bold'
                  : 'text-[var(--theme-text-secondary)] hover:bg-[var(--theme-muted)] hover:text-[var(--theme-text-main)]'
              }`}
            >
              <span>{lang.native}</span>
              {currentLanguage === lang.id && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
