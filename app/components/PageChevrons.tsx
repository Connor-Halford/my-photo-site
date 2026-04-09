'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const PAGE_ORDER = ['/map', '/gallery', '/about'];

function ChevronButton({
  side,
  onClick,
}: {
  side: 'left' | 'right';
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const isLeft = side === 'left';

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={isLeft ? 'Previous page' : 'Next page'}
      className={`fixed top-1/2 -translate-y-1/2 z-30 flex items-center justify-center transition-all duration-200 ${
        isLeft
          ? 'left-0 pl-2 pr-4 rounded-r-full'
          : 'right-0 pr-2 pl-4 rounded-l-full'
      }`}
      style={{
        height: '4rem',
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        background: hovered
          ? 'linear-gradient(to right, rgba(255,255,255,0.25), rgba(255,255,255,0.18))'
          : 'linear-gradient(to right, rgba(255,255,255,0.12), rgba(255,255,255,0.08))',
        boxShadow: hovered
          ? 'inset 0 1px 1px rgba(255,255,255,0.35), 0 2px 12px rgba(0,0,0,0.12)'
          : 'inset 0 1px 1px rgba(255,255,255,0.2), 0 2px 8px rgba(0,0,0,0.08)',
        border: isLeft
          ? '1px solid rgba(255,255,255,0.2)'
          : '1px solid rgba(255,255,255,0.2)',
        borderLeft: isLeft ? 'none' : undefined,
        borderRight: isLeft ? undefined : 'none',
        color: hovered ? 'rgba(30,30,30,0.9)' : 'rgba(120,120,120,0.8)',
        transition: 'background 0.2s ease, box-shadow 0.2s ease, color 0.2s ease',
      }}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={hovered ? 2.5 : 1.5}
        style={{ transition: 'stroke-width 0.15s ease' }}
        viewBox="0 0 24 24"
      >
        {isLeft ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        )}
      </svg>
    </button>
  );
}

export default function PageChevrons() {
  const pathname = usePathname();
  const router = useRouter();
  const currentIndex = PAGE_ORDER.indexOf(pathname);

  if (currentIndex === -1) return null;

  const prevPath = currentIndex > 0 ? PAGE_ORDER[currentIndex - 1] : null;
  const nextPath = currentIndex < PAGE_ORDER.length - 1 ? PAGE_ORDER[currentIndex + 1] : null;

  return (
    <>
      {prevPath && <ChevronButton side="left" onClick={() => router.push(prevPath)} />}
      {nextPath && <ChevronButton side="right" onClick={() => router.push(nextPath)} />}
    </>
  );
}
