import { Redis as Client } from 'ioredis';

import { Logger } from 'common';

type Data = Record<string, any>;

type RedisOptions = {
  url: string;
  debug: boolean;
  skipCache?: boolean;
};

export class Redis {
  private readonly client: Client;
  private readonly debugMode: boolean;
  private readonly skipCache: boolean;

  constructor(options: RedisOptions) {
    this.client = new Client(options.url);
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

  async set(key: string, value: Data, expiration: number) {
    if (this.skipCache) {
      return;
    }

    if (this.debugMode) {
      Logger.log('YELLOW', 'CACHE SET', key);
    }

    await this.client.set(key, JSON.stringify(value), 'EX', expiration);
  }

  async delete(key: string) {
    if (this.skipCache) {
      return;
    }

    await this.client.del(key);
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
      const scan = await this.client.scan(0, 'MATCH', pattern);
      const keys = scan[1];

      if (keys.length === 0) {
        continue;
      }

      for (const key of keys) {
        if (this.debugMode) {
          Logger.log('RED', 'CACHE DEL', key);
        }

        pipeline.del(key);
      }
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
