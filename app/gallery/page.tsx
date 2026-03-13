'use client';

import { useState } from 'react';
import { photos } from '../data/photos';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const categories = ['all', 'landscape', 'urban', 'travel', 'portrait'] as const;

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'landscape' | 'urban' | 'travel' | 'portrait'>('all');

  const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-900">
      <Nav />
      <main className="flex-1">
        <section className="max-w-7xl mx-auto py-16 px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Gallery</h1>
            <div className="flex flex-wrap gap-4 justify-center max-w-2xl mx-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-gray-900 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 bg-white/50 hover:bg-white border border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPhotos.map((photo) => (
              <div key={photo.id} className="group cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 group-hover:scale-[1.02] transition-all duration-300">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-500"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="font-bold text-lg mb-1 text-gray-900">{photo.title}</h3>
                  <p className="text-gray-600 text-sm mb-1">{photo.location}</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
