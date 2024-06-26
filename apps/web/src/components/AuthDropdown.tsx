'use client';

import Link from 'next/link';
import { useRef } from 'react';

import { Button, Seperator, Text, buttonVariants, cn } from 'ui';

import { useAuthPopup } from '../lib/authPopup.context';
import { useSession } from '../lib/session.context';

export function AuthPopup() {
  const { session } = useSession();
  const { isOpen } = useAuthPopup();

  const popup = cn(
    'absolute right-0 top-2 z-modal w-52 space-y-3 rounded border border-grayscale-neutral bg-grayscale-50 p-4 transition-all duration-base',
    isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
  );

  return (
    <>
      <div className="relative">
        <div className={popup}>
          <ProfileSection />
          <Seperator />
          <div className="flex flex-col gap-2">
            {session ? <SignoutButton /> : <SignInLink />}
            {!session && <CreateAccountLink />}
          </div>
        </div>
      </div>
      {<TurnOffPopupInvisible />}
    </>
  );
}

export function TurnOffPopupInvisible() {
  const { isOpen, setAuthPopup } = useAuthPopup();
  const wrapper = cn(
    'fixed left-0 top-0 z-blur h-screen w-screen backdrop-blur-md transition-all duration-base',
    isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
  );

  const turnOffPopup = useRef<HTMLDivElement>(null);

  return (
    <div
      id="auth-dropdown-close"
      className={wrapper}
      ref={turnOffPopup}
      onClick={(event) => {
        if (turnOffPopup.current === event.target) {
          setAuthPopup(false);
        }
      }}
    />
  );
}

function SignoutButton() {
  const { signout } = useSession();
  const { setAuthPopup } = useAuthPopup();

  return (
    <Button
      type="button"
      color="error"
      onClick={async () => {
        await signout();
        setAuthPopup(false);
      }}>
      Sign Out
    </Button>
  );
}

function SignInLink() {
  const { setAuthPopup } = useAuthPopup();

  return (
    <Link
      href="/signin"
      className={buttonVariants({ color: 'success', width: 'full' })}
      onClick={() => {
        setAuthPopup(false);
      }}>
      Sign In
    </Link>
  );
}

function CreateAccountLink() {
  const { setAuthPopup } = useAuthPopup();
  return (
    <Link
      href="/signup"
      className={buttonVariants({ color: 'primary', width: 'full' })}
      onClick={() => {
        setAuthPopup(false);
      }}>
      Create Account
    </Link>
  );
}

function ProfileSection() {
  const { session } = useSession();

  if (!session) {
    return (
      <div className="flex flex-col gap-2">
        <Text as="span" size="small" className="line-clamp-1 font-bold">
          Not Signed In
        </Text>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Text as="span" size="small" className="line-clamp-1">
        Signed in as
      </Text>
      <Text as="span" size="small" className="line-clamp-1 font-bold">
        {session.user.name}
      </Text>
    </div>
  );
}
