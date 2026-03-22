'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { RowsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/rows.css';
import { photos } from '../data/photos';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

function formatDate(dateStr: string) {
  const [year, month] = dateStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function GalleryPage() {
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showTagsDropdown, setShowTagsDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [infoVisible, setInfoVisible] = useState(true);

  // Date filter state
  const [dateMode, setDateMode] = useState<'year' | 'range'>('year');
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [rangeStart, setRangeStart] = useState<string>(''); // 'YYYY-MM'
  const [rangeEnd, setRangeEnd] = useState<string>('');     // 'YYYY-MM'

  // Derive available years from photos
  const allYears = useMemo(() =>
    Array.from(new Set(
      photos
        .filter(p => p.date)
        .map(p => parseInt(p.date!.split('-')[0]))
    )).sort((a, b) => b - a),
    []
  );

  const allTags = useMemo(() =>
    Array.from(new Set(photos.flatMap(photo => photo.tags || []))),
    []
  );

  const toggleYear = (year: number) => {
    setSelectedYears(prev =>
      prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
    );
  };

  const clearDateFilter = () => {
    setSelectedYears([]);
    setRangeStart('');
    setRangeEnd('');
  };

  const hasDateFilter =
    (dateMode === 'year' && selectedYears.length > 0) ||
    (dateMode === 'range' && (rangeStart !== '' || rangeEnd !== ''));

  const filteredPhotos = useMemo(() => {
    let result = photos;

    // Tag filter
    if (selectedTags.length > 0) {
      result = result.filter(photo =>
        selectedTags.every(tag => photo.tags?.includes(tag))
      );
    }

    // Date filter
    if (dateMode === 'year' && selectedYears.length > 0) {
      result = result.filter(photo => {
        if (!photo.date) return false;
        const year = parseInt(photo.date.split('-')[0]);
        return selectedYears.includes(year);
      });
    }

    if (dateMode === 'range') {
      if (rangeStart) {
        result = result.filter(photo => !photo.date || photo.date >= rangeStart);
      }
      if (rangeEnd) {
        result = result.filter(photo => !photo.date || photo.date <= rangeEnd);
      }
    }

    return result;
  }, [selectedTags, selectedYears, dateMode, rangeStart, rangeEnd]);

  const handlePhotoClick = useCallback(({ index }: { index: number }) => {
    setPhotoIndex(index);
    setInfoVisible(true);
    setOpen(true);
  }, []);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  }, []);

  const currentPhoto = filteredPhotos[photoIndex];
  const totalPhotos = filteredPhotos.length;

  const prevPhoto = () => setPhotoIndex(prev => Math.max(0, prev - 1));
  const nextPhoto = () => setPhotoIndex(prev => Math.min(totalPhotos - 1, prev + 1));

  const closeLightbox = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setOpen(false);
  };

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

  // Build a label for the date filter button
  const dateBtnLabel = () => {
    if (!hasDateFilter) return 'All Dates';
    if (dateMode === 'year') return selectedYears.sort().join(', ');
    const start = rangeStart ? formatDate(rangeStart + (rangeStart.length === 7 ? '' : '-01')) : '...';
    const end = rangeEnd ? formatDate(rangeEnd + (rangeEnd.length === 7 ? '' : '-01')) : '...';
    return `${start} – ${end}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <Nav />
      <main className="flex-1">
        <section className="max-w-7xl mx-auto py-12 px-8">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8 mb-12">
            <div className="flex flex-col items-center lg:items-start gap-2">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900">Gallery</h1>
              <div className="text-sm text-gray-500 text-center lg:text-left">
                Showing {filteredPhotos.length} photos
                {selectedTags.length > 0 && ` · ${selectedTags.join(', ')}`}
              </div>
            </div>

            {/* Filters row */}
            <div className="flex items-center gap-3">

              {/* Date Filter */}
              <div className="relative">
                <button
                  onClick={() => { setShowDateDropdown(!showDateDropdown); setShowTagsDropdown(false); }}
                  className={`flex items-center gap-2 px-6 py-3 text-base font-medium bg-white border rounded-xl hover:border-gray-400 hover:shadow-sm transition-all focus:outline-none ${hasDateFilter ? 'border-gray-900 text-gray-900' : 'border-gray-300'}`}
                >
                  {dateBtnLabel()}
                  <svg className={`w-4 h-4 transition-transform ${showDateDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showDateDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl z-50">

                    {/* Mode toggle */}
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex rounded-lg bg-gray-100 p-1 gap-1">
                        <button
                          onClick={() => { setDateMode('year'); clearDateFilter(); }}
                          className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${dateMode === 'year' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                          By Year
                        </button>
                        <button
                          onClick={() => { setDateMode('range'); clearDateFilter(); }}
                          className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${dateMode === 'range' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                          Date Range
                        </button>
                      </div>
                    </div>

                    {/* Year picker */}
                    {dateMode === 'year' && (
                      <div className="py-3">
                        {allYears.map(year => (
                          <label key={year} className="flex items-center px-4 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors">
                            <input
                              type="checkbox"
                              checked={selectedYears.includes(year)}
                              onChange={() => toggleYear(year)}
                              className="w-4 h-4 text-gray-900 border-gray-300 rounded"
                            />
                            <span className="ml-3 text-sm text-gray-900">{year}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {/* Range picker */}
                    {dateMode === 'range' && (
                      <div className="p-4 flex flex-col gap-4">
                        <div>
                          <label className="text-xs text-gray-500 font-medium uppercase tracking-wide block mb-1.5">From</label>
                          <div className="flex gap-2">
                            <select
                              value={rangeStart ? rangeStart.split('-')[1] : ''}
                              onChange={e => {
                                const yr = rangeStart ? rangeStart.split('-')[0] : new Date().getFullYear().toString();
                                setRangeStart(e.target.value ? `${yr}-${e.target.value}` : '');
                              }}
                              className="flex-1 text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-gray-400"
                            >
                              <option value="">Month</option>
                              {MONTHS.map((m, i) => (
                                <option key={m} value={String(i + 1).padStart(2, '0')}>{m}</option>
                              ))}
                            </select>
                            <select
                              value={rangeStart ? rangeStart.split('-')[0] : ''}
                              onChange={e => {
                                const mo = rangeStart ? rangeStart.split('-')[1] : '01';
                                setRangeStart(e.target.value ? `${e.target.value}-${mo}` : '');
                              }}
                              className="flex-1 text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-gray-400"
                            >
                              <option value="">Year</option>
                              {allYears.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 font-medium uppercase tracking-wide block mb-1.5">To</label>
                          <div className="flex gap-2">
                            <select
                              value={rangeEnd ? rangeEnd.split('-')[1] : ''}
                              onChange={e => {
                                const yr = rangeEnd ? rangeEnd.split('-')[0] : new Date().getFullYear().toString();
                                setRangeEnd(e.target.value ? `${yr}-${e.target.value}` : '');
                              }}
                              className="flex-1 text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-gray-400"
                            >
                              <option value="">Month</option>
                              {MONTHS.map((m, i) => (
                                <option key={m} value={String(i + 1).padStart(2, '0')}>{m}</option>
                              ))}
                            </select>
                            <select
                              value={rangeEnd ? rangeEnd.split('-')[0] : ''}
                              onChange={e => {
                                const mo = rangeEnd ? rangeEnd.split('-')[1] : '01';
                                setRangeEnd(e.target.value ? `${e.target.value}-${mo}` : '');
                              }}
                              className="flex-1 text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-gray-400"
                            >
                              <option value="">Year</option>
                              {allYears.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="p-3 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex gap-2">
                      <button
                        onClick={() => { clearDateFilter(); setShowDateDropdown(false); }}
                        className="flex-1 px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50"
                      >
                        Clear
                      </button>
                      <button
                        onClick={() => setShowDateDropdown(false)}
                        className="flex-1 px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-xl hover:bg-gray-200"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Tags Filter */}
              <div className="relative">
                <button
                  onClick={() => { setShowTagsDropdown(!showTagsDropdown); setShowDateDropdown(false); }}
                  className={`flex items-center gap-2 px-6 py-3 text-base font-medium bg-white border rounded-xl hover:border-gray-400 hover:shadow-sm transition-all focus:outline-none ${selectedTags.length > 0 ? 'border-gray-900 text-gray-900' : 'border-gray-300'}`}
                >
                  {selectedTags.length === 0 ? 'All Tags' : `${selectedTags.length} tag${selectedTags.length > 1 ? 's' : ''} selected`}
                  <svg className={`w-4 h-4 transition-transform ${showTagsDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showTagsDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-gray-200 rounded-2xl shadow-xl z-50">
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="font-semibold text-gray-900 text-sm">Filter by Tags</h3>
                    </div>
                    <div className="py-2 max-h-64 overflow-auto">
                      {allTags.map(tag => (
                        <label key={tag} className="flex items-center px-4 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors">
                          <input
                            type="checkbox"
                            checked={selectedTags.includes(tag)}
                            onChange={() => toggleTag(tag)}
                            className="w-4 h-4 text-gray-900 border-gray-300 rounded"
                          />
                          <span className="ml-3 text-sm text-gray-900 capitalize">{tag}</span>
                        </label>
                      ))}
                    </div>
                    <div className="p-3 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex gap-2">
                      <button onClick={() => { setSelectedTags([]); setShowTagsDropdown(false); }} className="flex-1 px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">
                        Clear
                      </button>
                      <button onClick={() => setShowTagsDropdown(false)} className="flex-1 px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-xl hover:bg-gray-200">
                        Done
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Active filter chips */}
          {(selectedTags.length > 0 || hasDateFilter) && (
            <div className="flex flex-wrap gap-2 mb-8">
              {selectedYears.map(year => (
                <span key={year} className="px-3 py-1 bg-gray-900 text-white text-xs rounded-full flex items-center gap-1.5">
                  {year}
                  <button onClick={() => toggleYear(year)} className="text-white/70 hover:text-white">×</button>
                </span>
              ))}
              {dateMode === 'range' && (rangeStart || rangeEnd) && (
                <span className="px-3 py-1 bg-gray-900 text-white text-xs rounded-full flex items-center gap-1.5">
                  {rangeStart || '...'} – {rangeEnd || '...'}
                  <button onClick={clearDateFilter} className="text-white/70 hover:text-white">×</button>
                </span>
              )}
              {selectedTags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-700 text-white text-xs rounded-full flex items-center gap-1.5 capitalize">
                  {tag}
                  <button onClick={() => toggleTag(tag)} className="text-white/70 hover:text-white">×</button>
                </span>
              ))}
            </div>
          )}

          {/* Photo Grid */}
          <RowsPhotoAlbum
            photos={filteredPhotos}
            targetRowHeight={300}
            rowConstraints={{ minPhotos: 1, maxPhotos: 4, singleRowMaxHeight: 400 }}
            onClick={handlePhotoClick}
          />

          {/* Empty state */}
          {filteredPhotos.length === 0 && (
            <div className="text-center py-24 text-gray-400">
              <p className="text-lg font-medium">No photos match these filters.</p>
              <button
                onClick={() => { clearDateFilter(); setSelectedTags([]); }}
                className="mt-4 text-sm underline hover:text-gray-600"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Lightbox */}
          {open && currentPhoto && (
            <div
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center lightbox-fade"
              onClick={closeLightbox}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-5 right-5 z-30 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white text-xl transition-all"
                aria-label="Close"
              >
                ×
              </button>

              <button
                onClick={() => setInfoVisible(v => !v)}
                className="absolute bottom-5 right-5 z-30 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-xs font-medium transition-all"
              >
                {infoVisible ? (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                    Hide Info
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Show Info
                  </>
                )}
              </button>

              <button
                onClick={prevPhoto}
                disabled={photoIndex === 0}
                className="absolute left-4 z-20 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 disabled:opacity-20 rounded-full text-white text-2xl transition-all"
              >
                ‹
              </button>

              <button
                onClick={nextPhoto}
                disabled={photoIndex === totalPhotos - 1}
                className="absolute right-4 z-20 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 disabled:opacity-20 rounded-full text-white text-2xl transition-all"
              >
                ›
              </button>

              <div className="flex items-center justify-center gap-6 w-full h-full px-20 py-10 max-w-[1400px] mx-auto">
                <div className="flex-1 h-full flex items-center justify-center">
                  <img
                    src={currentPhoto.src}
                    alt={currentPhoto.caption || ''}
                    className="max-h-[85vh] max-w-full object-contain"
                  />
                </div>

                {infoVisible && (
                  <div className="w-64 flex-shrink-0 bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-5 self-center">
                    {currentPhoto.caption && (
                      <h2 className="text-base font-bold text-gray-900 leading-snug">
                        {currentPhoto.caption}
                      </h2>
                    )}
                    {currentPhoto.location && (
                      <div className="flex items-start gap-3">
                        <span className="text-lg mt-0.5">📍</span>
                        <div>
                          <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-0.5">Location</div>
                          <div className="text-sm font-semibold text-gray-900 leading-snug">{currentPhoto.location}</div>
                        </div>
                      </div>
                    )}
                    {currentPhoto.date && (
                      <div className="flex items-start gap-3">
                        <span className="text-lg mt-0.5">📅</span>
                        <div>
                          <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-0.5">Date</div>
                          <div className="text-sm font-semibold text-gray-900">{formatDate(currentPhoto.date)}</div>
                        </div>
                      </div>
                    )}
                    {currentPhoto.tags && currentPhoto.tags.length > 0 && (
                      <div>
                        <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">Tags</div>
                        <div className="flex flex-wrap gap-1.5">
                          {currentPhoto.tags.map(tag => (
                            <button
                              key={tag}
                              onClick={() => { toggleTag(tag); setOpen(false); }}
                              className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium text-gray-700 capitalize transition-colors"
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="text-xs text-gray-400 text-center pt-1">
                      {photoIndex + 1} / {totalPhotos}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </section>
      </main>
      <Footer />
    </div>
  );
}