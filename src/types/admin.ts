export type AdminRole = 'Super Admin' | 'Admin' | 'Researcher' | 'Expert' | 'Viewer';
export type AdminUserStatus = 'Active' | 'Inactive' | 'Pending';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: AdminRole;
  status: AdminUserStatus;
  joinedDate: string;
  lastLogin: string;
  permissions: string[];
}

export interface KnowledgeWord {
  id: string;
  word: string;
  balochiScript: string;
  meaning: string;
  dialect: 'Makrani (Coastal)' | 'Marri (Eastern)' | 'Rakhshani' | 'Sarawani';
  source: string;
  status: 'Verified' | 'Pending' | 'Rejected';
  confidence: number;
  addedBy: string;
}

export interface AdminSource {
  id: string;
  title: string;
  author: string;
  type: 'Dictionary' | 'Book' | 'Research Paper' | 'Website';
  language: string;
  dialect: string;
  pages: number;
  verificationStatus: 'Verified' | 'Pending Review' | 'Flagged';
  coverUrl?: string;
  year?: string;
}

export interface AdminBook {
  id: string;
  name: string;
  author: string;
  edition: string;
  language: string;
  dialect: string;
  rights: string;
  pagesCount: number;
  ocrStatus: 'Completed' | 'Processing' | 'Pending Review';
  uploadDate: string;
}

export interface OCRReview {
  id: string;
  bookTitle: string;
  pageNumber: number;
  originalScanUrl: string;
  extractedText: string;
  correctedText: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  reviewerNotes?: string;
  timestamp: string;
}

export interface AITrainingItem {
  id: string;
  question: string;
  aiAnswer: string;
  sources: string[];
  confidenceScore: number;
  status: 'Approved' | 'Pending' | 'Overridden';
  evaluatedBy?: string;
}

export interface SystemLog {
  id: string;
  action: string;
  user: string;
  role: string;
  ip?: string;
  date: string;
  time: string;
  status: 'Success' | 'Warning' | 'Error';
  ipAddress: string;
}

export interface AdminStats {
  totalUsers: number;
  userGrowth: number; // percentage
  aiQueries: number;
  queryGrowth: number;
  verifiedSources: number;
  sourcesGrowth: number;
  aiAccuracy: number;
  processedBooks: number;
  pendingReviews: number;
}
