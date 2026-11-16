import { homePath } from './paths.ts';
import type { Entry } from '../data/portfolio.ts';
import type { ProjectMeta } from './projectMeta.ts';
import type { ProjectData, ProjectStatus } from './projectSchema.ts';

export interface ProjectRecord {
  slug: string;
  data: ProjectData;
  meta: ProjectMeta;
}

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  active: 'active',
  'in-progress': 'in progress',
  working: 'working',
  paused: 'paused',
  finished: 'finished',
};

export function compareProjects(a: ProjectRecord, b: ProjectRecord): number {
  const aTime = a.meta.lastCommit?.getTime() ?? null;
  const bTime = b.meta.lastCommit?.getTime() ?? null;
  if (aTime !== bTime) {
    if (aTime === null) return 1;
    if (bTime === null) return -1;
    return bTime - aTime;
  }
  return a.data.title.localeCompare(b.data.title, 'en');
}

export function sortProjects<T extends ProjectRecord>(projects: readonly T[]): T[] {
  return [...projects].sort(compareProjects);
}

export function projectHref(base: string, slug: string): string {
  return `${homePath(base)}projects/${slug}/`;
}

export function projectEntry(project: ProjectRecord, base: string): Entry {
  return {
    id: project.slug,
    kind: 'project',
    title: project.data.title,
    line: project.data.line,
    tag: project.data.language,
    href: projectHref(base, project.slug),
    keywords: project.data.keywords,
  };
}

export function nextProject<T extends ProjectRecord>(sorted: readonly T[], slug: string): T | null {
  const index = sorted.findIndex((project) => project.slug === slug);
  if (index < 0 || sorted.length < 2) return null;
  return sorted[(index + 1) % sorted.length];
}

const NUMBER_WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

export function projectsIntro(featuredCount: number): string {
  const word = NUMBER_WORDS[featuredCount];
  if (featuredCount < 1 || !word) return 'Everything I have built, and each one has its own page.';
  return `${word} I'd show you first, then everything else. Each one has its own page.`;
}
