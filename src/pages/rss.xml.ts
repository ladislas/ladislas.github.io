import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { isPublishedLog, sortLogsByDateDesc } from '../lib/content';

export async function GET(context: { site: URL | undefined }) {
  const logs = (await getCollection('logs')).filter(isPublishedLog).sort(sortLogsByDateDesc);

  return rss({
    title: 'Workshop Terminal',
    description: 'Notes from the quiet edge of building things.',
    site: context.site ?? 'https://ladislas.github.io',
    items: logs.map((log) => ({
      title: log.data.title,
      description: log.data.summary,
      pubDate: log.data.publishedAt,
      link: `/logs/${log.id}/`,
    })),
  });
}
