import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

const bphData = [
  { nama: 'Muhammad Fauzan', jabatan: 'Ketua Umum', inisial: 'MF' },
  { nama: 'Siti Nurhaliza', jabatan: 'Wakil Ketua', inisial: 'SN' },
  { nama: 'Ahmad Rizki', jabatan: 'Sekretaris Umum', inisial: 'AR' },
  { nama: 'Dewi Anggraeni', jabatan: 'Bendahara Umum', inisial: 'DA' },
];

export default function BPHSection() {
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

  return (
    <section className="py-20 lg:py-28">
      {/* Section Header */}
      <div ref={headingRef} className="text-center mb-16 lg:mb-24">
        <p className="text-sm font-semibold tracking-[0.3em] uppercase text-green-600 mb-4">
          Pengurus Inti
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-green-900">
          Badan Pengurus Harian
        </h2>
        <div className="mt-4 mx-auto w-20 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full" />
      </div>

      {/* BPH Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bphData.map((member, idx) => (
          <div
            key={idx}
            ref={(el) => (cardRefs.current[idx] = el)}
            data-idx={idx}
            className="relative overflow-hidden bg-white/30 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] rounded-2xl p-6 sm:p-8 text-center cursor-default"
          >
            {/* Top accent */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-600 to-yellow-400" />
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-green-200/15 rounded-full blur-2xl pointer-events-none" />

            {/* Avatar circle */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center shadow-xl mb-4">
              <span className="text-2xl sm:text-3xl font-bold text-white">{member.inisial}</span>
            </div>

            <h3 className="text-lg font-bold text-green-900">{member.nama}</h3>
            <p className="text-sm text-green-600 font-medium mt-1">{member.jabatan}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
