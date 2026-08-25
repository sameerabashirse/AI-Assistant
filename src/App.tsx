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
import type { Thread, Message, Language, ThemeMode, Citation, EvidenceData, SuggestionCard } from './types';
import { MOCK_THREADS } from './data/mockData';

export function App() {
  const [viewMode, setViewMode] = useState<'user' | 'admin'>('user');
  const [language, setLanguage] = useState<Language>('english');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [threads, setThreads] = useState<Thread[]>(MOCK_THREADS);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);

  // Drawers & Modals State
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSourcesDrawerOpen, setIsSourcesDrawerOpen] = useState(false);
  const [isEvidenceDrawerOpen, setIsEvidenceDrawerOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  // Selected Item details for Evidence & Sources Drawers
  const [activeCitationId, setActiveCitationId] = useState<string | undefined>();
  const [activeEvidence, setActiveEvidence] = useState<EvidenceData | undefined>();

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const activeThread = threads.find((t) => t.id === activeThreadId);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [activeThread?.messages]);

  // Toggle Theme Class on body
  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
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
      // Create new thread
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
      // Append user msg to current thread
      setThreads((prev) =>
        prev.map((t) => (t.id === currentThreadId ? { ...t, messages: [...t.messages, userMsg] } : t))
      );
    }

    // Add streaming AI placeholder
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

    // Simulate AI knowledge retrieval & verified synthesis
    setTimeout(() => {
      // Trigger subtle celebration confetti for verified answer delivery
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.85 },
        colors: ['#1AFF00', '#0C3D06', '#EAF7E8'],
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

      // Auto-open sources drawer to showcase verified citations
      setIsSourcesDrawerOpen(true);
    }, 1800);
  };

  const handleSelectSuggestion = (card: SuggestionCard) => {
    const promptText = card.prompt[language] || card.prompt.english;
    handleSendMessage(promptText);
  };

  // Collect all active citations in current thread
  const currentCitations: Citation[] =
    activeThread?.messages
      .filter((m) => m.sender === 'ai' && m.citations)
      .flatMap((m) => m.citations || []) || [];

  if (viewMode === 'admin') {
    return <AdminDashboardApp onSwitchToUserApp={() => setViewMode('user')} />;
  }

  return (
    <div className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text-main)] flex flex-col justify-between font-sans selection:bg-[#1AFF00] selection:text-black">
      {/* Top Navbar */}
      <Navbar
        currentLanguage={language}
        onLanguageChange={setLanguage}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onToggleSourcesDrawer={() => setIsSourcesDrawerOpen(!isSourcesDrawerOpen)}
        onOpenAdmin={() => setViewMode('admin')}
        sourcesCount={currentCitations.length}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden relative max-w-[1920px] w-full mx-auto">
        {/* Left Sidebar: History Threads */}
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

        {/* Center: Main Canvas (Welcome Screen OR Active Conversation) */}
        <main className="flex-1 flex flex-col justify-between min-w-0 h-[calc(100vh-80px)] overflow-hidden relative">
          {!activeThread || activeThread.messages.length === 0 ? (
            /* Welcome Hero View */
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
            /* Active Chat Stream View */
            <div className="flex-1 flex flex-col justify-between h-full overflow-hidden">
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-4 max-w-4xl w-full mx-auto"
              >
                {/* Thread Header Banner */}
                <div className="p-3 mb-4 rounded-xl bg-[#0C3D06]/30 border border-[#1AFF00]/20 flex items-center justify-between text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1AFF00] animate-pulse" />
                    <span className="font-bold text-white truncate max-w-xs md:max-w-md">
                      Thread: {activeThread.title}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#1AFF00] bg-black/40 px-2 py-0.5 rounded border border-[#1AFF00]/30">
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

              {/* Chat Input Bar */}
              <ChatInput
                onSendMessage={handleSendMessage}
                onOpenUpload={() => setIsUploadModalOpen(true)}
                onOpenVoice={() => setIsVoiceModalOpen(true)}
                language={language}
              />
            </div>
          )}
        </main>

        {/* Right Sidebar Drawer: Verified Sources & Citations (Perplexity style) */}
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

      {/* Slide-over Modal: Evidence Inspector Audit Trail */}
      <EvidenceDrawer
        isOpen={isEvidenceDrawerOpen}
        onClose={() => setIsEvidenceDrawerOpen(false)}
        evidence={activeEvidence}
        language={language}
      />

      {/* Interactive Document Upload Modal (OCR Scanner Simulator) */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onAnalyzeDocument={(queryText) => handleSendMessage(queryText)}
        language={language}
      />

      {/* Voice Search Modal (Waveform simulator) */}
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
