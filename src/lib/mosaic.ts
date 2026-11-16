export const SQUARES = 192;

export function litSquares(query: string, hits: number, total: number): boolean[] {
  const q = query.toLowerCase().trim();
  let seed = 7;
  for (let i = 0; i < q.length; i++) seed = (seed * 31 + q.charCodeAt(i)) % 9973;
  const density = q ? 0.08 + 0.5 * (hits / total) : 0.3;
  const lit: boolean[] = [];
  for (let i = 0; i < SQUARES; i++) {
    seed = (seed * 1103 + 12345) % 65521;
    lit.push(seed / 65521 < density);
  }
  return lit;
}
