'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';

import { webEnv } from '../../web.env';

export default function PostHogPageView() {
  const pathname = usePathname();
  const searchParameters = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    // Track pageviews
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParameters.toString()) {
        url += `?${searchParameters.toString()}`;
      }

      if (webEnv.NEXT_PUBLIC_POSTHOG_PAGEVIEW_ENABLED) {
        posthog.capture('$pageview', { $current_url: url });
      }
    }
  }, [pathname, searchParameters, posthog]);

  return undefined;
}
