import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Mail } from 'lucide-react';
import { WEDDING_DATA } from '@/services/Data';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const contactEmailHref = `mailto:${WEDDING_DATA.contactEmail}`

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="py-16 bg-[#15151a] text-white relative overflow-hidden"
    >
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-[#d8af72]/50" />

      <div ref={contentRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heart Icon */}
        <div className="mb-8">
          <div className="w-16 h-16 bg-[#d8af72]/10 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-[#d8af72]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        </div>

        {/* Names */}
        <h3 className="font-playfair text-3xl sm:text-4xl mb-4">
          {WEDDING_DATA.groom} <span className="text-[#d8af72]">&</span> {WEDDING_DATA.bride}
        </h3>

        {/* Wedding Date */}
        <p className="text-white/60 mb-8 tracking-wider">
          {WEDDING_DATA.date}
        </p>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-12 h-px bg-white/20" />
          <svg className="w-4 h-4 text-[#d8af72]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <div className="w-12 h-px bg-white/20" />
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#d8af72] transition-all duration-300 hover:scale-110 group"
          >
            <Instagram className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
          </a>
          <a
            href={contactEmailHref}
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#d8af72] transition-all duration-300 hover:scale-110 group"
          >
            <Mail className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-white/40 text-sm">
          Made with{' '}
          <svg className="w-3 h-3 inline text-[#d8af72]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>{' '}
          for ${WEDDING_DATA.groom} & ${WEDDING_DATA.bride}
        </p>
        <p className="text-white/30 text-xs mt-2">
          © 2025 All rights reserved
        </p>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #d8af72 1px, transparent 0)`,
            backgroundSize: '30px 30px',
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;
