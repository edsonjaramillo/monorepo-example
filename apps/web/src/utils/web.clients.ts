import { ClientFetcher, ServerFetcher } from 'common';

import { webEnv } from '../web.env';

export const clientFetcher = new ClientFetcher(webEnv.SERVER_URL);
export const serverFetcher = new ServerFetcher(webEnv.SERVER_URL);
