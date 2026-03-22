
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
        <h1 className="text-3xl md:text-4xl font-light tracking-[0.4em] uppercase mb-4 text-center">
          Connor Halford
        </h1>
        <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-white/60 mb-12 text-center">
          Photography from the places and moments that matter most
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <a
            href="/gallery"
            className="px-10 py-4 border border-white/70 hover:border-white text-xs tracking-[0.2em] uppercase text-center hover:bg-white hover:text-black transition-colors"
          >
            Moments
          </a>
          <a
            href="/map"
            className="px-10 py-4 border border-white/70 hover:border-white text-xs tracking-[0.2em] uppercase text-center hover:bg-white hover:text-black transition-colors"
          >
            Places
          </a>
          <a
            href="/about"
            className="px-10 py-4 border border-white/70 hover:border-white text-xs tracking-[0.2em] uppercase text-center hover:bg-white hover:text-black transition-colors"
          >
            Person
          </a>
        </div>
      </div>
    </main>
  );
}

