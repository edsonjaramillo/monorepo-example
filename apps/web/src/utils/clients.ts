import { ClientFetcher, ServerFetcher } from 'common';

export const clientFetcher = new ClientFetcher('http://localhost:8080');
export const serverFetcher = new ServerFetcher('http://localhost:8080');
