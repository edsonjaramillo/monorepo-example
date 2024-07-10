import type { JSendResponse } from '../http';
import type { CustomRequestInit } from './shared.fetch';

export class ServerFetcher {
  private readonly baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  async get<T>(path: string, options?: CustomRequestInit) {
    const endpoint = `${this.baseUrl}${path}`;
    const response = await fetch(endpoint, {
      ...options,
      credentials: 'include',
      headers: {
        ...options?.headers,
        ...(options?.nextCookies && { Cookie: options.nextCookies.toString() }),
      },
      next: {
        ...options?.next,
        tags: ['all', ...(options?.tags ?? [])],
      },
    });

    const data = await response.json();

    return data as JSendResponse<T>;
  }
}
