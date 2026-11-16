import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { readProjectMeta, type MetaDeps } from './projectMeta.ts';

const deps = (overrides: Partial<MetaDeps>): MetaDeps => ({
  root: '/repo',
  exists: () => false,
  git: () => '',
  ...overrides,
});

describe('readProjectMeta', () => {
  it('reads the date and short revision from a submodule checkout', () => {
    const calls: string[][] = [];
    const meta = readProjectMeta(
      'luxcore',
      deps({
        exists: (path) => path.replaceAll('\\', '/').endsWith('projects/luxcore/.git'),
        git: (args) => {
          calls.push(args);
          return '2026-10-01T10:00:00+05:30\nabc1234\n';
        },
      }),
    );
    assert.equal(meta.isSubmodule, true);
    assert.equal(meta.revision, 'abc1234');
    assert.equal(meta.lastCommit?.toISOString(), '2026-10-01T04:30:00.000Z');
    assert.deepEqual(calls[0].slice(0, 1), ['-C']);
    assert.deepEqual(calls[0].slice(2), ['log', '-1', '--format=%cI%n%h']);
  });

  it('uses the parent repository history for a plain folder and records no revision', () => {
    const calls: string[][] = [];
    const meta = readProjectMeta(
      'derive',
      deps({
        git: (args) => {
          calls.push(args);
          return '2026-09-02T08:00:00Z\n';
        },
      }),
    );
    assert.deepEqual(calls[0], ['log', '-1', '--format=%cI', '--', 'projects/derive']);
    assert.equal(meta.isSubmodule, false);
    assert.equal(meta.revision, null);
    assert.equal(meta.lastCommit?.toISOString(), '2026-09-02T08:00:00.000Z');
  });

  it('returns nulls when git fails instead of throwing', () => {
    const failing = deps({
      git: () => {
        throw new Error('not a git repository');
      },
    });
    assert.deepEqual(readProjectMeta('derive', failing), { lastCommit: null, revision: null, isSubmodule: false });
    assert.deepEqual(readProjectMeta('derive', { ...failing, exists: () => true }), {
      lastCommit: null,
      revision: null,
      isSubmodule: true,
    });
  });

  it('returns nulls for an untracked folder or unparseable output', () => {
    assert.equal(readProjectMeta('new', deps({ git: () => '' })).lastCommit, null);
    assert.equal(readProjectMeta('new', deps({ git: () => 'garbage' })).lastCommit, null);
  });
});
