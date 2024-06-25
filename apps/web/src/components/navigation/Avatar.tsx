'use client';

import Link from 'next/link';

import { useSession } from '../../lib/session.context';

export function Avatar() {
  const { session } = useSession();
  if (!session) {
    return <Link href="/signin">Sign In</Link>;
  }

  const firstLetter = session.user.name[0].toUpperCase() || '?';

  return (
    <div className="flex size-8 items-center justify-center rounded-full bg-primary-600 font-bold text-grayscale-50">
      <span>{firstLetter}</span>
    </div>
  );
}
