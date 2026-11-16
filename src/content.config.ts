import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { projectSchema } from './lib/projectSchema.ts';

const projects = defineCollection({
  loader: glob({
    base: './projects',
    pattern: '*/portfolio.md',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: projectSchema,
});

export const collections = { projects };
