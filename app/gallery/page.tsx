'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { RowsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/rows.css';
import { photos } from '../data/photos';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function GalleryPage() {
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showTagsDropdown, setShowTagsDropdown] = useState(false);

  const allTags = useMemo(() => 
    Array.from(new Set(photos.flatMap(photo => photo.tags || []))), 
    []
  );

  const filteredPhotos = useMemo(() => {
    if (selectedTags.length === 0) return photos;
    return photos.filter(photo => 
      selectedTags.every(tag => photo.tags?.includes(tag))
    );
  }, [selectedTags]);

  const handlePhotoClick = useCallback(({ index }: { index: number }) => {
    setPhotoIndex(index);
    setOpen(true);
  }, []);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  }, []);

  const currentPhoto = filteredPhotos[photoIndex];
  const totalPhotos = filteredPhotos.length;

  const prevPhoto = () => setPhotoIndex(prev => Math.max(0, prev - 1));
  const nextPhoto = () => setPhotoIndex(prev => Math.min(totalPhotos - 1, prev + 1));
  
  const closeLightbox = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setOpen(false);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, photoIndex, totalPhotos]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-900">
      <Nav />
      <main className="flex-1">
        <section className="max-w-7xl mx-auto py-12 px-8">
          {/* Header: Title/Counter LEFT | Filter RIGHT */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8 mb-12">
            <div className="flex flex-col items-center lg:items-start gap-2">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900">Gallery</h1>
              <div className="text-sm text-gray-500 text-center lg:text-left">
                Showing {filteredPhotos.length} photos
                {selectedTags.length > 0 && ` (tags: ${selectedTags.join(', ')})`}
              </div>
            </div>

            {/* Tags Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowTagsDropdown(!showTagsDropdown)}
                className="flex items-center gap-2 px-6 py-3 text-lg font-medium bg-white border-2 border-gray-300 rounded-xl hover:border-gray-400 hover:shadow-lg transition-all focus:outline-none focus:ring-4 focus:ring-gray-200"
              >
                {selectedTags.length === 0 ? 'All Tags' : `${selectedTags.length} tag${selectedTags.length > 1 ? 's' : ''} selected`}
                <svg className={`w-5 h-5 transition-transform ${showTagsDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showTagsDropdown && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 max-h-80 overflow-auto">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-2">Filter by Tags</h3>
                    <p className="text-xs text-gray-500">Select multiple tags</p>
                  </div>
                  <div className="py-3 max-h-64 overflow-auto">
                    {allTags.map(tag => (
                      <label key={tag} className="flex items-center px-4 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="checkbox"
                          checked={selectedTags.includes(tag)}
                          onChange={() => toggleTag(tag)}
                          className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                        />
                        <span className="ml-3 text-sm font-medium text-gray-900">{tag}</span>
                      </label>
                    ))}
                  </div>
                  <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedTags([]);
                          setShowTagsDropdown(false);
                        }}
                        className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50"
                      >
                        Clear
                      </button>
                      <button
                        onClick={() => setShowTagsDropdown(false)}
                        className="flex-1 px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-200 rounded-xl hover:bg-gray-200"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Selected Tags Chips */}
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto mb-8">
              {selectedTags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-900 text-white text-xs rounded-full">
                  {tag}
                  <button
                    onClick={() => toggleTag(tag)}
                    className="ml-1 text-white/80 hover:text-white font-bold text-xs"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Photo Gallery */}
          <RowsPhotoAlbum
            photos={filteredPhotos}
            targetRowHeight={300}
            rowConstraints={{ 
              minPhotos: 1, 
              maxPhotos: 4,
              singleRowMaxHeight: 400 
            }}
            onClick={handlePhotoClick}
          />

          {/* CUSTOM LIGHTBOX - FIXED ARROWS + X CLOSE + KEYBOARD */}
          {open && currentPhoto && (
            <div 
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 lg:p-8"
              onClick={closeLightbox}
            >
              <div className="w-full h-full max-w-[90vw] max-h-[90vh] flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-4 relative">
                {/* X Close Button - TOP RIGHT */}
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-6 right-6 lg:top-8 lg:right-8 p-3 lg:p-4 bg-black/60 hover:bg-black/80 rounded-full text-white text-xl lg:text-2xl transition-all z-20 shadow-2xl"
                  aria-label="Close lightbox"
                >
                  ×
                </button>

                {/* Navigation Arrows - FARTHER from content */}
                <button
                  onClick={prevPhoto}
                  className="absolute -left-16 lg:-left-24 p-4 lg:p-6 bg-black/70 hover:bg-black/90 rounded-full text-white text-3xl lg:text-4xl transition-all z-10 shadow-2xl w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center"
                >
                  ‹
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute -right-16 lg:-right-24 p-4 lg:p-6 bg-black/70 hover:bg-black/90 rounded-full text-white text-3xl lg:text-4xl transition-all z-10 shadow-2xl w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center"
                >
                  ›
                </button>

                {/* HUGE IMAGE - Primary Focus */}
                <div className="w-full lg:w-4/5 h-[70vh] lg:h-[85vh] flex items-center justify-center flex-shrink-0">
                  <img
                    src={currentPhoto.src}
                    alt={currentPhoto.caption || ''}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* NARROW Info Panel */}
                <div className="lg:w-1/5 w-full h-64 lg:h-[85vh] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 p-4 lg:p-6 flex flex-col gap-3">
                  {/* Caption - Compact */}
                  {currentPhoto.caption && (
                    <h2 className="text-lg lg:text-xl font-bold text-gray-900 line-clamp-2 flex-1">
                      {currentPhoto.caption}
                    </h2>
                  )}

                  <div className="space-y-2 flex-1 min-h-0">
                    {/* Location - Compact */}
                    {currentPhoto.location && (
                      <div 
                        className="p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl hover:shadow-md transition-all cursor-pointer border border-blue-200 flex items-center gap-2 flex-1"
                        onClick={() => {}}
                      >
                        <span className="text-xl">📍</span>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-gray-800 text-xs">Location</div>
                          <div className="text-base font-bold text-gray-900 truncate">{currentPhoto.location}</div>
                        </div>
                      </div>
                    )}

                    {/* Date - Compact */}
                    {currentPhoto.date && (
                      <div 
                        className="p-3 bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-xl hover:shadow-md transition-all cursor-pointer border border-emerald-200 flex items-center gap-2 flex-1"
                        onClick={() => {}}
                      >
                        <span className="text-xl">📅</span>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-gray-800 text-xs">Date</div>
                          <div className="text-base font-bold text-gray-900">{currentPhoto.date}</div>
                        </div>
                      </div>
                    )}

                    {/* Tags - Compact clickable */}
                    {currentPhoto.tags && currentPhoto.tags.length > 0 && (
                      <div className="flex-1 min-h-0">
                        <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto p-1 pt-2">
                          {currentPhoto.tags.map(tag => (
                            <button
                              key={tag}
                              onClick={() => toggleTag(tag)}
                              className="px-3 py-1.5 bg-white shadow-sm hover:shadow-md border border-gray-200 rounded-lg text-xs font-bold text-gray-900 transition-all hover:-translate-y-0.5 whitespace-nowrap flex-shrink-0"
                              title={`Filter by ${tag}`}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
