import type { Entry } from '../data/portfolio.ts';

export type Searchable = Pick<Entry, 'title' | 'line' | 'tag' | 'keywords'>;

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9+]+/)
    .filter(Boolean);
}

export function entryTokens(entry: Searchable): string[] {
  const all = tokenize([entry.title, entry.line, entry.tag, ...entry.keywords].join(' '));
  return [...new Set(all)];
}

// The same limits as LuxCore's fuzzy_max_distance, so the site forgives what Recall and LuxCore forgive.
function fuzzyMaxDistance(length: number): number {
  if (length <= 2) return 0;
  if (length <= 5) return 1;
  return 2;
}

function withinDistance(a: string, b: string, max: number): boolean {
  if (Math.abs(a.length - b.length) > max) return false;
  let previous = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const current = [i];
    for (let j = 1; j <= b.length; j++) {
      const substitution = previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1);
      current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, substitution);
    }
    if (Math.min(...current) > max) return false;
    previous = current;
  }
  return previous[b.length] <= max;
}

function termMatchesToken(term: string, token: string): boolean {
  if (token.startsWith(term)) return true;
  const max = fuzzyMaxDistance(term.length);
  return max > 0 && withinDistance(term, token, max);
}

export function matchesTokens(tokens: readonly string[], query: string): boolean {
  const terms = tokenize(query);
  return terms.every((term) => tokens.some((token) => termMatchesToken(term, token)));
}

export function matches(entry: Searchable, query: string): boolean {
  return matchesTokens(entryTokens(entry), query);
}

export function search<T extends Searchable>(entries: readonly T[], query: string): T[] {
  return entries.filter((entry) => matches(entry, query));
}
