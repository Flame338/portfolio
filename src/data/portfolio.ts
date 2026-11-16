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
    line: 'A search library you can embed, with BM25 ranking and typo tolerance',
    tag: 'C++20',
    href: '#luxcore',
    keywords: ['search', 'library', 'lucene', 'bm25', 'index', 'memory', 'fuzzy', 'typo', 'cpp', 'c++', 'engine'],
  },
  {
    id: 'recall',
    kind: 'project',
    title: 'Recall',
    line: 'Code search in the terminal, across all my projects',
    tag: 'Rust',
    href: '#recall',
    keywords: ['rust', 'terminal', 'tui', 'daemon', 'watcher', 'code', 'search', 'memory', 'files'],
  },
  {
    id: 'validation',
    kind: 'work',
    title: 'Identifier validation service',
    line: 'One service replaced validation logic copied across several',
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
    line: 'A turn-based game that six scheduled AI agents build',
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
      'A full-text search library you can embed, modeled on Apache Lucene. It has an inverted index, BM25 ranking, search-as-you-type that forgives typos, and a query parser with booleans and phrases. The index saves to one binary file, and loading checks that file before allocating anything.',
    points: [
      'Needs only the C++ standard library, and ships a C API with a Python example',
      'You can keep searching while another thread adds documents',
      'CI builds on g++ and clang++, debug and release, with warnings as errors',
    ],
    sourceHref: 'https://github.com/Flame338/LuxCore',
  },
  {
    entryId: 'recall',
    index: '02 · Rust',
    format: 'terminal tool',
    summary:
      'Code search in the terminal, across every project on my machine. A background daemon watches the folders, so an edit shows up in results about a second after I save. Reopening a project only re-indexes the files that changed.',
    points: [
      'Calls LuxCore through its C API',
      'Memory per indexed file went from 25.7 KB to 3.9 KB',
      'Has a JSON command line for scripts, and can search all projects at once',
    ],
    sourceHref: 'https://github.com/Flame338/recall-tui',
  },
];

export interface Stat {
  value: string;
  caption: string;
}

export const stats: readonly Stat[] = [
  { value: '1.1 ms', caption: 'for the slowest 1% of keystrokes on 100,000 documents. It was 2.0 ms. LuxCore.' },
  { value: '3.4×', caption: 'less index memory, from 387 MB to 114 MB. The saved index is byte-for-byte the same. LuxCore.' },
  { value: '13.7×', caption: 'faster indexing of a whole drive, from 1,286 to 17,614 files a second. Recall.' },
];

export interface LabNote {
  entryId: EntryId;
  body: string;
}

export const labNotes: readonly LabNote[] = [
  {
    entryId: 'te-001',
    body: "A Raspberry Pi media player for CD, tape, AirPlay and Bluetooth. I don't have the Pi yet, so for now it runs on a virtual device, where it recovered from 20 out of 20 simulated power cuts.",
  },
  {
    entryId: 'night-shift',
    body: 'A turn-based game that six scheduled AI agents build from Linear tickets. I approve their plans and answer their critiques. 126 pull requests have merged so far.',
  },
  {
    entryId: 'derive',
    body: 'A trainer for data-structure theory that covers all 150 NeetCode problems. Each step-through visualization is recorded from a real run of the algorithm.',
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
  summary: 'Intermediate Software Engineer since August 2026. I work on five Spring Boot and Angular systems in a team of eight.',
  roles: [
    {
      entryId: 'validation',
      headline: 'One ruleset',
      body: 'I designed one identifier-validation microservice to replace logic that was copied across services, then moved those services onto it with regression tests in place.',
    },
    {
      entryId: 'agentic',
      headline: '57 engineers',
      body: 'I co-led the rollout of agentic AI developer tooling and trained 57 engineers on it. Jira data showed maintenance tasks taking about half as long afterwards.',
    },
    {
      entryId: 'onboarding',
      headline: 'English and Spanish',
      body: 'I built the consumer onboarding flow in Angular, in both languages, with route guards, reactive forms and recovery when a submission fails.',
    },
    {
      entryId: 'upgrade',
      headline: 'v13 to v20',
      body: 'I upgraded an Angular admin portal across seven major versions, replaced the deprecated APIs and fixed accessibility problems along the way.',
    },
    {
      entryId: 'security',
      headline: '27% fewer findings',
      body: 'On a communications service, I patched dependencies, updated the async code and moved it to a hardened Java image. Vulnerability and tech-debt findings dropped 27%.',
    },
    {
      entryId: 'sequence',
      headline: 'Fixed before UAT',
      body: 'After a Spring Boot upgrade, duplicate-ID errors appeared. I traced them to a database migration that had reset the audit-log sequence, and it was fixed before users saw it.',
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
    "At Equifax I build Spring Boot services and Angular front ends for identity and credit workflows. Outside work I'm writing a search engine in C++ and a terminal client for it in Rust. The list on this page is searchable the same way my library searches text, so try a typo.",
  description:
    'Steve Thomas is an Intermediate Software Engineer at Equifax who builds Spring Boot services, Angular front ends, a C++ search library and a Rust terminal client.',
  education: 'B.Tech Computer Science, Mar Baselios College of Engineering and Technology, 2024',
  location: 'Thiruvananthapuram, India',
  email: 'stevethomas499@gmail.com',
  sameAs: ['https://github.com/Flame338', 'https://linkedin.com/in/stevethomas499'],
} as const;
