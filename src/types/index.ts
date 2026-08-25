export type Language = 'english' | 'balochi' | 'roman' | 'urdu';

export type ThemeMode = 'dark' | 'light';

export interface Citation {
  id: string;
  bookTitle: string;
  author: string;
  edition: string;
  pageNumber: number;
  year?: string;
  originalQuote: string;
  relevanceScore: number; // e.g. 0.98
  category?: string;
  scanImageUrl?: string;
}

export interface VerificationData {
  isVerified: boolean;
  confidenceScore: number; // e.g., 98
  sourceVerified: boolean;
  citationChecked: boolean;
  peerReviewedCount: number;
  hash: string;
  checkedTimestamp: string;
  auditorNotes: string;
}

export interface EvidenceData {
  retrievalScore: number; // e.g. 0.992
  rawTextChunk: string;
  vectorId: string;
  manuscriptRef: string;
  reasoningChain: string[];
}

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  verification?: VerificationData;
  citations?: Citation[];
  evidence?: EvidenceData;
  isStreaming?: boolean;
}

export interface Thread {
  id: string;
  title: string;
  category: 'Language' | 'Literature' | 'History' | 'Culture' | 'Dictionary';
  createdAt: string;
  preview: string;
  messages: Message[];
}

export interface SuggestionCard {
  id: string;
  iconName: string;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  prompt: Record<Language, string>;
}
