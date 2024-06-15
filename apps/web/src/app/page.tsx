import { DateTZ } from 'common/datetime';

import { Text } from 'ui';

export default function HomePage() {
  const todayMidnight = DateTZ()
    .set('hour', 0)
    .set('minute', 0)
    .set('second', 0)
    .set('millisecond', 0);

  const dateStr = todayMidnight.format('YYYY-MM-DD HH:mm:ss');

  return <Text as="h1">{dateStr}</Text>;
}
