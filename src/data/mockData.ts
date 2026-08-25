import type { Thread, SuggestionCard, Language } from '../types';

export const MOCK_UI_STRINGS: Record<string, Record<Language, string>> = {
  appTitle: {
    english: 'Balochi Digital',
    balochi: 'بلوچی ڈیجیٹل',
    roman: 'Balochi Digital',
    urdu: 'بلوچی ڈیجیٹل',
  },
  appSubtitle: {
    english: 'Verified AI Knowledge Assistant',
    balochi: 'تصدق بیتگیں AI زانت ءُ زانش گواہی',
    roman: 'Verified AI Zant & Zanish Gwahin',
    urdu: 'مصدقہ AI علمی معاون',
  },
  heroTitle: {
    english: 'Hello, How can I help you today?',
    balochi: 'سلام، مرچی من ترا چطور کمک کت کن اں؟',
    roman: 'Salam, Murchi man tara chetor komak kot kon an?',
    urdu: 'سلام، آج میں آپ کی کیا مدد کر سکتا ہوں؟',
  },
  heroSubtitle: {
    english: 'Ask anything about Balochi language, culture, books and verified knowledge sources.',
    balochi: 'بلوچی زبان، دود ءُ ربیدگ، کتاب ءُ تصدیق بیتگیں زانت‌سراں پٹ ءُ پول بکن ات۔',
    roman: 'Balochi zaban, dood & rabedag, kitab & tasdeeq beytagen zant-saran pat & pol bakan et.',
    urdu: 'بلوچی زبان، ثقافت، کتب اور مصدقہ علمی ذرائع کے بارے میں کچھ بھی پوچھیں۔',
  },
  inputPlaceholder: {
    english: 'Ask your question about Balochi language, culture, etymology or manuscripts...',
    balochi: 'بلوچی زبان، لبزانک ءُ دود ءُ ربیدگ بارے جُست بکن ات...',
    roman: 'Balochi zaban, labzanank & dood-o-rabedag barey jost bakan et...',
    urdu: 'بلوچی زبان، ثقافت یا تاریخ کے بارے میں اپنا سوال لکھیں...',
  },
  verifiedBadge: {
    english: 'Verified Answer',
    balochi: 'تصدق بیتگیں پسو',
    roman: 'Tasdeeq Beytagen Pasaw',
    urdu: 'مصدقہ جواب',
  },
  confidenceLabel: {
    english: 'Evidence Confidence',
    balochi: 'گواہی داتگیں باوری',
    roman: 'Gwahin Datagen Bawri',
    urdu: 'ثبوتی اعتماد',
  },
  sourceVerified: {
    english: 'Source Verified',
    balochi: 'بن‌گپ تصدیق بیتگ',
    roman: 'Bangap Tasdeeq Beytag',
    urdu: 'ماخذ مصدقہ',
  },
  citationChecked: {
    english: 'Citation Checked',
    balochi: 'حوالہ چارگ بیتگ',
    roman: 'Hawala Charag Beytag',
    urdu: 'حوالہ چیک شدہ',
  },
  sourcesPanelTitle: {
    english: 'Verified Sources & Citations',
    balochi: 'تصدق بیتگیں بن‌چراگ ءُ حوالہ جات',
    roman: 'Tasdeeq Beytagen Bancharag & Hawalajat',
    urdu: 'مصدقہ ذرائع و حوالہ جات',
  },
  evidenceTitle: {
    english: 'Retrieved Evidence & Audit Trail',
    balochi: 'پٹ ءُ پول بیتگیں ثبوت ءُ گواہی',
    roman: 'Pat & Pol Beytagen Saboot & Gwahin',
    urdu: 'حاصل شدہ شواہد اور آڈٹ ٹریل',
  },
  newChat: {
    english: 'New Research Thread',
    balochi: 'نوکیں پٹ ءُ پول',
    roman: 'Noken Pat & Pol',
    urdu: 'نیا تحقیقی سیشن',
  },
  uploadDoc: {
    english: 'Analyze Document',
    balochi: 'کاغذات پٹ ءُ پول',
    roman: 'Kaghazat Pat & Pol',
    urdu: 'دستاویز کا تجزیہ',
  },
  voiceQuery: {
    english: 'Voice Search',
    balochi: 'گوشگ ءُ جُست',
    roman: 'Goshag & Jost',
    urdu: 'صوتی تلاش',
  },
  viewEvidence: {
    english: 'Open Evidence Trail',
    balochi: 'گواہی ءُ ثبوت بچار ات',
    roman: 'Gwahin & Saboot Bachar et',
    urdu: 'شواہد کا جائزہ لیں',
  },
  viewSource: {
    english: 'Inspect Page Reference',
    balochi: 'صفحہ حوالہ بچار ات',
    roman: 'Safha Hawala Bachar et',
    urdu: 'صفحہ کا حوالہ دیکھیں',
  }
};

export const SUGGESTIONS: SuggestionCard[] = [
  {
    id: 'sug-1',
    iconName: 'BookOpen',
    title: {
      english: 'Dictionary Etymology',
      balochi: 'لبزانی ریشگ ءُ مانا',
      roman: 'Labzani Reshag & Mana',
      urdu: 'الفاظ کی لغت اور اصلیت',
    },
    subtitle: {
      english: 'What is the etymological origin of the Balochi word "Zahirok"?',
      balochi: '"ظہیروک" لبزئے ریشگ ءُ لبزانکی مانا چی انت؟',
      roman: '"Zahirok" labzay reshag & labzanki mana che ent?',
      urdu: 'بلوچی لفظ "ظہیروک" کا لغوی اور تاریخی پس منظر کیا ہے؟',
    },
    prompt: {
      english: 'Explain the origin, cultural significance, and dictionary meaning of the Balochi word "Zahirok" (زهيروك). Include classical text references.',
      balochi: 'بلوچی لبز "ظہیروک" ئے ریشگ، دود ءُ ربیدگی ارزش ءُ لبزانکی مانا ءَ بگو ات۔ کلاسیکی کتابانی حوالہ دی ات۔',
      roman: 'Balochi labz "Zahirok" ay reshag, dood & rabedagi arzish & labzanki mana a bagwat. Classici kitabani hawala deyt.',
      urdu: 'بلوچی لفظ "ظہیروک" کی اصل، ثقافتی اہمیت اور لغوی معنی کی وضاحت کریں۔ کلاسیکی کتب سے حوالہ جات شامل کریں۔',
    }
  },
  {
    id: 'sug-2',
    iconName: 'ScrollText',
    title: {
      english: 'Poetry & Manuscripts',
      balochi: 'شاعری ءُ دست‌نوشت',
      roman: 'Shaeri & Dast-nawesht',
      urdu: 'شاعری اور قدیم مخطوطات',
    },
    subtitle: {
      english: 'Explore verses from Mast Tawkali and Mir Chakar Rind epics',
      balochi: 'مست توکلی ءُ میر چاکر رند ئے شعرانی پٹ ءُ پول',
      roman: 'Mast Tawkali & Mir Chakar Rind ay sherani pat & pol',
      urdu: 'مست توکلی اور میر چاکر رند کے رزمیہ اشعار کا جائزہ لیں',
    },
    prompt: {
      english: 'Provide a verified breakdown of Mast Tawkali\'s poetic metaphors and historical context from verified manuscripts.',
      balochi: 'مست توکلی ئے شعرانی لبزانکی زیبایی ءُ تاریخ ءَ تصدیق بیتگیں بن‌کتابانی گما بگو ات۔',
      roman: 'Mast Tawkali ay sherani labzanki zibayi & tareekh a tasdeeq beytagen ban-kitabani guma bagwat.',
      urdu: 'مست توکلی کے شعری استعاروں اور تاریخی پس منظر کی مصدقہ کتب کی روشنی میں وضاحت کریں۔',
    }
  },
  {
    id: 'sug-3',
    iconName: 'Compass',
    title: {
      english: 'Proverbs & Folklore',
      balochi: 'بتل ءُ دود ءُ ربیدگ',
      roman: 'Batal & Dood-o-Rabedag',
      urdu: 'ضرب الامثال اور لوک کہانیاں',
    },
    subtitle: {
      english: 'What does the proverb "شپ گوست ءُ خبر گوست" signify?',
      balochi: '"شپ گوست ءُ خبر گوست" بتلئے مانا ءُ کاربرد چی انت؟',
      roman: '"Shap gost & khabar gost" batalay mana & karbard che ent?',
      urdu: 'بلوچی مثل "شپ گوست ءُ خبر گوست" کا کیا مطلب اور استعمال ہے؟',
    },
    prompt: {
      english: 'What is the background and usage of the Balochi proverb "Shap gost o khabar gost"? Cite dictionary records.',
      balochi: '"شپ گوست ءُ خبر گوست" بتلئے پس‌منظر ءُ استعمالئے طریقہ ءَ دپترانی حوالگ ءَ بگو ات۔',
      roman: '"Shap gost o khabar gost" batalay pas-manzar & estemal ay tareeqa a daptarani hawalaga bagwat.',
      urdu: 'بلوچی ضرب المثل "شپ گوست ءُ خبر گوست" کا پس منظر اور استعمال کیا ہے؟ لغت کے حوالے سے بیان کریں۔',
    }
  },
  {
    id: 'sug-4',
    iconName: 'FileCheck',
    title: {
      english: 'Cross-Reference Check',
      balochi: 'بن‌کتابانی گواہی چاری',
      roman: 'Ban-kitabani Gwahin Chari',
      urdu: 'حوالہ جاتی موازنہ',
    },
    subtitle: {
      english: 'Compare dialects: Southern Coastal Balochi vs Eastern Hill Dialect',
      balochi: 'مکرانی ءُ سلیمانکی گپ ءُ گالانی تفاوت بچار ات',
      roman: 'Makrani & Sulaimanki gap & galani tafawat bachar et',
      urdu: 'بلوچی کے ساحلی اور مشرقی لہجوں میں قواعدی موازنہ کریں',
    },
    prompt: {
      english: 'Compare grammatical structure and vocabulary variations between Southern Makrani Balochi and Eastern Sulaimani Balochi with book references.',
      balochi: 'مکرانی ءُ سلیمانکی بلوچی گپ ءُ گالانی گرامر ءُ لبزانی فرق ءَ معتبریں کتابانی حوالگ ءَ شرح بکن ات۔',
      roman: 'Makrani & Sulaimanki Balochi gap & galani grammar & labzani farq a motabar-en kitabani hawalaga sharah bakan et.',
      urdu: 'مکرانی اور سلیمانی بلوچی کے قواعد اور ذخیرہ الفاظ کے فرق کی مستند کتب سے وضاحت کریں۔',
    }
  }
];

export const MOCK_THREADS: Thread[] = [
  {
    id: 'thread-1',
    title: 'Etymology of "Zahirok" (زهيروك)',
    category: 'Language',
    createdAt: 'Today, 2:45 PM',
    preview: 'Zahirok stems from the Proto-Iranian root *za-hīr meaning longing and melancholic melody...',
    messages: [
      {
        id: 'msg-1',
        sender: 'user',
        text: 'What is the etymological origin, musical significance, and dictionary definition of the Balochi word "Zahirok" (زهيروك)? Please provide verified sources.',
        timestamp: '2:45 PM'
      },
      {
        id: 'msg-2',
        sender: 'ai',
        text: `### Etymology & Meaning of "Zahirok" (زهيروك)

**Zahirok** (also spelled *Zahiroog* or *Zahiruk*) is one of the most fundamental concepts in Balochi classical music, oral literature, and emotional vocabulary.

#### 1. Linguistic Origin & Dictionary Definition
The word derives from the Balochi root word **Zahir** (زهير), meaning *longing, remembrance, nostalgia, or poignant grief born of separation*.
* The suffix **-ok** (ـوک) acts as a diminutive of endearment and intense emotional focus.
* Etymologically traced to Western Iranian roots, cognate with Avestan *zan-* (feeling/grief) and Middle Persian *zāhīr*.

#### 2. Cultural & Musical Mode
In Balochi traditional music, **Zahirok** refers to the soulful, unmetered vocal prelude sung by travelers, bards (Luris / Pahlawans), and women working in camel caravans. It serves as the foundational melody from which long epic poems (*Dastan*) originate.

#### 3. Key Literary Quotation
According to **M. Longworth Dames (1891)** in *Popular Poetry of the Baloches*:
> *"The Zahirok is the mournful song of the Baloch who longs for his distant home, his tribe, or his beloved. It expresses the raw solitude of the desert expanse."*`,
        timestamp: '2:46 PM',
        verification: {
          isVerified: true,
          confidenceScore: 98,
          sourceVerified: true,
          citationChecked: true,
          peerReviewedCount: 14,
          hash: '0x8f9a2b7c4d1e',
          checkedTimestamp: '2026-08-24 14:46 UTC',
          auditorNotes: 'Cross-referenced against 3 historical dictionaries and 11 peer-reviewed manuscripts.'
        },
        citations: [
          {
            id: 'cit-1',
            bookTitle: 'Comprehensive Balochi-English Dictionary',
            author: 'Jan Mohammad Dashti & Gul Khan Nasir',
            edition: '3rd Revised Edition',
            pageNumber: 124,
            year: '2008',
            originalQuote: 'Zahirok (n.): Classical Balochi musical mode expressing separation and nostalgic longing; derived from Zahir (grief/desire).',
            relevanceScore: 0.99,
            category: 'Dictionary',
            scanImageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80'
          },
          {
            id: 'cit-2',
            bookTitle: 'Popular Poetry of the Baloches',
            author: 'M. Longworth Dames',
            edition: 'Royal Asiatic Society Monograph Vol. IX',
            pageNumber: 56,
            year: '1907',
            originalQuote: 'The Zahirok songs are the emotional core of Baloch desert music, handed down through generations of oral bards.',
            relevanceScore: 0.96,
            category: 'Manuscript',
            scanImageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&q=80'
          },
          {
            id: 'cit-3',
            bookTitle: 'Balochi Zaban o Labzank History',
            author: 'Prof. Carina Jahan',
            edition: 'Uppsala University Orientalia',
            pageNumber: 210,
            year: '2014',
            originalQuote: 'Phonological transformation of *za-hīr into modern Balochi nominal forms.',
            relevanceScore: 0.94,
            category: 'Academic Journal'
          }
        ],
        evidence: {
          retrievalScore: 0.988,
          rawTextChunk: 'RAW OCR CHUNK [DocRef #BAL-DICT-124]: "zahirok / zāhīruk (n.f.) [from P. zahir longing] 1. A melody of nostalgia sung in high pitched solo voice. 2. Emotional state of home-sickness."',
          vectorId: 'vec-bal-882910',
          manuscriptRef: 'MS-BAL-OXFORD-1907-DAMES',
          reasoningChain: [
            'Extracted query keywords: "Zahirok", "etymology", "dictionary", "meaning".',
            'Queried Balochi Digital Vector Index v4.2 (Cosine Similarity: 0.988).',
            'Identified exact match in Balochi-English Dictionary (Page 124).',
            'Verified historical context via Dames (1907) Monograph (Page 56).',
            'Calculated confidence score: 98% based on consensus across 3 authoritative texts.'
          ]
        }
      }
    ]
  },
  {
    id: 'thread-2',
    title: 'Balochi Proverb: "Shap gost o khabar gost"',
    category: 'Literature',
    createdAt: 'Yesterday',
    preview: 'Literally translating to "The night has passed, and the news has passed"...',
    messages: [
      {
        id: 'msg-3',
        sender: 'user',
        text: 'What does the proverb "شپ گوست ءُ خبر گوست" mean in Balochi tradition?',
        timestamp: 'Yesterday'
      },
      {
        id: 'msg-4',
        sender: 'ai',
        text: `### Analysis of Balochi Proverb: *"Shap gost o khabar gost"* (شپ گوست ءُ خبر گوست)

#### Meaning & Literal Translation
* **Literal:** "The night has passed, and the news/rumor has passed."
* **Contextual Meaning:** What is done is done; once time moves past an event, old grievances or outdated rumors lose their weight and should be let go.

#### Cultural Usage
Used primarily in council assemblies (*Jirga*) and family reconciliation settings when encouraging parties to look toward future unity rather than reliving past disputes.`,
        timestamp: 'Yesterday',
        verification: {
          isVerified: true,
          confidenceScore: 96,
          sourceVerified: true,
          citationChecked: true,
          peerReviewedCount: 8,
          hash: '0x3e7a119b9c02',
          checkedTimestamp: '2026-08-23 18:20 UTC',
          auditorNotes: 'Matched against Balochi Proverbs & Idioms Compendium (Quetta Academy).'
        },
        citations: [
          {
            id: 'cit-4',
            bookTitle: 'Balochi Batal o Galak (Balochi Proverbs Compendium)',
            author: 'Syed Hashmi',
            edition: 'First Edition',
            pageNumber: 88,
            year: '1962',
            originalQuote: 'Shap gost o khabar gost: Used to denote forgiveness of past errors after nightfall.',
            relevanceScore: 0.97,
            category: 'Folklore & Proverbs'
          }
        ],
        evidence: {
          retrievalScore: 0.972,
          rawTextChunk: 'RAW CHUNK [Ref #HASHMI-PROV-88]: "Batlak 44: Shap gost o khabar gost - time heals past contention."',
          vectorId: 'vec-prov-4410',
          manuscriptRef: 'MS-SYED-HASHMI-1962',
          reasoningChain: [
            'Query matched proverb database #HASHMI-PROV-88.',
            'Cross-validated proverb meaning with elders oral history archives.',
            'Verified text integrity.'
          ]
        }
      }
    ]
  }
];

export const MOCK_MANUSCRIPT_PREVIEWS = [
  {
    title: 'Balochi-English Dictionary (1907)',
    author: 'M. Longworth Dames',
    pages: '340 pages',
    badge: 'Verified Archive',
    coverBg: 'bg-emerald-950/80 border-emerald-500/30'
  },
  {
    title: 'Balochi Grammar & Syntax Manual',
    author: 'Syed Hashmi Library',
    pages: '210 pages',
    badge: 'OCR Digitized',
    coverBg: 'bg-green-950/80 border-green-500/30'
  },
  {
    title: 'Classical Balochi Epic Ballads',
    author: 'Sher Muhammad Marri',
    pages: '512 pages',
    badge: 'Rare Manuscript',
    coverBg: 'bg-teal-950/80 border-teal-500/30'
  }
];
