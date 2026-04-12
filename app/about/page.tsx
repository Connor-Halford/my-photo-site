'use client';

import { useState } from 'react';
import TopNav from '../components/TopNav';
import Footer from "../components/Footer";

export default function AboutPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch('https://formspree.io/f/mgopgwba', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <main className="flex-1">
        {/* Header */}
        <div className="px-8 pt-6 pb-4">
          <TopNav title="Person" />
        </div>

        <section className="max-w-7xl mx-auto pb-12 px-8 mt-8">

          {/* Main content: photo left, text + contact right */}
          <div className="flex flex-col lg:flex-row gap-16">

            {/* Portrait photo */}
            <div className="lg:w-135 flex-shrink-0">
              <img
                src="/about/IMG_3216.jpg"
                alt="Connor Halford"
                className="w-full object-cover rounded-sm"
              />
            </div>

            {/* Right column: bio + contact */}
            <div className="flex-1 max-w-xl pt-2 flex flex-col gap-16">

              {/* Bio */}
              <div>
                <p className="text-lg font-light leading-relaxed text-gray-700 mb-6">
                  I'm Connor Halford, a photographer based in Chicago. I shoot landscapes,
                  wildlife, and the quiet moments that tend to go unnoticed — mostly in places
                  that required some effort to get to.
                </p>
                <p className="text-lg font-light leading-relaxed text-gray-700 mb-6">
                  This site is a personal archive of the images I'm most proud of. Every photo
                  here meant something to me when I took it.
                </p>
                <p className="text-lg font-light leading-relaxed text-gray-700">
                  I shoot with a Canon R6 Mark II and edit in Capture One.
                </p>
              </div>

              {/* Contact form */}
              <div className="border-t border-gray-100 pt-12">
                <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-8">Contact</p>

                {status === 'success' ? (
                  <p className="text-sm font-light text-gray-500">Thanks — I'll be in touch.</p>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs tracking-[0.15em] uppercase text-gray-400">Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="bg-transparent border-b border-gray-200 py-2 text-sm font-light text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs tracking-[0.15em] uppercase text-gray-400">Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="bg-transparent border-b border-gray-200 py-2 text-sm font-light text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs tracking-[0.15em] uppercase text-gray-400">Message</label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        className="bg-transparent border-b border-gray-200 py-2 text-sm font-light text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors resize-none"
                        placeholder="Say hello"
                      />
                    </div>
                    {status === 'error' && (
                      <p className="text-xs text-red-400">Something went wrong — please try again.</p>
                    )}
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="self-start text-xs tracking-[0.2em] uppercase text-gray-900 border-b border-gray-900 pb-0.5 hover:text-gray-400 hover:border-gray-400 transition-colors disabled:opacity-40 mt-2"
                    >
                      {status === 'submitting' ? 'Sending...' : 'Send'}
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>

        </section>
      </main>
      <Footer />
    </div>
  );
}