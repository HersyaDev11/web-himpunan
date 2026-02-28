import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { animate } from 'animejs';
import useParallax from './useParallax';

export default function Hero() {
  const parallax1 = useParallax(0.2);
  const parallax2 = useParallax(0.4);
  const parallax3 = useParallax(0.15);

  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const taglineRef = useRef(null);
  const accentRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const elements = [
      { ref: badgeRef, props: { opacity: [0, 1], translateY: [30, 0], duration: 800, ease: 'outExpo' } },
      { ref: headingRef, props: { opacity: [0, 1], translateY: [40, 0], duration: 1000, ease: 'outExpo', delay: 200 } },
      { ref: taglineRef, props: { opacity: [0, 1], translateY: [30, 0], duration: 900, ease: 'outExpo', delay: 500 } },
      { ref: accentRef, props: { opacity: [0, 1], scaleX: [0, 1], duration: 800, ease: 'outExpo', delay: 700 } },
      { ref: ctaRef, props: { opacity: [0, 1], translateY: [20, 0], duration: 800, ease: 'outExpo', delay: 900 } },
      { ref: scrollRef, props: { opacity: [0, 1], duration: 600, ease: 'outExpo', delay: 1500 } },
    ];

    elements.forEach(({ ref, props }) => {
      if (ref.current) {
        ref.current.style.opacity = '0';
        animate(ref.current, props);
      }
    });
  }, []);

  return (
    <section
      id="beranda"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20 sm:pt-28"
    >
      {/* Parallax decorative blobs */}
      <div
        ref={parallax1}
        className="absolute top-20 -right-20 w-48 sm:w-72 h-48 sm:h-72 bg-green-300/20 rounded-full blur-3xl will-change-transform pointer-events-none"
      />
      <div
        ref={parallax2}
        className="absolute bottom-20 -left-16 w-40 sm:w-60 h-40 sm:h-60 bg-yellow-300/15 rounded-full blur-3xl will-change-transform pointer-events-none"
      />
      <div
        ref={parallax3}
        className="absolute top-1/3 right-1/4 w-28 sm:w-40 h-28 sm:h-40 bg-green-400/10 rounded-full blur-2xl will-change-transform pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <p
          ref={badgeRef}
          className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-green-600 mb-6"
        >
          Himpunan Mahasiswa Teknik Informatika
        </p>

        <h1
          ref={headingRef}
          className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-green-900 mb-6"
        >
          Kabinet Perkasa
        </h1>

        <p
          ref={taglineRef}
          className="text-lg sm:text-xl lg:text-2xl text-green-800/70 leading-relaxed mb-8"
        >
          Bersama Membangun, Berdampak Nyata
        </p>

        <div
          ref={accentRef}
          className="mx-auto w-20 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mb-10"
        />

        <Link
          ref={ctaRef}
          to="/tentang"
          className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-green-900 font-bold px-8 py-4 rounded-2xl text-base sm:text-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
        >
          Jelajahi Lebih Lanjut
        </Link>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-green-600/50"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
