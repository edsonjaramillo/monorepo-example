import type { JSendResponse } from '../http/JSend';
import type { CustomRequestInit } from './shared.fetch';

export class ClientFetcher {
  private readonly baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  async get<T>(path: string, options?: CustomRequestInit) {
    const endpoint = `${this.baseUrl}${path}`;
    const response = await fetch(endpoint, {
      ...options,
      credentials: 'include',
      next: {
        ...options?.next,
        tags: ['all', ...(options?.tags ?? [])],
      },
    });

    const data = await response.json();

    return data as JSendResponse<T>;
  }

  async post<T>(path: string, body: Record<string, unknown>) {
    const endpoint = `${this.baseUrl}${path}`;
    const response = await fetch(endpoint, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return data as JSendResponse<T>;
  }

  async form<T>(path: string, formData: FormData) {
    const endpoint = `${this.baseUrl}${path}`;
    const response = await fetch(endpoint, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    const data = await response.json();

    return data as JSendResponse<T>;
  }
}
