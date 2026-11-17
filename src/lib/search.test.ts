import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { workEntries } from '../data/portfolio.ts';
import { sampleProjects } from './fixtures.ts';
import { projectEntry } from './projectModel.ts';
import { matches, search, tokenize } from './search.ts';

const entries = [...sampleProjects.map((project) => projectEntry(project, '/portfolio')), ...workEntries];

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

  it('finds LuxCore and Recall from the typo "serch"', () => {
    assert.deepEqual(ids('serch'), ['luxcore', 'recall']);
  });

  it('finds Recall for "rust"', () => {
    assert.ok(ids('rust').includes('recall'));
  });

  it('finds the Angular entry from the typo "angulr"', () => {
    assert.deepEqual(ids('angulr'), ['delivery']);
  });

  it('requires every term to match', () => {
    assert.deepEqual(ids('angular spanish'), ['delivery']);
    assert.deepEqual(ids('rust spanish'), []);
  });

  it('prefix-matches short terms', () => {
    assert.ok(ids('rus').includes('recall'));
  });

  it('forgives no typo in a word of one or two letters', () => {
    assert.deepEqual(ids('rx'), []);
  });

  it('forgives one typo in a word of three to five letters', () => {
    assert.ok(ids('sqk').includes('sequence'));
    assert.ok(ids('ruxt').includes('recall'));
    assert.ok(!ids('srach').includes('luxcore'));
  });

  it('forgives two typos in a word of six letters or more', () => {
    assert.deepEqual(ids('angluar'), ['delivery']);
  });

  it('finds projects without a page of their own yet', () => {
    assert.ok(ids('godot').includes('night-shift-agents'));
    assert.ok(ids('tape').includes('te-001'));
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
