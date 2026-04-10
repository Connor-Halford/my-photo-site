'use client';

import { useState } from 'react';
import Link from 'next/link';
import { photos } from './data/photos';

const landscapePhotos = photos.filter(p => p.width > p.height);

export default function HomePage() {
  const [hero] = useState(
    () => landscapePhotos[Math.floor(Math.random() * landscapePhotos.length)]
  );

  return (
    <main className="min-h-screen relative">
      <div className="absolute inset-0">
        <img
          src={hero.src}
          alt={hero.caption || 'Connor Halford photography'}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-6">
        <h1 className="text-3xl md:text-4xl font-light tracking-[0.4em] uppercase mb-4 text-center">
          Connor Halford
        </h1>
        <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-white/60 mb-12 text-center">
          Photography from the places and moments that matter most
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <Link
            href="/map"
            className="px-12 py-5 border border-white/80 hover:border-white text-xs tracking-[0.2em] uppercase text-center hover:bg-white hover:text-black transition-colors"
          >
            Places
          </Link>
          <Link
            href="/gallery"
            className="px-12 py-5 border border-white/80 hover:border-white text-xs tracking-[0.2em] uppercase text-center hover:bg-white hover:text-black transition-colors"
          >
            Moments
          </Link>
          <Link
            href="/about"
            className="px-12 py-5 border border-white/80 hover:border-white text-xs tracking-[0.2em] uppercase text-center hover:bg-white hover:text-black transition-colors"
          >
            Person
          </Link>
        </div>
      </div>

      <Link
        href="/gallery"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60 hover:text-white/90 transition-colors"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Enter</span>
        <svg
          className="w-5 h-5 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </Link>
    </main>
  );
}
