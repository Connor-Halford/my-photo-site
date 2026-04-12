'use client';

import { useState, useRef, useEffect } from 'react';
import type { Photo } from '../data/photos';

function formatDate(dateStr: string) {
  const [year, month] = dateStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

interface LightboxProps {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onIndexChange: (index: number) => void;
  onTagClick?: (tag: string) => void;
}

export default function Lightbox({
  photos,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  onTagClick,
}: LightboxProps) {
  const [infoVisible, setInfoVisible] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragOffsetRef = useRef(0);
  const touchStartX = useRef(0);
  const [isSnapping, setIsSnapping] = useState(false);

  const currentPhoto = photos[currentIndex];
  const totalPhotos = photos.length;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onPrev, onNext, onClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    dragOffsetRef.current = 0;
    setIsSnapping(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const delta = e.touches[0].clientX - touchStartX.current;
    dragOffsetRef.current = delta;
    setDragOffset(delta);
  };

  const handleTouchEnd = () => {
    const offset = dragOffsetRef.current;
    const threshold = window.innerWidth * 0.3;
    setIsSnapping(true);
    if (offset < -threshold && currentIndex < totalPhotos - 1) {
      setDragOffset(-window.innerWidth);
      setTimeout(() => {
        onNext();
        setDragOffset(0);
        dragOffsetRef.current = 0;
        setIsSnapping(false);
      }, 250);
    } else if (offset > threshold && currentIndex > 0) {
      setDragOffset(window.innerWidth);
      setTimeout(() => {
        onPrev();
        setDragOffset(0);
        dragOffsetRef.current = 0;
        setIsSnapping(false);
      }, 250);
    } else {
      setDragOffset(0);
      dragOffsetRef.current = 0;
      setTimeout(() => setIsSnapping(false), 250);
    }
  };

  if (!currentPhoto) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center lightbox-fade"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-30 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white text-xl transition-all"
        aria-label="Close"
      >
        ×
      </button>

      {/* Left arrow — desktop only */}
      <button
        onClick={onPrev}
        disabled={currentIndex === 0}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 hidden md:flex items-center justify-center bg-white/10 hover:bg-white/20 disabled:opacity-20 rounded-full text-white text-2xl transition-all"
      >
        ‹
      </button>

      {/* Right arrow — desktop only */}
      <button
        onClick={onNext}
        disabled={currentIndex === totalPhotos - 1}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 hidden md:flex items-center justify-center bg-white/10 hover:bg-white/20 disabled:opacity-20 rounded-full text-white text-2xl transition-all"
      >
        ›
      </button>

      {/* Mobile carousel — touch-driven, three panels side by side */}
      <div
        className="md:hidden absolute inset-0 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          style={{
            display: 'flex',
            width: '300vw',
            height: '100%',
            transform: `translateX(calc(-100vw + ${dragOffset}px))`,
            transition: isSnapping ? 'transform 250ms ease-out' : 'none',
            willChange: 'transform',
          }}
        >
          <div style={{ width: '100vw', flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 0' }}>
            {currentIndex > 0 && (
              <img src={photos[currentIndex - 1].src} alt="" className="w-full max-h-full object-contain" />
            )}
          </div>
          <div style={{ width: '100vw', flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 0' }}>
            <img src={currentPhoto.src} alt={currentPhoto.caption || ''} className="w-full max-h-full object-contain" />
          </div>
          <div style={{ width: '100vw', flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 0' }}>
            {currentIndex < totalPhotos - 1 && (
              <img src={photos[currentIndex + 1].src} alt="" className="w-full max-h-full object-contain" />
            )}
          </div>
        </div>
      </div>

      {/* Desktop image wrapper */}
      <div className="hidden md:flex absolute inset-0 items-center justify-center p-4">
        <div className="relative h-full flex items-center justify-center">
          <img
            src={currentPhoto.src}
            alt={currentPhoto.caption || ''}
            className="max-h-full max-w-full object-contain"
          />

          {/* Info panel — anchored to bottom-right of image */}
          {infoVisible && (
            <div
              className="absolute bottom-0 right-0 w-[min(280px,80vw)] rounded-2xl p-5 flex flex-col gap-4"
              style={{
                backdropFilter: 'blur(16px) saturate(180%)',
                WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                background: 'rgba(0,0,0,0.6)',
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08), 0 4px 24px rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {currentPhoto.caption && (
                <h2 className="text-sm font-semibold text-white leading-snug">
                  {currentPhoto.caption}
                </h2>
              )}
              {currentPhoto.location && (
                <div className="flex items-start gap-3">
                  <span className="text-base mt-0.5">📍</span>
                  <div>
                    <div className="text-[10px] text-white/50 font-medium uppercase tracking-wide mb-0.5">Location</div>
                    {currentPhoto.lat && currentPhoto.lng ? (
                      <a
                        href={`/map?lat=${currentPhoto.lat}&lng=${currentPhoto.lng}&zoom=10`}
                        className="text-xs font-medium text-white/90 leading-snug hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
                      >
                        {currentPhoto.location}
                      </a>
                    ) : (
                      <div className="text-xs font-medium text-white/90 leading-snug">{currentPhoto.location}</div>
                    )}
                  </div>
                </div>
              )}
              {currentPhoto.date && (
                <div className="flex items-start gap-3">
                  <span className="text-base mt-0.5">📅</span>
                  <div>
                    <div className="text-[10px] text-white/50 font-medium uppercase tracking-wide mb-0.5">Date</div>
                    <div className="text-xs font-medium text-white/90">{formatDate(currentPhoto.date)}</div>
                  </div>
                </div>
              )}
              {currentPhoto.tags && currentPhoto.tags.length > 0 && (
                <div>
                  <div className="text-[10px] text-white/50 font-medium uppercase tracking-wide mb-2">Tags</div>
                  <div className="flex flex-wrap gap-1.5">
                    {currentPhoto.tags.map(tag =>
                      onTagClick ? (
                        <button
                          key={tag}
                          onClick={() => { onTagClick(tag); onClose(); }}
                          className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium text-white/80 hover:text-white capitalize transition-colors"
                        >
                          {tag}
                        </button>
                      ) : (
                        <span key={tag} className="px-2.5 py-1 bg-white/10 rounded-lg text-xs font-medium text-white/80 capitalize">
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}
              <div className="text-[10px] text-white/40 text-center pt-1">
                {currentIndex + 1} / {totalPhotos}
              </div>
            </div>
          )}

          {/* Info toggle */}
          <button
            onClick={() => setInfoVisible(v => !v)}
            aria-label={infoVisible ? 'Hide info' : 'Show info'}
            className="absolute bottom-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-white/70 hover:text-white transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
