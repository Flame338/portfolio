import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

export interface ProjectMeta {
  lastCommit: Date | null;
  revision: string | null;
  isSubmodule: boolean;
}

export interface MetaDeps {
  root: string;
  exists: (path: string) => boolean;
  git: (args: string[]) => string;
}

const root = process.cwd();

const defaultDeps: MetaDeps = {
  root,
  exists: existsSync,
  git: (args) => execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 15_000 }),
};

const parseDate = (text: string | undefined): Date | null => {
  if (!text) return null;
  const date = new Date(text);
  return Number.isNaN(date.getTime()) ? null : date;
};

export function readProjectMeta(slug: string, deps: MetaDeps = defaultDeps): ProjectMeta {
  const folder = join(deps.root, 'projects', slug);
  const isSubmodule = deps.exists(join(folder, '.git'));
  try {
    if (isSubmodule) {
      const [committed, revision] = deps.git(['-C', folder, 'log', '-1', '--format=%cI%n%h']).trim().split(/\r?\n/);
      const lastCommit = parseDate(committed);
      return { lastCommit, revision: lastCommit && revision ? revision : null, isSubmodule };
    }
    const committed = deps.git(['log', '-1', '--format=%cI', '--', `projects/${slug}`]).trim();
    return { lastCommit: parseDate(committed), revision: null, isSubmodule };
  } catch {
    return { lastCommit: null, revision: null, isSubmodule };
  }
}
