import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { SQUARES, litSquares } from './mosaic.ts';

describe('litSquares', () => {
  it('returns one flag per square', () => {
    assert.equal(litSquares('', 11, 11).length, SQUARES);
  });

  it('is deterministic for the same query', () => {
    assert.deepEqual(litSquares('rust', 1, 11), litSquares('rust', 1, 11));
  });

  it('lights more squares when more entries match', () => {
    const count = (hits: number) => litSquares('a', hits, 11).filter(Boolean).length;
    assert.ok(count(11) > count(1));
  });

  it('treats casing and surrounding space as the same query', () => {
    assert.deepEqual(litSquares('  Rust ', 1, 11), litSquares('rust', 1, 11));
  });
});
