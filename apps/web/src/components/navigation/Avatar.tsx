'use client';

import { UserCircleIcon } from '@heroicons/react/24/solid';

import { useAuthPopup } from '../../lib/authPopup.context';
import { useSession } from '../../lib/session.context';
import { AuthPopup } from '../AuthDropdown';

export function Avatar() {
  const { session } = useSession();

  return (
    <div className="relative">
      {session ? <SignedInAvatar /> : <SignedOutAvatar />}
      <AuthPopup />
    </div>
  );
}

function SignedInAvatar() {
  const { session } = useSession();
  const { isOpen, setAuthPopup } = useAuthPopup();

  const firstLetter = session!.user.name[0].toUpperCase();

  return (
    <button
      type="button"
      className="flex size-8 items-center justify-center rounded-full bg-primary-600 font-bold text-grayscale-50"
      onClick={() => {
        setAuthPopup(!isOpen);
      }}>
      <span>{firstLetter}</span>
    </button>
  );
}

function SignedOutAvatar() {
  const { isOpen, setAuthPopup } = useAuthPopup();
  return (
    <button
      type="button"
      className="flex items-center justify-center rounded-full font-bold text-grayscale-50"
      onClick={() => {
        setAuthPopup(!isOpen);
      }}>
      <span className="sr-only">Signed Out Avatar</span>
      <UserCircleIcon className="size-8 text-grayscale-950" />
    </button>
  );
}
