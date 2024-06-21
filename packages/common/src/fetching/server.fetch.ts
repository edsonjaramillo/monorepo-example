import { cookies } from 'next/headers';

import type { JSendResponse } from '../http/JSend';

export class ServerFetcher {
  private readonly baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  async get<T>(path: string): Promise<JSendResponse<T>> {
    const endpoint = `${this.baseUrl}${path}`;
    const response = await fetch(endpoint, {
      headers: { ...cookies },
    });

    const data = await response.json();

    return data as JSendResponse<T>;
  }
}
