import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const routes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/routes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(['planned', 'active', 'paused', 'complete']).default('active'),
    updatedAt: z.coerce.date(),
    route: reference('routes'),
    tags: z.array(z.string()).default([]),
  }),
});

const logs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/logs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    route: reference('routes'),
    tags: z.array(z.string()).default([]),
    relatedProjects: z.array(reference('projects')).default([]),
    discussionUrl: z.url().optional(),
  }),
});

export const collections = {
  logs,
  projects,
  routes,
};
