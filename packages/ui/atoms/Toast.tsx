import { Toaster } from 'sonner';

import { cn } from '../lib/cn';

const errorToast = cn('!border-error-accent !bg-error-accent !text-error');
const infoToast = cn('!border-info-accent !bg-info-accent !text-info');
const successToast = cn('!border-success-accent !bg-success-accent !text-success');
const warningToast = cn('!border-warning-accent !bg-warning-accent !text-warning');

export const DEFAULT_DURATION = 2500;

export function Toast() {
  return (
    <Toaster
      duration={DEFAULT_DURATION}
      position="top-right"
      richColors
      visibleToasts={3}
      toastOptions={{
        classNames: {
          error: errorToast,
          info: infoToast,
          success: successToast,
          warning: warningToast,
        },
      }}
    />
  );
}
