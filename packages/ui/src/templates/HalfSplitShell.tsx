import Image, { type ImageProps } from 'next/image';

import { cn } from '../lib/cn';

type HalfSplitShellProps = React.ComponentProps<'div'> & {
  form: React.ReactNode;
  image: Omit<ImageProps, 'fill'>;
};

export function HalfSplitFormShell({
  image,
  form,
  children,
  className,
  ...props
}: HalfSplitShellProps) {
  const { className: imgClassNames, ...imgProps } = image;

  return (
    <div className="flex flex-col-reverse md:grid md:grid-cols-2" {...props}>
      <div
        className={cn(
          'mx-auto w-responsive md:ml-auto md:mr-0 md:w-half-responsive [&>div]:md:px-8',
          className,
        )}>
        {form}
      </div>
      <div className="relative h-[25rem] md:h-auto">
        <Image className={cn('h-full w-full object-cover', imgClassNames)} fill {...imgProps} />
      </div>
    </div>
  );
}
