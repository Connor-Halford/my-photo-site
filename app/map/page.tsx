import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function MapPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <Nav />
      <main className="flex-1">
        <section className="max-w-6xl mx-auto py-16 px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900">Map</h1>
          <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto leading-relaxed">
            Interactive map coming soon - explore photos by location with zoom/pan.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
