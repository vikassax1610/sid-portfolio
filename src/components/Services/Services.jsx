'use client';
import { useEffect, useRef } from 'react';
import { servicesData } from '@/data/siteData';

export default function Services() {
  const headerRef = useRef(null);
  const cardRefs  = useRef([]);
  const ctaRef    = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    [headerRef, ctaRef, ...cardRefs.current].forEach(r => (r?.current ?? r) && observer.observe(r?.current ?? r));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (e, id) => { e.preventDefault(); document.querySelector(id)?.scrollIntoView({ behavior:'smooth' }); };

  return (
    <section id="services" className="py-36 relative overflow-hidden">
      {/* BG blobs */}
      <div className="pointer-events-none absolute -top-24 -right-48 w-[600px] h-[600px] rounded-full opacity-50"
           style={{ background:'radial-gradient(circle, rgba(23, 105, 255,.07), transparent 70%)', filter:'blur(80px)' }} />
      <div className="pointer-events-none absolute bottom-0 -left-36 w-[500px] h-[500px] rounded-full opacity-40"
           style={{ background:'radial-gradient(circle, rgba(255, 180, 0,.06), transparent 70%)', filter:'blur(80px)' }} />

      <div className="max-w-7xl mx-auto px-8">

        {/* Header */}
        <div className="reveal text-center mb-16 flex flex-col items-center gap-5" ref={headerRef}>
          <div className="section-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Services
          </div>
          <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] font-heading font-bold text-text-main tracking-tight">
            What I <span className="gradient-text">Deliver</span>
          </h2>
          <p className="text-[1.125rem] font-sans font-medium text-text-sec leading-[1.8] max-w-[520px]">
            From single symbols to complete game art packages — premium quality, every time.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {servicesData.map((s, i) => (
            <div key={s.id}
                 className="reveal relative group bg-glass backdrop-blur-xl border border-glass-border rounded-3xl p-9
                            shadow-custom shadow-custom flex flex-col gap-4 overflow-hidden
                            transition-all duration-500 hover:-translate-y-3 hover:shadow-custom-hover hover:shadow-custom hover:border-border-subtle"
                 ref={el => cardRefs.current[i] = el}
                 style={{ transitionDelay: `${i * .08}s` }}>

              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />
              <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   style={{ background:'radial-gradient(circle, rgba(23, 105, 255,.12), transparent 70%)' }} />

              {/* Top row */}
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-primary-soft border border-border-subtle flex items-center justify-center text-[1.4rem]
                                transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-8deg] group-hover:bg-violet-200/60">
                  {s.icon}
                </div>
                <span className="text-[13px] font-subheading font-[600] uppercase tracking-widest text-primary bg-primary-soft border border-border-subtle px-3 py-1.5 rounded-full">
                  {s.price}
                </span>
              </div>

              <h3 className="text-[1.25rem] font-subheading font-[600] text-text-main">{s.title}</h3>
              <p className="text-[.95rem] font-sans font-medium text-text-sec leading-[1.8] flex-1">{s.description}</p>

              <a href="#contact" onClick={e => scrollTo(e, '#contact')}
                 className="inline-flex items-center gap-2 text-[13px] font-subheading font-[600] uppercase tracking-widest text-primary no-underline mt-1
                            transition-all duration-300 hover:gap-4">
                Get a Quote
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div ref={ctaRef} className="reveal relative bg-primary hover:bg-primary-hover transition-colors/60 backdrop-blur-xl
                        border border-border-subtle rounded-[28px] px-14 py-12
                        flex flex-col sm:flex-row items-center justify-between gap-8 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-300/50 to-transparent" />
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h3 className="text-[2rem] font-heading font-bold text-text-main">Need a Custom Package?</h3>
            <p className="text-text-sec font-sans font-medium text-[1.05rem] leading-[1.8]">Let&apos;s discuss your project and create a custom solution.</p>
          </div>
          <a href="#contact" onClick={e => scrollTo(e, '#contact')}
             className="inline-flex items-center gap-2.5 px-9 py-4 flex-shrink-0 no-underline
                        bg-primary hover:bg-primary-hover transition-colors text-white font-subheading font-[600] text-[14px] rounded-full
                        shadow-custom shadow-custom
                        transition-all duration-300 hover:-translate-y-1 hover:scale-[1.04] hover:shadow-custom-hover hover:shadow-custom">
            Start a Project
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
