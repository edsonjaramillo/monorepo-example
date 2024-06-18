import { DateTZ } from 'common';

import { Button, Text } from 'ui/atoms';

export default function HomePage() {
  const todayMidnight = DateTZ()
    .set('hour', 0)
    .set('minute', 0)
    .set('second', 0)
    .set('millisecond', 0);

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
