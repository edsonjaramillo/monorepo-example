import { DateTZ } from 'common';

import { Responsive, Text } from 'ui';

import { ClickEventTest } from '../components/analytics/ClickEventTest';

export default async function HomePage() {
  const now = DateTZ();
  const dateString = now.format('YYYY-MM-DD HH:mm:ss');

  return (
    <Responsive>
      <Text as="h1" size="cta">
        {dateString}
      </Text>
      <div className="flex gap-6">
        <ClickEventTest />
      </div>
    </Responsive>
  );
}
