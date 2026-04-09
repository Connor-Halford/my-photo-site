'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HomeChevron() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="/"
      aria-label="Return to home"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center justify-center flex-shrink-0 rounded-full transition-all duration-200"
      style={{
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
      }}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={hovered ? 2.5 : 1.5}
        style={{ transition: 'stroke-width 0.15s ease' }}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </Link>
  );
}
