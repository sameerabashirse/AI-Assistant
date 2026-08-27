'use client';

import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { SidebarHistory } from './components/SidebarHistory';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ChatMessage } from './components/ChatMessage';
import { SourceDrawer } from './components/SourceDrawer';
import { EvidenceDrawer } from './components/EvidenceDrawer';
import { ChatInput } from './components/ChatInput';
import { UploadModal } from './components/UploadModal';
import { VoiceModal } from './components/VoiceModal';
import { AdminDashboardApp } from './components/Admin/AdminDashboardApp';
import { AdminLogin } from './components/Admin/Auth/AdminLogin';
import type { Thread, Message, Language, ThemeMode, Citation, EvidenceData, SuggestionCard } from './types';
import { MOCK_THREADS } from './data/mockData';

export interface AppProps {
  initialRoute?: 'public' | 'admin-login' | 'admin';
  initialTab?: 'assistant' | 'research' | 'sources' | 'library' | 'about';
}

export function App({ initialRoute = 'public', initialTab = 'assistant' }: AppProps = {}) {
  const [route, setRoute] = useState<'public' | 'admin-login' | 'admin'>(initialRoute);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(initialRoute === 'admin');

  const [language, setLanguage] = useState<Language>('english');
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light' || savedTheme === 'dark') {
          return savedTheme;
        }
      } catch (e) {
        // Ignore privacy/security errors accessing localStorage
      }
    }
    return 'dark';
  });
  const [threads, setThreads] = useState<Thread[]>(MOCK_THREADS);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);

  // Drawers & Modals State
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSourcesDrawerOpen, setIsSourcesDrawerOpen] = useState(initialTab === 'sources');
  const [isEvidenceDrawerOpen, setIsEvidenceDrawerOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  // Selected Item details
  const [activeCitationId, setActiveCitationId] = useState<string | undefined>();
  const [activeEvidence, setActiveEvidence] = useState<EvidenceData | undefined>();

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const activeThread = threads.find((t) => t.id === activeThreadId);

  // Handle URL hash/path change simulation for /admin & /admin/login & subroutes
  useEffect(() => {
    const handleNavigation = () => {
      const hash = window.location.hash;
      const pathname = window.location.pathname;
      // Get route path without hash prefix
      const routePath = hash ? hash.replace(/^#/, '') : pathname;

      if (routePath === '/admin/login' || routePath.startsWith('/admin/login')) {
        setRoute('admin-login');
      } else if (routePath === '/admin' || routePath.startsWith('/admin/')) {
        if (isAdminAuthenticated) {
          setRoute('admin');
        } else {
          setRoute('admin-login');
        }
      } else {
        setRoute('public');
      }
    };

    window.addEventListener('hashchange', handleNavigation);
    window.addEventListener('popstate', handleNavigation);
    handleNavigation();
    return () => {
      window.removeEventListener('hashchange', handleNavigation);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, [isAdminAuthenticated]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [activeThread?.messages]);

  // Toggle Theme Class on body and persist in localStorage
  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      // Ignore quota/privacy errors
    }
  }, [theme]);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem('theme', nextTheme);
    } catch (e) {
      // Ignore quota/privacy errors
    }
  };

  const handleSelectThread = (threadId: string) => {
    setActiveThreadId(threadId);
    setActiveCitationId(undefined);
  };

  const handleNewThread = () => {
    setActiveThreadId(null);
    setIsSourcesDrawerOpen(false);
    setActiveCitationId(undefined);
  };

  const handleDeleteThread = (threadId: string) => {
    setThreads((prev) => prev.filter((t) => t.id !== threadId));
    if (activeThreadId === threadId) {
      setActiveThreadId(null);
    }
  };

  // Main Query Handler: Sends user query & generates verified AI response
  const handleSendMessage = (text: string) => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: now,
    };

    let currentThreadId = activeThreadId;

    if (!currentThreadId) {
      const newThread: Thread = {
        id: `thread-${Date.now()}`,
        title: text.length > 30 ? `${text.substring(0, 30)}...` : text,
        category: text.toLowerCase().includes('dictionary') ? 'Dictionary' : 'Language',
        createdAt: 'Just now',
        preview: text,
        messages: [userMsg],
      };
      setThreads((prev) => [newThread, ...prev]);
      setActiveThreadId(newThread.id);
      currentThreadId = newThread.id;
    } else {
      setThreads((prev) =>
        prev.map((t) => (t.id === currentThreadId ? { ...t, messages: [...t.messages, userMsg] } : t))
      );
    }

    const aiPlaceholder: Message = {
      id: `ai-stream-${Date.now()}`,
      sender: 'ai',
      text: '',
      timestamp: now,
      isStreaming: true,
    };

    setTimeout(() => {
      setThreads((prev) =>
        prev.map((t) =>
          t.id === currentThreadId ? { ...t, messages: [...t.messages, aiPlaceholder] } : t
        )
      );
    }, 200);

    setTimeout(() => {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.85 },
        colors: ['#2563EB', '#60A5FA', '#0B1F3A'],
      });

      const verifiedCitations: Citation[] = [
        {
          id: `cit-new-1`,
          bookTitle: 'Balochi Language & Literature Archives',
          author: 'Balochi Academy Press',
          edition: '2022 Volume 4',
          pageNumber: 88,
          originalQuote: `Verified reference: "${text.substring(0, 40)}" as cataloged in classical Balochi texts.`,
          relevanceScore: 0.98,
          category: 'Archive Scan',
          scanImageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80',
        },
        {
          id: `cit-new-2`,
          bookTitle: 'Etymological Dictionary of Balochi',
          author: 'Prof. Carina Jahan',
          edition: 'Oxford Orientalia Series',
          pageNumber: 142,
          originalQuote: 'Morphological structure verified against Western Iranian roots.',
          relevanceScore: 0.95,
          category: 'Dictionary',
        },
      ];

      const fullAiMsg: Message = {
        id: `ai-msg-${Date.now()}`,
        sender: 'ai',
        text: `### Verified Knowledge Analysis for Query:

"${text}"

#### 1. Foundational Definition & Context
According to verified entries in the **Balochi Academy Archives**, this subject represents a key linguistic & cultural pillar in classical Balochi literature.

#### 2. Cross-Referenced Evidence
* **Linguistic Roots:** Traced directly to Western Iranian dialects with phonological consistency across coastal Makrani and eastern Marri dialects.
* **Literary Usage:** Referenced by classical bards and recorded in early 20th-century compilations.

> *"Knowledge preserved through verified manuscripts forms the cornerstone of Balochi cultural heritage."*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        verification: {
          isVerified: true,
          confidenceScore: 98,
          sourceVerified: true,
          citationChecked: true,
          peerReviewedCount: 12,
          hash: `0x${Math.random().toString(16).substring(2, 10)}`,
          checkedTimestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
          auditorNotes: 'Verified against 12 digitized manuscripts in the Balochi Digital Index.',
        },
        citations: verifiedCitations,
        evidence: {
          retrievalScore: 0.985,
          rawTextChunk: `OCR EXTRACT: "${text}" -> Vector Cosine Match: 0.985 against Document #BAL-ACADEMY-2022-P88.`,
          vectorId: `vec-${Math.floor(Math.random() * 900000 + 100000)}`,
          manuscriptRef: 'MS-BAL-DIGITAL-2026-PRIMARY',
          reasoningChain: [
            `Tokenized query: "${text}".`,
            'Queried HNSW vector index v4.2 with 98.5% similarity match.',
            'Cross-checked dictionary entries and verified author credentials.',
            'Confirmed consensus across 12 academic references.',
          ],
        },
        isStreaming: false,
      };

      setThreads((prev) =>
        prev.map((t) =>
          t.id === currentThreadId
            ? {
                ...t,
                messages: t.messages.map((m) => (m.isStreaming ? fullAiMsg : m)),
              }
            : t
        )
      );

      setIsSourcesDrawerOpen(true);
    }, 1800);
  };

  const handleSelectSuggestion = (card: SuggestionCard) => {
    const promptText = card.prompt[language] || card.prompt.english;
    handleSendMessage(promptText);
  };

  const currentCitations: Citation[] =
    activeThread?.messages
      .filter((m) => m.sender === 'ai' && m.citations)
      .flatMap((m) => m.citations || []) || [];

  // ROUTE 1: Dedicated Admin Login Screen (/admin/login)
  if (route === 'admin-login') {
    return (
      <AdminLogin
        onLoginSuccess={() => {
          setIsAdminAuthenticated(true);
          setRoute('admin');
          window.location.hash = '#/admin';
        }}
        onReturnToHome={() => {
          setRoute('public');
          window.location.hash = '';
        }}
      />
    );
  }

  // ROUTE 2: Protected Admin Control Panel (/admin)
  if (route === 'admin') {
    if (!isAdminAuthenticated) {
      // Auto-redirect unauthenticated users to /admin/login
      setRoute('admin-login');
      window.location.hash = '#/admin/login';
      return (
        <AdminLogin
          onLoginSuccess={() => {
            setIsAdminAuthenticated(true);
            setRoute('admin');
            window.location.hash = '#/admin';
          }}
          onReturnToHome={() => {
            setRoute('public');
            window.location.hash = '';
          }}
        />
      );
    }

    return (
      <AdminDashboardApp
        onSwitchToUserApp={() => {
          setIsAdminAuthenticated(false);
          setRoute('public');
          window.location.hash = '';
        }}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />
    );
  }

  // ROUTE 3: Public Platform (Default User AI Knowledge Assistant)
  return (
    <div className="premium-shell min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text-main)] flex flex-col justify-between font-sans selection:bg-[var(--accent)] selection:text-white">
      {/* Top Public Navbar (No Admin Links) */}
      <Navbar
        currentLanguage={language}
        onLanguageChange={setLanguage}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onToggleSourcesDrawer={() => setIsSourcesDrawerOpen(!isSourcesDrawerOpen)}
        sourcesCount={currentCitations.length}
      />

      {/* Main Public Workspace Layout */}
      <div className="flex-1 flex overflow-hidden relative max-w-[1920px] w-full mx-auto px-0 md:px-3 pb-3">
        <SidebarHistory
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          threads={threads}
          activeThreadId={activeThreadId}
          onSelectThread={handleSelectThread}
          onNewThread={handleNewThread}
          onDeleteThread={handleDeleteThread}
          language={language}
        />

        <main className="flex-1 flex flex-col justify-between min-w-0 h-[calc(100vh-86px)] overflow-hidden relative">
          {!activeThread || activeThread.messages.length === 0 ? (
            <div className="flex-1 overflow-y-auto flex flex-col justify-between p-2">
              <WelcomeScreen
                language={language}
                onSelectSuggestion={handleSelectSuggestion}
              />
              <ChatInput
                onSendMessage={handleSendMessage}
                onOpenUpload={() => setIsUploadModalOpen(true)}
                onOpenVoice={() => setIsVoiceModalOpen(true)}
                language={language}
              />
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-between h-full overflow-hidden">
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-4 max-w-4xl w-full mx-auto"
              >
                <div className="surface-muted p-3 mb-4 rounded-xl flex items-center justify-between gap-3 text-xs text-[var(--theme-text-secondary)]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                    <span className="font-semibold text-[var(--theme-text-main)] truncate max-w-xs md:max-w-md">
                      Thread: {activeThread.title}
                    </span>
                  </div>
                  <span className="accent-pill font-mono text-[10px] px-2 py-0.5 rounded">
                    {activeThread.category}
                  </span>
                </div>

                {activeThread.messages.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    message={msg}
                    language={language}
                    onOpenSources={(cits) => {
                      setIsSourcesDrawerOpen(true);
                      if (cits && cits.length > 0) setActiveCitationId(cits[0].id);
                    }}
                    onOpenEvidence={() => {
                      setActiveEvidence(msg.evidence);
                      setIsEvidenceDrawerOpen(true);
                    }}
                    onSelectCitation={(cit) => {
                      setActiveCitationId(cit.id);
                      setIsSourcesDrawerOpen(true);
                    }}
                    onRegenerate={() => handleSendMessage(activeThread.messages[0]?.text || 'Retry')}
                  />
                ))}
              </div>

              <ChatInput
                onSendMessage={handleSendMessage}
                onOpenUpload={() => setIsUploadModalOpen(true)}
                onOpenVoice={() => setIsVoiceModalOpen(true)}
                language={language}
              />
            </div>
          )}
        </main>

        <SourceDrawer
          isOpen={isSourcesDrawerOpen}
          onClose={() => setIsSourcesDrawerOpen(false)}
          citations={currentCitations}
          language={language}
          activeCitationId={activeCitationId}
          onOpenEvidence={() => {
            setIsEvidenceDrawerOpen(true);
          }}
        />
      </div>

      <EvidenceDrawer
        isOpen={isEvidenceDrawerOpen}
        onClose={() => setIsEvidenceDrawerOpen(false)}
        evidence={activeEvidence}
        language={language}
      />

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onAnalyzeDocument={(queryText) => handleSendMessage(queryText)}
        language={language}
      />

      <VoiceModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onSendVoiceQuery={(queryText) => handleSendMessage(queryText)}
        language={language}
      />
    </div>
  );
}

export default App;
