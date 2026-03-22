'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();

  const links = [
  { href: '/gallery', label: 'Moments' },
  { href: '/map', label: 'Places' },
  { href: '/about', label: 'Person' },
];

  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
        <Link href="/" className="text-sm font-light tracking-[0.25em] uppercase text-gray-900">
          Connor Halford
        </Link>
        <div className="flex space-x-10">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-xs tracking-[0.2em] uppercase transition-colors ${
                pathname === href
                  ? 'text-gray-900 font-medium border-b border-gray-900 pb-0.5'
                  : 'text-gray-400 hover:text-gray-900'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
