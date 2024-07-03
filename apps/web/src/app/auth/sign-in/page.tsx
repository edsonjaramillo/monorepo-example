import Link from 'next/link';

import { HalfSplitFormShell } from 'ui';

import { SignInForm } from '../../../components/SignInForm';

export default function SignInPage() {
  return (
    <>
      <HalfSplitFormShell
        form={<SignInForm />}
        image={{ src: 'https://picsum.photos/id/237/200/300', alt: 'Signup image' }}
      />
      <Link href="/">Home page</Link>
    </>
  );
}
