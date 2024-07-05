import { Redis } from 'ioredis';

import { Expiration, Logger } from 'common';

type Data = Record<string, unknown>;

type CacheClientOptions = {
  url: string;
  debug: boolean;
  skipCache?: boolean;
};

const standardExpiration = Expiration.getHours(1);

export class CacheClient {
  private readonly client: Redis;
  private readonly debugMode: boolean;
  private readonly skipCache: boolean;

  constructor(options: CacheClientOptions) {
    this.client = new Redis(options.url);
    this.debugMode = options.debug ?? false;
    this.skipCache = options.skipCache ?? false;
  }

  async get<T>(key: string) {
    if (this.skipCache) {
      return undefined;
    }

    const value = await this.client.get(key);
    if (!value) {
      return undefined;
    }

    if (this.debugMode) {
      Logger.log('CYAN', 'CACHE GET', key);
    }

    return JSON.parse(value) as T;
  }

  async set(key: string, value: Data, expiration?: number) {
    if (this.skipCache) {
      return;
    }

    if (this.debugMode) {
      Logger.log('YELLOW', 'CACHE SET', key);
    }

    await this.client.set(key, JSON.stringify(value), 'EX', expiration ?? standardExpiration);
  }

  async delete(key: string) {
    if (this.skipCache) {
      return;
    }

    await this.client.unlink(key);
    if (this.debugMode) {
      Logger.log('RED', 'CACHE DEL', key);
    }
  }

  async cleanPatterns(patterns: string[]) {
    if (this.skipCache) {
      return;
    }

    const pipeline = this.client.pipeline();

    for (const pattern of patterns) {
      const stream = this.client.scanStream({
        match: pattern,
      });

      stream.on('data', (keys) => {
        for (const key of keys) {
          if (this.debugMode) {
            Logger.log('RED', 'CACHE DEL', key);
          }

          pipeline.unlink(key);
        }
      });
    }

    await pipeline.exec();
  }

  async flushAll() {
    if (this.skipCache) {
      return;
    }

    await this.client.flushall();
  }
}
