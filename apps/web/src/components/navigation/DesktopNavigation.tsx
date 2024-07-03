import Link from 'next/link';

import { Responsive } from 'ui';

import { type NavigationLink, navigationLinks } from '../../utils/navigation.links';
import { Avatar } from './Avatar';

export function DesktopNavigation() {
  return (
    <nav>
      <Responsive className="flex h-14 items-center justify-between">
        <ul className="flex space-x-4">
          {navigationLinks.map((link) => (
            <DesktopLink key={link.href} link={link} />
          ))}
        </ul>
        <Avatar />
      </Responsive>
    </nav>
  );
}

type DesktopLinksProperties = { link: NavigationLink };
function DesktopLink({ link }: DesktopLinksProperties) {
  return (
    <li>
      <Link href={link.href} prefetch={link.prefetch}>
        {link.label}
      </Link>
    </li>
  );
}
