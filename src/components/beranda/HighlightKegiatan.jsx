import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

const kegiatanData = [
  {
    judul: 'Workshop Teknologi',
    deskripsi:
      'Pelatihan rutin pemrograman, desain UI/UX, dan teknologi terkini untuk meningkatkan kompetensi mahasiswa.',
    ikon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    judul: 'Kompetisi & Lomba',
    deskripsi:
      'Memfasilitasi dan mendukung partisipasi mahasiswa dalam berbagai kompetisi IT tingkat nasional.',
    ikon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    judul: 'Pengabdian Masyarakat',
    deskripsi:
      'Program literasi digital dan pemanfaatan teknologi untuk masyarakat sekitar kampus.',
    ikon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    judul: 'Seminar & Talkshow',
    deskripsi:
      'Menghadirkan praktisi dan akademisi untuk berbagi wawasan seputar dunia IT dan karir.',
    ikon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 7l-9-5 9 5 9-5-9 5zm0-7v7" />
      </svg>
    ),
  },
  {
    judul: 'Kegiatan Sosial',
    deskripsi:
      'Bakti sosial, donor darah, dan kegiatan kemanusiaan sebagai wujud kepedulian mahasiswa TI.',
    ikon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    judul: 'IT Festival',
    deskripsi:
      'Event tahunan terbesar HIMA TI yang menampilkan pameran teknologi, hackathon, dan kompetisi.',
    ikon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
];

export default function HighlightKegiatan() {
  const headingRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const headingObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(headingRef.current, {
              opacity: [0, 1],
              translateY: [40, 0],
              duration: 1000,
              ease: 'outExpo',
            });
            headingObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (headingRef.current) {
      headingRef.current.style.opacity = '0';
      headingObs.observe(headingRef.current);
    }

    const cardObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.idx);
            animate(entry.target, {
              opacity: [0, 1],
              translateY: [40, 0],
              scale: [0.95, 1],
              duration: 700,
              ease: 'outExpo',
              delay: 200 + idx * 120,
            });
            cardObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((el) => {
      if (el) {
        el.style.opacity = '0';
        cardObs.observe(el);
      }
    });

    return () => {
      headingObs.disconnect();
      cardObs.disconnect();
    };
  }, []);

  const handleHover = (el, enter) => {
    if (!el) return;
    animate(el, {
      translateY: enter ? -8 : 0,
      scale: enter ? 1.02 : 1,
      duration: 400,
      ease: 'outExpo',
    });
  };

  return (
    <section className="py-20 lg:py-28">
      {/* Section Header */}
      <div ref={headingRef} className="text-center mb-16 lg:mb-24">
        <p className="text-sm font-semibold tracking-[0.3em] uppercase text-green-600 mb-4">
          Program Unggulan
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-green-900">
          Kegiatan & Program
        </h2>
        <div className="mt-4 mx-auto w-20 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full" />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {kegiatanData.map((item, idx) => (
          <div
            key={idx}
            ref={(el) => (cardRefs.current[idx] = el)}
            data-idx={idx}
            onMouseEnter={(e) => handleHover(e.currentTarget, true)}
            onMouseLeave={(e) => handleHover(e.currentTarget, false)}
            className="relative overflow-hidden bg-white/30 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] rounded-2xl p-6 sm:p-8 cursor-default"
          >
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-600 to-yellow-400" />

            {/* Decorative blur */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-green-200/15 rounded-full blur-2xl pointer-events-none" />

            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center shadow-lg mb-5">
              {item.ikon}
            </div>

            {/* Text */}
            <h3 className="text-xl font-bold text-green-900 mb-2">{item.judul}</h3>
            <p className="text-green-800/70 leading-relaxed">{item.deskripsi}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
