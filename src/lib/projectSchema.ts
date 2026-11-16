import { z } from 'astro/zod';

export const PROJECT_STATUSES = ['active', 'in-progress', 'working', 'paused', 'finished'] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export const projectSchema = z.strictObject({
  title: z.string().min(1),
  line: z
    .string()
    .min(1)
    .refine((line) => !line.endsWith('.'), 'line is one sentence with no trailing period'),
  language: z.string().min(1),
  status: z.enum(PROJECT_STATUSES),
  featured: z.boolean().default(false),
  keywords: z.array(z.string().min(1)),
  source: z.url().optional(),
  numbers: z
    .array(z.strictObject({ value: z.coerce.string().min(1), caption: z.string().min(1) }))
    .max(3)
    .optional(),
  summary: z.string().min(1),
});

export type ProjectData = z.output<typeof projectSchema>;
