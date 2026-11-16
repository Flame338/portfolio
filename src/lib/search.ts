import type { Entry } from '../data/portfolio.ts';

export type Searchable = Pick<Entry, 'title' | 'line' | 'tag' | 'keywords'>;

const FUZZY_MIN_LENGTH = 4;

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

function withinOneEdit(a: string, b: string): boolean {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  if (i === a.length || i === b.length) return true;
  return (
    a.slice(i + 1) === b.slice(i + 1) ||
    a.slice(i + 1) === b.slice(i) ||
    a.slice(i) === b.slice(i + 1)
  );
}

function termMatchesToken(term: string, token: string): boolean {
  if (token.startsWith(term)) return true;
  if (term.length < FUZZY_MIN_LENGTH) return false;
  // A dropped or doubled letter shifts the prefix by one, so compare three prefix lengths.
  for (let length = term.length - 1; length <= term.length + 1; length++) {
    if (withinOneEdit(token.slice(0, length), term)) return true;
  }
  return false;
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
