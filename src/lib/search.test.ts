import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { entries } from '../data/portfolio.ts';
import { matches, search, tokenize } from './search.ts';

const ids = (query: string) => search(entries, query).map((e) => e.id);

describe('tokenize', () => {
  it('lowercases and splits on punctuation but keeps c++', () => {
    assert.deepEqual(tokenize('C++20 Night-shift, Godot'), ['c++20', 'night', 'shift', 'godot']);
  });
});

describe('search', () => {
  it('returns every entry for an empty or blank query', () => {
    assert.equal(search(entries, '').length, entries.length);
    assert.equal(search(entries, '   ').length, entries.length);
  });

  it('finds LuxCore from the typo "serch"', () => {
    assert.ok(ids('serch').includes('luxcore'));
  });

  it('finds Recall for "rust"', () => {
    assert.ok(ids('rust').includes('recall'));
  });

  it('finds both Angular entries from the typo "angulr"', () => {
    assert.deepEqual(ids('angulr'), ['onboarding', 'upgrade']);
  });

  it('requires every term to match', () => {
    assert.deepEqual(ids('angular spanish'), ['onboarding']);
    assert.deepEqual(ids('rust spanish'), []);
  });

  it('prefix-matches short terms without fuzziness', () => {
    assert.ok(ids('rus').includes('recall'));
    assert.deepEqual(ids('rux'), []);
  });

  it('finds lab entries', () => {
    assert.ok(ids('godot').includes('night-shift'));
    assert.ok(ids('neetcode').includes('derive'));
  });

  it('returns nothing for nonsense', () => {
    assert.deepEqual(ids('zzzzqx'), []);
    assert.deepEqual(ids('lucene zzzzqx'), []);
  });

  it('matches a single entry directly', () => {
    const luxcore = entries[0];
    assert.equal(matches(luxcore, 'bm25'), true);
    assert.equal(matches(luxcore, 'rust'), false);
  });
});
