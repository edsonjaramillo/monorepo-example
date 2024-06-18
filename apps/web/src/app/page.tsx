import { DateTZ } from 'common';

import { Button, Text } from 'ui';

export default function HomePage() {
  const todayMidnight = DateTZ();
  const dateStr = todayMidnight.format('YYYY-MM-DD HH:mm:ss');

  return (
    <>
      <Text as="h1" size="cta">
        {dateStr}
      </Text>
      <Button type="button">Click me</Button>
    </>
  );
}
