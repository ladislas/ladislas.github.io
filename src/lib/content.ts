import type { CollectionEntry } from 'astro:content';

export const routeOrder = ['code', 'product', 'tools', 'systems', 'field-notes'] as const;

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

export function isPublishedProject(project: CollectionEntry<'projects'>) {
  return !project.data.draft;
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
  const dateDiff =
    (right.data.updatedAt?.valueOf() ?? 0) - (left.data.updatedAt?.valueOf() ?? 0);

  return dateDiff !== 0 ? dateDiff : left.id.localeCompare(right.id);
}

export function sortRoutesByOrder(
  left: CollectionEntry<'routes'>,
  right: CollectionEntry<'routes'>,
) {
  const leftIndex = routeOrder.indexOf(left.id as (typeof routeOrder)[number]);
  const rightIndex = routeOrder.indexOf(right.id as (typeof routeOrder)[number]);

  return (leftIndex === -1 ? Infinity : leftIndex) - (rightIndex === -1 ? Infinity : rightIndex);
}
