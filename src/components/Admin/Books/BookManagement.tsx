import React, { useState } from 'react';
import { BookOpen, Upload, FileText, CheckCircle2, Loader2, X } from 'lucide-react';
import type { AdminBook } from '../../../types/admin';
import { MOCK_ADMIN_BOOKS } from '../../../data/adminMockData';

export const BookManagement: React.FC = () => {
  const [books, setBooks] = useState<AdminBook[]>(MOCK_ADMIN_BOOKS);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const [edition, setEdition] = useState('');
  const [language, setLanguage] = useState('Balochi / English');
  const [dialect, setDialect] = useState('Coastal & Eastern');
  const [rights, setRights] = useState('Balochi Digital Archive');

  const [uploadStep, setUploadStep] = useState<'form' | 'processing' | 'done'>('form');

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookName || !author) return;

    setUploadStep('processing');

    setTimeout(() => {
      const newBook: AdminBook = {
        id: `bk-${Date.now()}`,
        name: bookName,
        author,
        edition: edition || 'First Edition',
        language,
        dialect,
        rights,
        pagesCount: Math.floor(Math.random() * 400 + 100),
        ocrStatus: 'Pending Review',
        uploadDate: 'Just now',
      };

      setBooks([newBook, ...books]);
      setUploadStep('done');
    }, 2000);
  };

  const handleCloseModal = () => {
    setIsUploadModalOpen(false);
    setUploadStep('form');
    setBookName('');
    setAuthor('');
    setEdition('');
  };

  return (
    <div className="space-y-6">
      <div className="surface p-5 rounded-2xl border border-[var(--theme-border)] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div>
          <h3 className="text-base font-bold text-[var(--theme-text-main)] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[var(--accent-strong-text)]" />
            Balochi Literature & Manuscript Catalog
          </h3>
          <p className="text-xs text-[var(--theme-text-muted)] mt-1">
            Digitized books, dictionaries, and historical manuscripts ready for OCR text extraction.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="btn-primary py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          <span>Upload PDF Book for OCR Indexing</span>
        </button>
      </div>

      <div className="surface rounded-2xl border border-[var(--theme-border)] overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[var(--theme-border)] text-[var(--theme-text-muted)] font-mono uppercase text-[10px] bg-[var(--theme-muted)]">
                <th className="py-3 px-4">Book Title</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Edition</th>
                <th className="py-3 px-4">Language / Dialect</th>
                <th className="py-3 px-4">Rights</th>
                <th className="py-3 px-4">Pages</th>
                <th className="py-3 px-4">OCR Pipeline Status</th>
                <th className="py-3 px-4 text-right">Upload Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--theme-border-subtle)] text-[var(--theme-text-secondary)]">
              {books.map((b) => (
                <tr key={b.id} className="hover:bg-[var(--accent-soft)] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[var(--theme-text-main)] text-sm">{b.name}</td>
                  <td className="py-3.5 px-4 font-medium text-[var(--theme-text-secondary)]">{b.author}</td>
                  <td className="py-3.5 px-4 font-mono text-[var(--theme-text-muted)]">{b.edition}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-[var(--theme-text-main)]">{b.language}</p>
                    <p className="text-[10px] text-[var(--theme-text-muted)] font-mono">{b.dialect}</p>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[var(--accent-strong-text)] text-[11px] font-semibold">{b.rights}</td>
                  <td className="py-3.5 px-4 font-mono">{b.pagesCount} pgs</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        b.ocrStatus === 'Completed'
                          ? 'bg-[var(--success-soft)] text-[var(--success-text)] border border-[var(--success-text)]/30'
                          : 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
                      }`}
                    >
                      {b.ocrStatus === 'Completed' ? (
                        <CheckCircle2 className="w-3 h-3 text-[var(--success-text)]" />
                      ) : (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      )}
                      {b.ocrStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-right text-[var(--theme-text-muted)]">{b.uploadDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#111827] border border-[#2563EB]/40 rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#60A5FA]" />
                <h3 className="text-base font-bold text-white">Upload Manuscript / Book</h3>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {uploadStep === 'form' && (
              <form onSubmit={handleUploadSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Book / Manuscript Title</label>
                  <input
                    type="text"
                    required
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                    placeholder="e.g. Classical Balochi Epic Ballads"
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Author / Collector</label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Sher Muhammad Marri"
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Language</label>
                    <input
                      type="text"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Dialect Focus</label>
                    <input
                      type="text"
                      value={dialect}
                      onChange={(e) => setDialect(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Copyright Rights</label>
                  <input
                    type="text"
                    value={rights}
                    onChange={(e) => setRights(e.target.value)}
                    placeholder="Public Domain / License"
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div className="p-4 rounded-xl border-2 border-dashed border-white/20 hover:border-[#2563EB]/60 bg-black/30 text-center cursor-pointer">
                  <FileText className="w-8 h-8 text-[#60A5FA] mx-auto mb-1" />
                  <p className="font-bold text-white">Drop PDF Manuscript File</p>
                  <p className="text-[10px] text-gray-400">PDF, PNG high-res scans up to 200MB</p>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-bold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-5 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-xs transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                  >
                    Start OCR Extraction
                  </button>
                </div>
              </form>
            )}

            {uploadStep === 'processing' && (
              <div className="py-10 text-center space-y-4">
                <Loader2 className="w-12 h-12 text-[#60A5FA] animate-spin mx-auto" />
                <div>
                  <p className="text-sm font-bold text-white">Running Optical OCR Pipeline...</p>
                  <p className="text-xs text-[#60A5FA] font-mono mt-1">
                    Splitting pages & generating vector embeddings...
                  </p>
                </div>
              </div>
            )}

            {uploadStep === 'done' && (
              <div className="py-6 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#60A5FA] mx-auto" />
                <div>
                  <h4 className="text-base font-bold text-white">Book Uploaded Successfully!</h4>
                  <p className="text-xs text-gray-300 mt-1">
                    Sent to the OCR Review Queue for expert verification.
                  </p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="py-2 px-6 rounded-xl bg-[#2563EB] text-white font-bold text-xs"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
