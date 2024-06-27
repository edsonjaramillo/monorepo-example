import type { JSendResponse } from '../http/JSend';

export class ClientFetcher {
  private readonly baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  async get<T>(path: string) {
    const endpoint = `${this.baseUrl}${path}`;
    const response = await fetch(endpoint, {
      credentials: 'include',
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
