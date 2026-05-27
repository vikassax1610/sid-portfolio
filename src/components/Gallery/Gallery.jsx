'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { galleryData, categorySections } from '@/data/galleryData';

/* ── Single image card ── */
function GalleryCard({ item }) {
  const heightMap = { tall:'320px', medium:'240px', short:'180px', wide:'200px' };
  return (
    <div className="break-inside-avoid mb-4">
      <div className="relative group rounded-[20px] overflow-hidden bg-white/50 border border-white/80
                      shadow-md shadow-violet-100/40
                      transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1
                      hover:shadow-xl hover:shadow-violet-200/40 hover:border-violet-200/50 cursor-pointer">
        <div className="relative overflow-hidden" style={{ height: heightMap[item.height] || '240px' }}>
          <Image src={item.image} alt={item.title} fill sizes="(max-width:768px) 50vw, 25vw"
                 className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                 loading="lazy" />

          {/* Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-5
                          opacity-0 group-hover:opacity-100 transition-opacity duration-400"
               style={{ background:'linear-gradient(to bottom, transparent 25%, rgba(30,27,75,.82))' }}>
            <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-400">
              <div className="w-9 h-9 bg-white/90 rounded-full flex items-center justify-center mb-3 text-violet-600
                              transition-transform duration-300 group-hover:scale-110">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                </svg>
              </div>
              <p className="text-white font-bold text-[.92rem]">{item.title}</p>
              <p className="text-white/70 text-[.68rem] uppercase tracking-widest font-medium mt-1">{item.category}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Per-category masonry section ── */
function GallerySection({ section }) {
  const items = galleryData.filter(item => item.category === section.label);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div id={section.id} className="reveal mb-28 last:mb-0" ref={ref}>
      {/* Section header */}
      <div className="mb-10">
        <div className="section-badge mb-4">
          <span>{section.emoji}</span>
          <span>{section.label}</span>
        </div>
        <h3 className="text-[clamp(1.7rem,2.8vw,2.4rem)] font-black text-slate-900 tracking-tight mb-2">
          {section.label}
        </h3>
        <p className="text-gray-400 text-[.97rem] max-w-[460px] leading-relaxed">{section.description}</p>
      </div>

      {/* Masonry */}
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-4">
        {items.map(item => <GalleryCard key={item.id} item={item} />)}
      </div>
    </div>
  );
}

/* ── Main Gallery section ── */
export default function Gallery() {
  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="portfolio" className="py-36 relative overflow-hidden">
      {/* Background blobs */}
      <div className="pointer-events-none absolute top-[10%] -right-48 w-[600px] h-[600px] rounded-full opacity-60"
           style={{ background:'radial-gradient(circle, rgba(124,58,237,.07) 0%, transparent 70%)', filter:'blur(80px)' }} />
      <div className="pointer-events-none absolute bottom-[20%] -left-36 w-[500px] h-[500px] rounded-full opacity-50"
           style={{ background:'radial-gradient(circle, rgba(236,72,153,.06) 0%, transparent 70%)', filter:'blur(80px)' }} />

      <div className="max-w-7xl mx-auto px-8">
        {/* Main heading */}
        <div className="reveal text-center mb-24 flex flex-col items-center gap-5" ref={headerRef}>
          <div className="section-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Portfolio Showcase
          </div>
          <h2 className="text-[clamp(2.2rem,4vw,3.6rem)] font-black text-slate-900 tracking-tight leading-[1.1]">
            Art That <span className="gradient-text">Defines Games</span>
          </h2>
          <p className="text-[1.05rem] text-gray-500 leading-relaxed max-w-[560px]">
            A curated collection of premium slot game art spanning symbols, characters,
            environments, and interface design — each piece crafted to captivate players.
          </p>
        </div>

        {/* Category sections */}
        {categorySections.map(section => (
          <GallerySection key={section.id} section={section} />
        ))}
      </div>
    </section>
  );
}
