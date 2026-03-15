'use client';

import { useState, useCallback } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import "yet-another-react-lightbox/styles.css";
import { RowsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/rows.css';
import { photos } from '../data/photos';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function GalleryPage() {
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-900">
      <Nav />
      <main className="flex-1 py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-16 text-center text-gray-900">Gallery</h1>
          
          <RowsPhotoAlbum
            photos={photos}
            targetRowHeight={280}
            onClick={({ index }) => {
              setPhotoIndex(index);
              setOpen(true);
            }}
          />

          <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={photos.map(photo => ({ src: photo.src }))}
            index={photoIndex}
            on={{ 
              view: ({ index }) => setPhotoIndex(index)
            }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
