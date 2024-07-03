import type { MetadataRoute } from 'next';

export type FrequencyChange =
  | 'daily'
  | 'always'
  | 'hourly'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

export class SitemapCreator {
  private readonly baseUrl: string;
  private readonly pages: MetadataRoute.Sitemap;
  private readonly lastModified: Date;

  constructor(baseUrl_: string) {
    this.baseUrl = baseUrl_;
    this.pages = [];
    this.lastModified = new Date();
  }

  addPage(route: string, lastModified?: Date, changeFrequency?: FrequencyChange) {
    this.pages.push({
      url: this.baseUrl + route,
      lastModified: lastModified ?? this.lastModified,
      changeFrequency: changeFrequency ?? 'monthly',
    });
  }

  export(): MetadataRoute.Sitemap {
    return this.pages;
  }
}
