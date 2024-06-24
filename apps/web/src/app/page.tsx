import Link from 'next/link';

import { DateTZ } from 'common';

import { Text } from 'ui';

export default async function HomePage() {
  const now = DateTZ();
  const dateString = now.format('YYYY-MM-DD HH:mm:ss');

  return (
    <>
      <Text as="h1" size="cta">
        {dateString}
      </Text>

      <div className="flex gap-4">
        <Link href="/signin">Sign in</Link>
        <Link href="/signup">Sign up</Link>
      </div>
    </>
  );
}
