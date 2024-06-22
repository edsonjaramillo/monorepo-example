import { cookies } from 'next/headers';

import type { JSendResponse } from '../http/JSend';

export class ServerFetcher {
  private readonly baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  async get<T>(path: string) {
    const endpoint = `${this.baseUrl}${path}`;
    const response = await fetch(endpoint, {
      credentials: 'include',
      headers: { Cookie: cookies().toString() },
    });

    const data = await response.json();

    return data as JSendResponse<T>;
  }
}
