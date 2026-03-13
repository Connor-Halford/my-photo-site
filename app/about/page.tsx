import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-900">
      <Nav />
      <main className="flex-1">
        <section className="max-w-3xl mx-auto py-16 px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-900">About</h1>
          <p className="text-lg text-gray-700 mb-4 text-center max-w-2xl mx-auto leading-relaxed">
            Professional and photographer based in Chicago.
          </p>
          <p className="text-gray-600 text-sm text-center max-w-2xl mx-auto">
            Contact form coming soon.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
