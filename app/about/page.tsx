import HomeChevron from '../components/HomeChevron';
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <main className="flex-1">
        <section className="max-w-7xl mx-auto pt-6 pb-12 px-8">

          {/* Header */}
          <div className="flex items-center gap-4 mb-12">
            <HomeChevron />
            <h1 className="text-2xl font-light tracking-[0.3em] uppercase text-gray-900">Person</h1>
          </div>

          <div className="max-w-2xl">
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Professional and photographer based in Chicago.
            </p>
            <p className="text-gray-500 text-sm">
              Contact form coming soon.
            </p>
          </div>

        </section>
      </main>
      <Footer />
    </div>
  );
}
