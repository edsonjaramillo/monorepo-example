import { HalfSplitFormShell } from 'ui';

import { SignupForm } from '../../../components/forms/SignUpForm';

export default function SignUpPage() {
  return (
    <>
      <HalfSplitFormShell
        form={<SignupForm />}
        image={{ src: 'https://picsum.photos/id/237/200/300', alt: 'Signup image' }}
      />
    </>
  );
}
