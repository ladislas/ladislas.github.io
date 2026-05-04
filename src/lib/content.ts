import type { CollectionEntry } from 'astro:content';

export function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function isPublishedLog(log: CollectionEntry<'logs'>) {
  return !log.data.draft;
}

export function sortLogsByDateDesc(
  left: CollectionEntry<'logs'>,
  right: CollectionEntry<'logs'>,
) {
  return right.data.publishedAt.valueOf() - left.data.publishedAt.valueOf();
}

export function sortProjectsByUpdatedDesc(
  left: CollectionEntry<'projects'>,
  right: CollectionEntry<'projects'>,
) {
  return right.data.updatedAt.valueOf() - left.data.updatedAt.valueOf();
}
