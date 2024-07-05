import { HalfSplitFormShell, Responsive } from 'ui';

import { UploadImageForm } from '../../../components/forms/UploadImageForm';

export default function UploadPage() {
  return (
    <Responsive>
      <HalfSplitFormShell
        form={<UploadImageForm />}
        image={{ src: 'https://picsum.photos/id/237/200/300', alt: 'Signup image', priority: true }}
      />
    </Responsive>
  );
}
