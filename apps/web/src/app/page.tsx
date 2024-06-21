import type { User } from 'db';

import { DateTZ } from 'common';

import { Button, Text } from 'ui';

import { fetcher } from '../utils/clients';

export default async function HomePage() {
  const now = DateTZ();
  const dateString = now.format('YYYY-MM-DD HH:mm:ss');
  const { data } = await fetcher.get<User[]>('/users');

  return (
    <>
      <Text as="h1" size="cta">
        {dateString}
      </Text>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Button type="button">Click me</Button>
    </>
  );
}
