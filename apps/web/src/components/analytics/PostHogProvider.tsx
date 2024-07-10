'use client';

import { posthog } from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';

import { webEnv } from '../../web.env';

if (typeof window !== 'undefined' && webEnv.NEXT_PUBLIC_POSTHOG_ENABLED) {
  posthog.init(webEnv.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: webEnv.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: 'never',
    capture_pageleave: true,
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually
  });
}

type PostHogProviderProperties = {
  children: React.ReactNode;
};

export function PostHogProvider({ children }: PostHogProviderProperties) {
  return <PHProvider client={posthog}>{children}</PHProvider>;
}
