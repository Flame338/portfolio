import type { ProjectMeta } from './projectMeta.ts';
import type { ProjectRecord } from './projectModel.ts';

export const meta = (lastCommit: string | null, isSubmodule = false): ProjectMeta => ({
  lastCommit: lastCommit ? new Date(lastCommit) : null,
  revision: isSubmodule && lastCommit ? 'abc1234' : null,
  isSubmodule,
});

export const project = (
  slug: string,
  title: string,
  lastCommit: string | null,
  data: Partial<ProjectRecord['data']> = {},
): ProjectRecord => ({
  slug,
  meta: meta(lastCommit),
  data: {
    title,
    line: `${title} in one line`,
    language: 'Rust',
    status: 'active',
    featured: false,
    keywords: [],
    summary: `${title} summary.`,
    ...data,
  },
});

export const sampleProjects: ProjectRecord[] = [
  project('luxcore', 'LuxCore', '2026-10-01T10:00:00Z', {
    line: 'A search library you can embed, with BM25 ranking and typo tolerance',
    language: 'C++20',
    keywords: ['search', 'library', 'lucene', 'bm25', 'cpp', 'c++'],
  }),
  project('recall', 'Recall', '2026-11-01T10:00:00Z', {
    line: 'Code search in the terminal, across all my projects',
    keywords: ['rust', 'terminal', 'search'],
  }),
  project('te-001', 'TE-001', null, {
    line: 'A Raspberry Pi media player for CD, tape, AirPlay and Bluetooth',
    language: 'Python',
    keywords: ['raspberry', 'pi', 'tape', 'airplay'],
  }),
  project('night-shift-agents', 'Night-shift agents', null, {
    language: 'C++ · Godot',
    keywords: ['godot', 'game', 'agents'],
  }),
];
