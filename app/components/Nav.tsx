export default function Nav() {
  return (
    <nav className="w-full border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
            <a href="/" className="text-xl font-bold tracking-tight">
            Connor Halford
            </a>
            <div className="flex space-x-10 text-base">
                <a href="/gallery" className="hover:text-gray-300 transition-colors">
                    Gallery
                </a>
                <a href="/map" className="hover:text-gray-300 transition-colors">
                    Map
                </a>
                <a href="/about" className="hover:text-gray-300 transition-colors">
                    About
                </a>
            </div>
        </div>
    </nav>
  );
}
