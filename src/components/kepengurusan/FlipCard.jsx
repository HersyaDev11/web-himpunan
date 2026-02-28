import { useState } from 'react';

export default function FlipCard({ divisi }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`flip-card h-64 sm:h-72 cursor-pointer ${isFlipped ? 'is-flipped' : ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="flip-card-inner">
        {/* === FRONT FACE === */}
        <div className="flip-card-front relative overflow-hidden bg-white/30 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center">
          {/* Top accent bar */}
          <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${divisi.warna}`} />

          {/* Decorative blur */}
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-green-200/15 rounded-full blur-2xl pointer-events-none" />

          {/* Icon */}
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${divisi.warna} flex items-center justify-center shadow-lg mb-5`}>
            {divisi.ikon}
          </div>

          {/* Division Name */}
          <h3 className="text-xl font-bold text-green-900">{divisi.nama}</h3>
          <p className="text-sm text-green-600 font-medium mt-1">{divisi.namaLengkap}</p>

          {/* Hover hint */}
          <p className="text-xs text-green-500/50 mt-4 tracking-wide">Hover untuk detail</p>
        </div>

        {/* === BACK FACE === */}
        <div className={`flip-card-back relative overflow-hidden bg-gradient-to-br ${divisi.warna} rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center text-white`}>
          {/* Decorative blur */}
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <h3 className="text-xl font-bold mb-4">{divisi.nama}</h3>
          <p className="text-white/90 leading-relaxed text-sm sm:text-base">{divisi.deskripsi}</p>
        </div>
      </div>
    </div>
  );
}
