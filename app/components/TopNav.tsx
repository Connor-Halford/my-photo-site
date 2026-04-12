'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const PAGE_ORDER = ['/map', '/gallery', '/about'];

export function NavButton({
  onClick,
  href,
  ariaLabel,
  icon,
}: {
  onClick?: () => void;
  href?: string;
  ariaLabel: string;
  icon: 'up' | 'left' | 'right';
}) {
  const [hovered, setHovered] = useState(false);

  const paths = {
    up: 'M5 15l7-7 7 7',
    left: 'M15 19l-7-7 7-7',
    right: 'M9 5l7 7-7 7',
  };

  const sharedProps = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    'aria-label': ariaLabel,
    className:
      'flex items-center justify-center flex-shrink-0 rounded-full transition-all duration-200',
    style: {
      width: '2.5rem',
      height: '2.5rem',
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: hovered
        ? 'linear-gradient(135deg, rgba(255,255,255,0.28), rgba(255,255,255,0.18))'
        : 'linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.08))',
      boxShadow: hovered
        ? 'inset 0 1px 1px rgba(255,255,255,0.35), 0 2px 12px rgba(0,0,0,0.12)'
        : 'inset 0 1px 1px rgba(255,255,255,0.2), 0 2px 8px rgba(0,0,0,0.08)',
      border: '1px solid rgba(255,255,255,0.2)',
      color: hovered ? 'rgba(30,30,30,0.9)' : 'rgba(120,120,120,0.8)',
    } as React.CSSProperties,
  };

  const svgContent = (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={hovered ? 2.5 : 1.5}
      style={{ transition: 'stroke-width 0.15s ease' }}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={paths[icon]} />
    </svg>
  );

  if (href) {
    return (
      <Link href={href} {...sharedProps}>
        {svgContent}
      </Link>
    );
  }

  return (
    <button onClick={onClick} {...sharedProps}>
      {svgContent}
    </button>
  );
}

export default function TopNav({
  title,
  subtitle,
  end,
}: {
  title: string;
  subtitle?: React.ReactNode;
  end?: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const currentIndex = PAGE_ORDER.indexOf(pathname);

  const prevPath = currentIndex > 0 ? PAGE_ORDER[currentIndex - 1] : null;
  const nextPath =
    currentIndex < PAGE_ORDER.length - 1 ? PAGE_ORDER[currentIndex + 1] : null;

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        {prevPath ? (
          <NavButton
            onClick={() => router.push(prevPath)}
            ariaLabel="Previous page"
            icon="left"
          />
        ) : (
          <div style={{ width: '2.5rem', height: '2.5rem', flexShrink: 0 }} />
        )}
        <NavButton href="/" ariaLabel="Return to home" icon="up" />
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-light tracking-[0.3em] uppercase text-gray-900">
            {title}
          </h1>
          {subtitle}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {end}
        {nextPath && (
          <NavButton
            onClick={() => router.push(nextPath)}
            ariaLabel="Next page"
            icon="right"
          />
        )}
      </div>
    </div>
  );
}
