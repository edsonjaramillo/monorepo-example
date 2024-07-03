import type { MetadataRoute } from 'next';

import { Expiration, type FrequencyChange, SitemapCreator } from 'common';

type SitemapItem = {
  path: string;
  changeFrequency?: FrequencyChange;
  lastModified?: Date;
};

const coreRoutes: SitemapItem[] = [
  {
    path: '/',
    changeFrequency: 'weekly',
  },
  {
    path: '/contact',
    changeFrequency: 'monthly',
  },
];

export const revalidate = Expiration.getDays(14);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://example.com';
  const sitemapGenerator = new SitemapCreator(baseUrl);

  for (const route of coreRoutes) {
    sitemapGenerator.addPage(route.path, route.lastModified, route.changeFrequency);
  }

  return sitemapGenerator.export();
}
