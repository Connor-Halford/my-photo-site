import Footer from '../components/Footer';
import GalleryContent from '../components/GalleryContent';

export default function GalleryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <main className="flex-1">
        <GalleryContent />
      </main>
      <Footer />
    </div>
  );
}
