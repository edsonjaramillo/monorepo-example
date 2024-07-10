'use client';

import { usePostHog } from 'posthog-js/react';

import { Button } from 'ui';

import { AnalyticsEvents } from '../../utils/analytics/analytics.events';

export function ClickEventTest() {
  const posthog = usePostHog();

  return (
    <Button
      type="button"
      onClick={async () => {
        const { eventName, sendEvent } = AnalyticsEvents.callToAction();
        if (sendEvent) {
          posthog.capture(eventName);
        }
      }}>
      Click me for Call to Action Event
    </Button>
  );
}
