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
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0C3D06]/60 hover:bg-[#0C3D06] text-[#1AFF00] border border-[#1AFF00]/30 hover:border-[#1AFF00] text-xs font-semibold transition-all shadow-[0_0_12px_rgba(26,255,0,0.15)]"
      >
        <Globe className="w-3.5 h-3.5 text-[#1AFF00]" />
        <span>{activeLang.native}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-[#1AFF00] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#071705] border border-[#1AFF00]/30 backdrop-blur-xl shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-[#1AFF00]/70 border-b border-white/10 mb-1">
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
                  ? 'bg-[#0C3D06] text-[#1AFF00] font-bold border border-[#1AFF00]/40'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span>{lang.native}</span>
              {currentLanguage === lang.id && <Check className="w-3.5 h-3.5 text-[#1AFF00]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
