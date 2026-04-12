'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { NavButton } from './TopNav';
import Lightbox from './Lightbox';
import { RowsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/rows.css';
import { photos } from '../data/photos';

function formatDate(dateStr: string) {
  const [year, month] = dateStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function GalleryContent() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showTagsDropdown, setShowTagsDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [dateMode, setDateMode] = useState<'year' | 'range'>('year');
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [rangeStart, setRangeStart] = useState<string>('');
  const [rangeEnd, setRangeEnd] = useState<string>('');

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

    if (selectedTags.length > 0) {
      result = result.filter(photo =>
        selectedTags.every(tag => photo.tags?.includes(tag))
      );
    }

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
    setOpen(true);
  }, []);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  }, []);



  const dateBtnLabel = () => {
    if (!hasDateFilter) return 'All Dates';
    if (dateMode === 'year') return selectedYears.sort().join(', ');
    const start = rangeStart ? formatDate(rangeStart + (rangeStart.length === 7 ? '' : '-01')) : '...';
    const end = rangeEnd ? formatDate(rangeEnd + (rangeEnd.length === 7 ? '' : '-01')) : '...';
    return `${start} – ${end}`;
  };

  return (
    <section className="pt-6 pb-12">

      {/* Header */}
      <div className="px-8 pb-4">
      <div className="flex flex-col gap-4 mb-8">
        {/* Nav row — always single line */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <NavButton onClick={() => router.push('/map')} ariaLabel="Previous page" icon="left" />
            <NavButton href="/" ariaLabel="Return to home" icon="up" />
            <div className="flex flex-col gap-1 mt-1">
              <h1 className="text-2xl font-light tracking-[0.3em] uppercase text-gray-900">Moments</h1>
              <div className="text-sm text-gray-500">
                Showing {filteredPhotos.length} photos
                {selectedTags.length > 0 && ` · ${selectedTags.join(', ')}`}
              </div>
            </div>
          </div>
          <NavButton onClick={() => router.push('/about')} ariaLabel="Next page" icon="right" />
        </div>

        {/* Filters row — wraps when narrow */}
        <div className="flex flex-wrap items-center gap-3">

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
              <div className="absolute top-full right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white border border-gray-200 rounded-2xl shadow-xl z-50">

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
      </div>{/* end constrained header */}

      {/* Photo grid — full width, outer padding matches inter-photo spacing */}
      <div className="px-4">
      <RowsPhotoAlbum
        photos={filteredPhotos}
        targetRowHeight={500}
        rowConstraints={{ minPhotos: 1, maxPhotos: 3, singleRowMaxHeight: 650 }}
        spacing={16}
        onClick={handlePhotoClick}
      />
      </div>{/* end photo grid */}

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
      {open && (
        <Lightbox
          photos={filteredPhotos}
          currentIndex={photoIndex}
          onClose={() => setOpen(false)}
          onNext={() => setPhotoIndex(i => Math.min(filteredPhotos.length - 1, i + 1))}
          onPrev={() => setPhotoIndex(i => Math.max(0, i - 1))}
          onIndexChange={setPhotoIndex}
          onTagClick={tag => toggleTag(tag)}
        />
      )}

    </section>
  );
}
