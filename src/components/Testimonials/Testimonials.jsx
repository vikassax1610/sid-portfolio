'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { testimonialsData } from '@/data/siteData';

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="#f59e0b">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive]       = useState(0);
  const [locked, setLocked]       = useState(false);
  const headerRef                 = useRef(null);
  const total                     = testimonialsData.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => {
      if (!locked) setActive(p => (p + 1) % total);
    }, 4500);
    return () => clearInterval(t);
  }, [locked, total]);

  const go = (dir) => {
    setLocked(true);
    setActive(p => (p + dir + total) % total);
    setTimeout(() => setLocked(false), 500);
  };

  const getStyle = (i) => {
    const offset = (i - active + total) % total;
    if (offset === 0) return { transform:'translateX(0) scale(1)',    opacity:1,   zIndex:10, filter:'none',     pointerEvents:'auto' };
    if (offset === total - 1) return { transform:'translateX(-360px) scale(.84)', opacity:.45, zIndex:5,  filter:'blur(1px)', pointerEvents:'auto' };
    if (offset === 1)         return { transform:'translateX(360px) scale(.84)',  opacity:.45, zIndex:5,  filter:'blur(1px)', pointerEvents:'auto' };
    return                           { transform:'scale(.7)',                     opacity:0,   zIndex:1,  filter:'blur(2px)', pointerEvents:'none' };
  };

  return (
    <section className="py-36 relative overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[700px] h-[700px] rounded-full opacity-30"
           style={{ background:'radial-gradient(circle, rgba(23, 105, 255,.06), transparent 70%)', filter:'blur(80px)' }} />

      <div className="max-w-[1050px] mx-auto px-8">

        {/* Header */}
        <div className="reveal text-center mb-16 flex flex-col items-center gap-5" ref={headerRef}>
          <div className="section-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Testimonials
          </div>
          <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] font-heading font-bold text-text-main tracking-tight">
            Loved by <span className="gradient-text">Studio Teams</span>
          </h2>
          <p className="text-[1.125rem] font-sans font-medium text-text-sec leading-[1.8] max-w-[460px]">
            Don&apos;t take my word for it — here&apos;s what clients say about working together.
          </p>
        </div>

        {/* Carousel */}
        <div className="flex flex-col gap-12">
          {/* Cards container */}
          <div className="relative h-[340px] flex items-center justify-center">
            {testimonialsData.map((t, i) => (
              <div key={t.id}
                   className="absolute w-[580px] max-w-[calc(100vw-80px)]
                              bg-glass backdrop-blur-2xl border border-glass-border rounded-[28px] p-11
                              shadow-custom shadow-custom flex flex-col gap-6 cursor-pointer"
                   style={{ ...getStyle(i), transition:'all .5s cubic-bezier(.4,0,.2,1)' }}
                   onClick={() => setActive(i)}>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent rounded-t-[28px]" />

                {/* Quote */}
                <div className="text-[5rem] leading-[.4] font-black text-primary select-none" style={{ fontFamily:'Georgia,serif' }}>&ldquo;</div>

                <p className="text-text-sec font-sans font-medium text-[1.125rem] leading-[1.8] italic">{t.review}</p>

                <div className="flex items-center gap-4">
                  <div className="w-13 h-13 rounded-full overflow-hidden border-2 border-border-subtle flex-shrink-0"
                       style={{ width:'52px', height:'52px' }}>
                    <Image src={t.image} alt={t.name} width={52} height={52}
                           className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Stars count={t.stars} />
                    <p className="font-subheading font-[600] text-text-main text-[1.125rem]">{t.name}</p>
                    <p className="text-text-sec text-[13px] font-subheading font-[600] uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <button onClick={() => go(-1)}
                    className="w-12 h-12 rounded-full bg-glass backdrop-blur-md border border-border-subtle
                               flex items-center justify-center text-primary
                               shadow-custom shadow-custom
                               transition-all duration-300 hover:scale-110 hover:bg-gradient-to-br hover:from-violet-600 hover:to-purple-500 hover:text-white hover:border-transparent hover:shadow-custom hover:shadow-custom"
                    aria-label="Previous">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>

            <div className="flex gap-2.5">
              {testimonialsData.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                        className={`h-2 rounded-full transition-all duration-300
                                   ${i === active
                                     ? 'w-7 bg-primary hover:bg-primary-hover transition-colors'
                                     : 'w-2 bg-violet-200 hover:bg-violet-300'}`}
                        aria-label={`Go to ${i+1}`} />
              ))}
            </div>

            <button onClick={() => go(1)}
                    className="w-12 h-12 rounded-full bg-glass backdrop-blur-md border border-border-subtle
                               flex items-center justify-center text-primary
                               shadow-custom shadow-custom
                               transition-all duration-300 hover:scale-110 hover:bg-gradient-to-br hover:from-violet-600 hover:to-purple-500 hover:text-white hover:border-transparent hover:shadow-custom hover:shadow-custom"
                    aria-label="Next">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
