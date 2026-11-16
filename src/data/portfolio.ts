export type EntryKind = 'project' | 'work';

export interface Entry {
  id: string;
  kind: EntryKind;
  title: string;
  line: string;
  tag: string;
  href: string | null;
  keywords: readonly string[];
}

export const workEntries = [
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
] as const satisfies readonly Entry[];

export type EntryId = (typeof workEntries)[number]['id'];

export interface Stat {
  value: string;
  caption: string;
}

export const stats: readonly Stat[] = [
  { value: '1.1 ms', caption: 'for the slowest 1% of keystrokes on 100,000 documents. It was 2.0 ms. LuxCore.' },
  { value: '3.4×', caption: 'less index memory, from 387 MB to 114 MB. The saved index is byte-for-byte the same. LuxCore.' },
  { value: '13.7×', caption: 'faster indexing of a whole drive, from 1,286 to 17,614 files a second. Recall.' },
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
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'GitHub', href: 'https://github.com/Flame338' },
];

export const projectPageLinks: readonly NavLink[] = [
  { label: 'All projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
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
