import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { routeOrder } from './lib/content';

const routeIdSchema = z.enum(routeOrder);
const tagSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase kebab-case tags.');

const relatedLinkSchema = z.object({
  label: z.string().min(1),
  url: z.url(),
});

const coverSchema = z
  .object({
    cardImage: z.string().min(1),
    heroImage: z.string().min(1),
    alt: z.string().min(1),
    credit: z.string().min(1).optional(),
    creditUrl: z.url().optional(),
    mood: z.string().min(1).optional(),
  })
  .superRefine((cover, ctx) => {
    if (cover.creditUrl && !cover.credit) {
      ctx.addIssue({
        code: 'custom',
        message: 'Cover creditUrl requires cover credit.',
        path: ['creditUrl'],
      });
    }
  });

function isRemoteUrl(value: string) {
  return /^https?:\/\//.test(value);
}

const routes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/routes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z
    .object({
      title: z.string(),
      subtitle: z.string().optional(),
      summary: z.string(),
      status: z.enum(['Exploring', 'Building', 'Testing', 'Paused', 'Landed']),
      draft: z.boolean().default(false),
      updatedAt: z.coerce.date().optional(),
      revisionNote: z.string().optional(),
      primaryRoute: routeIdSchema,
      routes: z.array(routeIdSchema).default([]),
      tags: z.array(tagSchema).default([]),
      cover: coverSchema.optional(),
      relatedLogs: z.array(reference('logs')).default([]),
      relatedLinks: z.array(relatedLinkSchema).default([]),
    })
    .superRefine((project, ctx) => {
      if (project.routes.includes(project.primaryRoute)) {
        ctx.addIssue({
          code: 'custom',
          message: 'Additional routes should not repeat primaryRoute.',
          path: ['routes'],
        });
      }

      if (project.updatedAt && !project.revisionNote) {
        ctx.addIssue({
          code: 'custom',
          message: 'revisionNote is required when updatedAt is present.',
          path: ['revisionNote'],
        });
      }

      if (!project.updatedAt && project.revisionNote) {
        ctx.addIssue({
          code: 'custom',
          message: 'updatedAt is required when revisionNote is present.',
          path: ['updatedAt'],
        });
      }

      if (project.draft || !project.cover) {
        if (!project.draft && !project.cover) {
          ctx.addIssue({
            code: 'custom',
            message: 'Published Projects require cover metadata.',
            path: ['cover'],
          });
        }

        return;
      }

      if (isRemoteUrl(project.cover.cardImage)) {
        ctx.addIssue({
          code: 'custom',
          message: 'Published Projects must use a local cardImage path.',
          path: ['cover', 'cardImage'],
        });
      }

      if (isRemoteUrl(project.cover.heroImage)) {
        ctx.addIssue({
          code: 'custom',
          message: 'Published Projects must use a local heroImage path.',
          path: ['cover', 'heroImage'],
        });
      }
    }),
});

const logs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/logs' }),
  schema: z
    .object({
      title: z.string(),
      subtitle: z.string(),
      summary: z.string(),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      revisionNote: z.string().optional(),
      type: z.enum(['Note', 'Experiment', 'Retrospective', 'Guide', 'Reference']),
      draft: z.boolean().default(false),
      primaryRoute: routeIdSchema,
      tags: z.array(tagSchema).default([]),
      cover: coverSchema.optional(),
      relatedProjects: z.array(reference('projects')).default([]),
      relatedLinks: z.array(relatedLinkSchema).default([]),
      discussionUrl: z.url().optional(),
    })
    .superRefine((log, ctx) => {
      if (log.updatedAt && !log.revisionNote) {
        ctx.addIssue({
          code: 'custom',
          message: 'revisionNote is required when updatedAt is present.',
          path: ['revisionNote'],
        });
      }

      if (!log.updatedAt && log.revisionNote) {
        ctx.addIssue({
          code: 'custom',
          message: 'updatedAt is required when revisionNote is present.',
          path: ['updatedAt'],
        });
      }

      if (log.draft || !log.cover) {
        if (!log.draft && !log.cover) {
          ctx.addIssue({
            code: 'custom',
            message: 'Published Logs require cover metadata.',
            path: ['cover'],
          });
        }

        return;
      }

      if (isRemoteUrl(log.cover.cardImage)) {
        ctx.addIssue({
          code: 'custom',
          message: 'Published Logs must use a local cardImage path.',
          path: ['cover', 'cardImage'],
        });
      }

      if (isRemoteUrl(log.cover.heroImage)) {
        ctx.addIssue({
          code: 'custom',
          message: 'Published Logs must use a local heroImage path.',
          path: ['cover', 'heroImage'],
        });
      }
    }),
});

export const collections = {
  logs,
  projects,
  routes,
};
