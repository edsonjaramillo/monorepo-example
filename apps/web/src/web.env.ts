import { z } from 'zod';

import { zString, zStringToBoolean } from 'validation';

import { NODE_ENV } from 'common';

const webEnvSchema = z.object({
  NODE_ENV: z.enum(NODE_ENV),
  NEXT_PUBLIC_SERVER_URL: zString,
  NEXT_PUBLIC_POSTHOG_KEY: zString,
  NEXT_PUBLIC_POSTHOG_HOST: zString,
  NEXT_PUBLIC_POSTHOG_ENABLED: zStringToBoolean,
  NEXT_PUBLIC_POSTHOG_PAGEVIEW_ENABLED: zStringToBoolean,
});

export const webEnv = webEnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  NEXT_PUBLIC_POSTHOG_ENABLED: process.env.NEXT_PUBLIC_POSTHOG_CUSTOM_EVENTS_ENABLED,
  NEXT_PUBLIC_POSTHOG_PAGEVIEW_ENABLED: process.env.NEXT_PUBLIC_POSTHOG_PAGEVIEW_ENABLED,
});
