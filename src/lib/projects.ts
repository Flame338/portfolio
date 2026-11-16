import { getCollection, type CollectionEntry } from 'astro:content';
import { readProjectMeta } from './projectMeta.ts';
import { sortProjects, type ProjectRecord } from './projectModel.ts';

export interface LoadedProject extends ProjectRecord {
  entry: CollectionEntry<'projects'>;
}

let loaded: Promise<LoadedProject[]> | undefined;

export function getProjects(): Promise<LoadedProject[]> {
  loaded ??= getCollection('projects').then((entries) =>
    sortProjects(entries.map((entry) => ({ slug: entry.id, data: entry.data, meta: readProjectMeta(entry.id), entry }))),
  );
  return loaded;
}
