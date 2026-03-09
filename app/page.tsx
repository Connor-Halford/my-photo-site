
export default function HomePage() {
  return (
    <main className="min-h-screen relative">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/landing.jpg" // put a real image here later
          alt="Connor Halford photography"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Overlay content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-center">
          Connor Halford
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-10 text-center max-w-xl">
          Photography from the places and moments that matter most.
        </p>

        <div className="flex flex-col md:flex-row gap-6">
          <a
            href="/gallery"
            className="px-8 py-3 border border-white/70 hover:border-white text-lg tracking-wide uppercase text-center hover:bg-white hover:text-black transition-colors"
          >
            Gallery
          </a>
          <a
            href="/map"
            className="px-8 py-3 border border-white/70 hover:border-white text-lg tracking-wide uppercase text-center hover:bg-white hover:text-black transition-colors"
          >
            Map
          </a>
          <a
            href="/about"
            className="px-8 py-3 border border-white/70 hover:border-white text-lg tracking-wide uppercase text-center hover:bg-white hover:text-black transition-colors"
          >
            About
          </a>
        </div>
      </div>
    </main>
  );
}

