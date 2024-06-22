import type { CookieOptions } from 'hono/utils/cookie';

import { serverEnv } from '../server.env';

const isProduction = serverEnv.NODE_ENV === 'production';

export function cookieOptions(httpOnly: boolean, expires: Date) {
  return {
    ...(isProduction && { domain: '.example.com' }),
    httpOnly,
    expires,
    path: '/',
    secure: isProduction,
    sameSite: isProduction ? 'None' : 'Lax',
  } satisfies CookieOptions;
}
