import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function MapPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Nav />
      <main className="flex-1">
        <section className="max-w-6xl mx-auto py-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Map</h1>
          <p className="text-gray-300 text-center">
            Interactive map coming soon - explore photos by location with zoom/pan.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

