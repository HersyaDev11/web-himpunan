import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { animate } from 'animejs';
import logo from '../assets/logo1.png';

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(footerRef.current, {
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 800,
              ease: 'outExpo',
            });
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      footerRef.current.style.opacity = '0';
      obs.observe(footerRef.current);
    }

    return () => obs.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Column 1: Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Logo HIMA TI" className="w-12 h-10" />
              <span className="text-xl font-bold">HIMA TI</span>
            </div>
            <p className="text-green-200/80 leading-relaxed text-sm">
              Himpunan Mahasiswa Teknik Informatika Kabinet Perkasa. Bersama membangun organisasi
              yang dinamis, efektif, dan berdampak positif bagi seluruh civitas akademika.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-[0.2em] uppercase text-yellow-400 mb-4">
              Navigasi
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Beranda', to: '/' },
                { label: 'Tentang', to: '/tentang' },
                { label: 'Kepengurusan', to: '/kepengurusan' },
                { label: 'Kontak', to: '/kontak' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-green-200/80 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-sm font-semibold tracking-[0.2em] uppercase text-yellow-400 mb-4">
              Kontak
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-green-300/70 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-green-200/80 text-sm">
                  Sekretariat HIMA TI, Fakultas Komputer, Universitas Kuningan
                </span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-green-300/70 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-green-200/80 text-sm">himati@fkom.uniku.ac.id</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-green-300/70 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-green-200/80 text-sm">+62 812-3456-7890</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-green-800">
          <p className="text-green-400/60 text-sm text-center">
            &copy; 2025 HIMA TI FKOM UNIKU. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
