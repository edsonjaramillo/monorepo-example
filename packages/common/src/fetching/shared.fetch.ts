import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export type CustomRequestInit = RequestInit & {
  nextCookies?: ReadonlyRequestCookies;
  tags?: string[];
};
