export type EntryKind = 'project' | 'work' | 'lab';

export interface Entry {
  id: string;
  kind: EntryKind;
  title: string;
  line: string;
  tag: string;
  href: string | null;
  keywords: readonly string[];
}

export const entries = [
  {
    id: 'luxcore',
    kind: 'project',
    title: 'LuxCore',
    line: 'Embeddable search library with BM25 and typo tolerance',
    tag: 'C++20',
    href: '#luxcore',
    keywords: ['search', 'library', 'lucene', 'bm25', 'index', 'memory', 'fuzzy', 'typo', 'cpp', 'c++', 'engine'],
  },
  {
    id: 'recall',
    kind: 'project',
    title: 'Recall',
    line: 'Live code search in the terminal, across projects',
    tag: 'Rust',
    href: '#recall',
    keywords: ['rust', 'terminal', 'tui', 'daemon', 'watcher', 'code', 'search', 'memory', 'files'],
  },
  {
    id: 'validation',
    kind: 'work',
    title: 'Identifier validation service',
    line: 'One ruleset in place of duplicated logic',
    tag: 'Spring Boot',
    href: '#validation',
    keywords: ['java', 'spring', 'boot', 'microservice', 'validation', 'credit', 'equifax'],
  },
  {
    id: 'agentic',
    kind: 'work',
    title: 'Agentic tooling rollout',
    line: '57 engineers trained, maintenance time down about 50%',
    tag: 'AI tooling',
    href: '#agentic',
    keywords: ['ai', 'agents', 'agentic', 'training', 'tooling', 'equifax', 'jira'],
  },
  {
    id: 'onboarding',
    kind: 'work',
    title: 'Consumer onboarding flow',
    line: 'Route guards, reactive forms, English and Spanish',
    tag: 'Angular',
    href: '#onboarding',
    keywords: ['angular', 'typescript', 'forms', 'i18n', 'spanish', 'frontend', 'equifax'],
  },
  {
    id: 'upgrade',
    kind: 'work',
    title: 'Admin portal upgrade',
    line: 'Angular 13 to 20, with better accessibility',
    tag: 'Angular',
    href: '#upgrade',
    keywords: ['angular', 'upgrade', 'accessibility', 'typescript', 'frontend', 'equifax'],
  },
  {
    id: 'security',
    kind: 'work',
    title: 'Security hardening',
    line: '27% fewer vulnerability and tech-debt findings',
    tag: 'Java',
    href: '#security',
    keywords: ['java', 'security', 'vulnerability', 'container', 'docker', 'spring', 'equifax'],
  },
  {
    id: 'sequence',
    kind: 'work',
    title: 'Audit-log sequence bug',
    line: 'Duplicate IDs traced to a migration, fixed before UAT',
    tag: 'PostgreSQL',
    href: '#sequence',
    keywords: ['postgres', 'postgresql', 'sql', 'database', 'migration', 'bug', 'debugging', 'equifax'],
  },
  {
    id: 'te-001',
    kind: 'lab',
    title: 'TE-001',
    line: 'A Raspberry Pi media player for CD, tape, AirPlay and Bluetooth',
    tag: 'Python',
    href: null,
    keywords: ['raspberry', 'pi', 'media', 'player', 'airplay', 'bluetooth', 'hardware'],
  },
  {
    id: 'night-shift',
    kind: 'lab',
    title: 'Night-shift agents',
    line: 'A turn-based game built by six scheduled agents',
    tag: 'C++ · Godot',
    href: null,
    keywords: ['cpp', 'c++', 'godot', 'game', 'agents', 'linear', 'tickets', 'pull', 'requests'],
  },
  {
    id: 'derive',
    kind: 'lab',
    title: 'Derive',
    line: 'A trainer for data-structure theory across all 150 NeetCode problems',
    tag: 'JavaScript',
    href: null,
    keywords: ['javascript', 'neetcode', 'algorithms', 'visualization', 'trainer'],
  },
] as const satisfies readonly Entry[];

export type EntryId = (typeof entries)[number]['id'];

export const entryById = (id: EntryId): Entry => {
  const entry = entries.find((e) => e.id === id);
  if (!entry) throw new Error(`Unknown entry: ${id}`);
  return entry;
};

export interface Project {
  entryId: EntryId;
  index: string;
  format: string;
  summary: string;
  points: readonly string[];
  sourceHref: string;
}

export const projects: readonly Project[] = [
  {
    entryId: 'luxcore',
    index: '01 · C++20',
    format: 'library',
    summary:
      'An embeddable full-text search library modeled on Apache Lucene. Inverted index, BM25 ranking, typo-tolerant search-as-you-type, a query parser with booleans and phrases, and a versioned binary format that validates before it allocates.',
    points: [
      'Standard library only, with a C API and a Python binding',
      'Readers keep searching while a writer indexes',
      'CI on g++ and clang++, debug and release, warnings as errors',
    ],
    sourceHref: 'https://github.com/Flame338/LuxCore',
  },
  {
    entryId: 'recall',
    index: '02 · Rust',
    format: 'terminal tool',
    summary:
      'Live code search across every project on the machine. A background daemon watches folders, so a saved edit is searchable in about a second, and reopening only catches up on what changed.',
    points: [
      'Binds to LuxCore through its C API',
      'Memory per indexed file cut from 25.7 KB to 3.9 KB',
      'Scriptable JSON command line and cross-project search',
    ],
    sourceHref: 'https://github.com/Flame338/recall-tui',
  },
];

export interface Stat {
  value: string;
  caption: string;
}

export const stats: readonly Stat[] = [
  { value: '1.1 ms', caption: 'p99 per keystroke across 100,000 documents, down from 2.0 ms. LuxCore.' },
  { value: '3.4×', caption: 'less index memory, 387 MB to 114 MB, with byte-identical output. LuxCore.' },
  { value: '13.7×', caption: 'indexing throughput on a full drive, 1,286 to 17,614 files a second. Recall.' },
];

export interface LabNote {
  entryId: EntryId;
  body: string;
}

export const labNotes: readonly LabNote[] = [
  {
    entryId: 'te-001',
    body: 'A Raspberry Pi media player for CD, tape, AirPlay and Bluetooth. Proven on a virtual device, with 20 of 20 simulated power cuts recovered. Hardware comes next.',
  },
  {
    entryId: 'night-shift',
    body: 'A turn-based game built by six scheduled agents working from Linear tickets. I approve the plans, and 126 pull requests have merged.',
  },
  {
    entryId: 'derive',
    body: 'A trainer for data-structure theory across all 150 NeetCode problems, with visualizations produced by running the real algorithm.',
  },
];

export interface Role {
  entryId: EntryId;
  headline: string;
  body: string;
}

export interface Employment {
  period: string;
  company: string;
  summary: string;
  roles: readonly Role[];
}

export const employment: Employment = {
  period: 'Jul 2024 to present',
  company: 'Equifax',
  summary: 'Intermediate Software Engineer, promoted August 2026. Five Spring Boot and Angular systems in a team of eight.',
  roles: [
    {
      entryId: 'validation',
      headline: 'One ruleset',
      body: 'Designed a reusable identifier-validation microservice and migrated the downstream services onto it behind regression tests.',
    },
    {
      entryId: 'agentic',
      headline: '57 engineers',
      body: 'Co-led the rollout of agentic AI developer tooling and ran the training. Jira data showed maintenance task time down about 50%.',
    },
    {
      entryId: 'onboarding',
      headline: 'English and Spanish',
      body: 'Built the consumer onboarding flow end to end in Angular, with route guards, reactive forms and submission recovery.',
    },
    {
      entryId: 'upgrade',
      headline: 'v13 to v20',
      body: 'Upgraded an Angular admin portal across seven major versions and improved its accessibility on the way.',
    },
    {
      entryId: 'security',
      headline: '27% fewer findings',
      body: 'Cut vulnerability and tech-debt findings on a communications service with patched dependencies and a hardened Java image.',
    },
    {
      entryId: 'sequence',
      headline: 'Fixed before UAT',
      body: 'Traced duplicate-ID errors after a Spring Boot upgrade to an audit-log sequence reset in a migration.',
    },
  ],
};

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: readonly NavLink[] = [
  { label: 'Work', href: '#work' },
  { label: 'Lab', href: '#lab' },
  { label: 'Experience', href: '#experience' },
  { label: 'GitHub', href: 'https://github.com/Flame338' },
];

export const navCta: NavLink = { label: 'Get in touch', href: '#contact' };

export interface ContactLink {
  label: string;
  value: string;
  href: string;
}

export const contactLinks: readonly ContactLink[] = [
  { label: 'Email', value: 'stevethomas499@gmail.com', href: 'mailto:stevethomas499@gmail.com' },
  { label: 'GitHub', value: 'Flame338', href: 'https://github.com/Flame338' },
  { label: 'LinkedIn', value: 'stevethomas499', href: 'https://linkedin.com/in/stevethomas499' },
];

export const profile = {
  name: 'Steve Thomas',
  brand: 'steve thomas',
  eyebrow: 'Intermediate Software Engineer · Equifax · Thiruvananthapuram',
  headline: 'Software that answers before you finish typing.',
  intro:
    'I build Spring Boot services and Angular front ends for identity and credit workflows by day, and a C++ search engine and its Rust terminal client by night. This page is indexed the way my library indexes text. Try it.',
  description:
    'Steve Thomas is an Intermediate Software Engineer at Equifax who builds Spring Boot services, Angular front ends, a C++ search library and a Rust terminal client.',
  education: 'B.Tech Computer Science, Mar Baselios College of Engineering and Technology, 2024',
  location: 'Thiruvananthapuram, India',
  email: 'stevethomas499@gmail.com',
  sameAs: ['https://github.com/Flame338', 'https://linkedin.com/in/stevethomas499'],
} as const;
