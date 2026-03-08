import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Nav />
      <main className="flex-1">
        <section className="max-w-3xl mx-auto py-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">About</h1>
          <p className="text-gray-300 mb-4 text-center">
            Professional and photographer based in Chicago.
          </p>
          <p className="text-sm text-gray-500 text-center">
            Contact form coming soon.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
