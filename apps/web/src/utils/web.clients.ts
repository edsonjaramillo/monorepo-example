import { ClientFetcher, ServerFetcher } from 'common';

import { webEnv } from '../web.env';

export const clientFetcher = new ClientFetcher(webEnv.NEXT_PUBLIC_SERVER_URL);
export const serverFetcher = new ServerFetcher(webEnv.NEXT_PUBLIC_SERVER_URL);
