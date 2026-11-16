import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { project, sampleProjects } from './fixtures.ts';
import { nextProject, projectEntry, projectHref, projectsIntro, sortProjects } from './projectModel.ts';

const slugs = (list: readonly { slug: string }[]) => list.map((p) => p.slug);

describe('sortProjects', () => {
  it('puts the newest commit first and projects with no commit date last, then by title', () => {
    assert.deepEqual(slugs(sortProjects(sampleProjects)), ['recall', 'luxcore', 'night-shift-agents', 'te-001']);
  });

  it('breaks ties on the same commit time by title', () => {
    const same = '2026-01-01T00:00:00Z';
    const sorted = sortProjects([project('b', 'Beta', same), project('a', 'Alpha', same)]);
    assert.deepEqual(slugs(sorted), ['a', 'b']);
  });

  it('does not reorder the input', () => {
    const input = [project('b', 'Beta', null), project('a', 'Alpha', '2026-01-01T00:00:00Z')];
    sortProjects(input);
    assert.deepEqual(slugs(input), ['b', 'a']);
  });
});

describe('projectEntry', () => {
  const luxcore = sampleProjects[0];

  it('derives a search entry from a project', () => {
    assert.deepEqual(projectEntry(luxcore, '/portfolio'), {
      id: 'luxcore',
      kind: 'project',
      title: 'LuxCore',
      line: 'A search library you can embed, with BM25 ranking and typo tolerance',
      tag: 'C++20',
      href: '/portfolio/projects/luxcore/',
      keywords: ['search', 'library', 'lucene', 'bm25', 'cpp', 'c++'],
    });
  });

  it('builds the same href whether or not the base ends in a slash', () => {
    assert.equal(projectHref('/portfolio/', 'recall'), '/portfolio/projects/recall/');
    assert.equal(projectHref('/portfolio', 'recall'), '/portfolio/projects/recall/');
    assert.equal(projectHref('/', 'recall'), '/projects/recall/');
  });
});

describe('nextProject', () => {
  const sorted = sortProjects(sampleProjects);

  it('returns the following project in list order', () => {
    assert.equal(nextProject(sorted, 'recall')?.slug, 'luxcore');
  });

  it('wraps from the last project to the first', () => {
    assert.equal(nextProject(sorted, 'te-001')?.slug, 'recall');
  });

  it('returns nothing when there is no other project to go to', () => {
    assert.equal(nextProject([sorted[0]], sorted[0].slug), null);
    assert.equal(nextProject(sorted, 'missing'), null);
  });
});

describe('projectsIntro', () => {
  it('spells out the featured count', () => {
    assert.match(projectsIntro(2), /^Two I'd show you first/);
    assert.match(projectsIntro(1), /^One I'd show you first/);
  });

  it('states no number when nothing is featured or the count is large', () => {
    assert.doesNotMatch(projectsIntro(0), /show you first/);
    assert.doesNotMatch(projectsIntro(11), /show you first/);
  });
});
