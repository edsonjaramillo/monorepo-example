export type NavigationLink = {
  label: string;
  href: string;
  prefetch?: boolean;
};

export const navigationLinks: NavigationLink[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
  {
    label: 'Upload',
    href: '/admin/upload',
    prefetch: false,
  },
];
