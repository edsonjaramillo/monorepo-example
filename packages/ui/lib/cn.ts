import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return extendTailwindMerge({
    extend: {
      classGroups: {
        'text-color': [
          { primary: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] },
          {
            grayscale: [
              '100',
              '200',
              '300',
              '400',
              '500',
              '600',
              '700',
              '800',
              '900',
              'standard',
              'neutral',
              'inverse',
            ],
          },
          { error: ['accent'] },
          { info: ['accent'] },
          { success: ['accent'] },
          { warning: ['accent'] },
          { transparent: [] },
        ],
        'font-size': [
          { text: ['cta', 'subheader', '5xl', '4xl', '3xl', '2xl', 'xl', 'lg', 'base', 'small'] },
        ],
      },
    },
  })(clsx(inputs));
}
