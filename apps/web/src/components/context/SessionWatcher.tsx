'use client';

import Cookie from 'js-cookie';
import { useEffect } from 'react';

import type { SessionWithUser } from 'db';

import { useSession } from '../../context/web.context';
import { clientFetcher } from '../../utils/web.clients';

export function SessionWatcher() {
  const { signin, signout } = useSession();

  useEffect(() => {
    (async () => {
      const sessionId = Cookie.get('session');
      if (!sessionId) {
        await signout();
        return;
      }

      const response = await clientFetcher.get<SessionWithUser>('/user/auth/auto-signin');
      if (response.status === 'success') {
        signin(response.data);
        return;
      }

      await signout();
    })();
  }, []);

  return undefined;
}
