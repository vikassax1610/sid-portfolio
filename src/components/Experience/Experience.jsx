'use client';
import { useEffect, useRef } from 'react';

const stats = [
  { number:'100+', label:'Projects Completed', icon:'🎨', color:'#1769FF' },
  { number:'50+',  label:'Happy Clients',       icon:'🤝', color:'#1769FF' },
  { number:'5+',   label:'Years Experience',    icon:'⭐', color:'#f59e0b' },
  { number:'10+',  label:'Genres Covered',      icon:'🎮', color:'#06b6d4' },
];

const timeline = [
  {
    year:'2019', icon:'🌱', title:'Started Freelancing', company:'Independent',
    desc:'Began creating slot art for indie studios, building a diverse portfolio across classic and video slots.',
    achievements:['First 10 clients','Mastered symbol design','Built production workflow'],
  },
  {
    year:'2021', icon:'🚀', title:'Senior Artist', company:'GoldReel Studios',
    desc:'Joined a mid-sized studio as senior game artist, leading visual direction for 20+ slot titles.',
    achievements:['Led a team of 3','20+ shipped titles','Designed award-winning games'],
  },
  {
    year:'2023', icon:'👑', title:'Lead Slot Designer', company:'NeonSpin Interactive',
    desc:'Promoted to lead designer, responsible for full game art direction and brand identity for flagship titles.',
    achievements:['Art directed 5 flagship slots','Managed $2M+ budgets','40% engagement uplift'],
  },
  {
    year:'2024', icon:'💎', title:'Freelance Studio Owner', company:'Self / Studio',
    desc:'Returned to freelance with a premium studio model, serving top-tier clients with complete game art packages.',
    achievements:['50+ global clients','Full-service offering','Premium positioning'],
  },
];

export default function Experience() {
  const headerRef = useRef(null);
  const itemRefs  = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    );
    [headerRef, ...itemRefs.current].forEach(r => (r?.current ?? r) && observer.observe(r?.current ?? r));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="py-36 relative overflow-hidden">
      {/* BG blob */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[900px] h-[900px] rounded-full opacity-30"
           style={{ background:'radial-gradient(circle, rgba(23, 105, 255,.04) 0%, transparent 70%)', filter:'blur(100px)' }} />

      <div className="max-w-7xl mx-auto px-8">

        {/* ── Header ── */}
        <div className="reveal text-center mb-20 flex flex-col items-center gap-5" ref={headerRef}>
          <div className="section-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Experience
          </div>
          <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] font-heading font-bold text-text-main tracking-tight leading-[1.1]">
            A Journey of <span className="gradient-text">Creative Growth</span>
          </h2>
          <p className="text-[1.125rem] font-sans font-medium text-text-sec leading-[1.8] max-w-[560px]">
            From indie freelancing to leading full studio productions — here is the journey that shaped my craft.
          </p>
        </div>

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((s, i) => (
            <div key={i}
                 className="reveal relative group bg-glass backdrop-blur-xl border border-glass-border rounded-3xl
                            p-10 text-center overflow-hidden cursor-default
                            shadow-custom shadow-custom
                            transition-all duration-500 hover:-translate-y-3 hover:shadow-custom-hover hover:shadow-custom"
                 ref={el => itemRefs.current[i] = el}
                 style={{ transitionDelay: `${i * .1}s` }}>

              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />
              <div className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full pointer-events-none opacity-[.08] group-hover:opacity-[.18] transition-opacity duration-400"
                   style={{ background: `radial-gradient(circle, ${s.color}, transparent 70%)` }} />

              <div className="text-3xl mb-4 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-[-5deg] inline-block">
                {s.icon}
              </div>
              <div className="text-[3rem] font-heading font-[800] leading-none mb-3 gradient-text">{s.number}</div>
              <div className="text-[13px] text-text-sec font-subheading font-[600] uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Timeline ── */}
        <div className="relative">
          {/* Center line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
               style={{ background:'linear-gradient(180deg, transparent, rgba(23, 105, 255,.4) 15%, rgba(23, 105, 255,.4) 85%, transparent)' }} />

          <div className="flex flex-col gap-14">
            {timeline.map((item, i) => (
              <div key={i}
                   className={`reveal flex w-full ${i % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'}`}
                   ref={el => itemRefs.current[stats.length + i] = el}
                   style={{ transitionDelay: `${i * .15}s` }}>

                {/* Card — takes 45% on desktop */}
                <div className="w-full lg:w-[45%] relative group">
                  {/* Timeline dot (hidden mobile) */}
                  <div className={`hidden lg:block absolute top-8 w-4 h-4 rounded-full
                                   bg-primary hover:bg-primary-hover transition-colors
                                   border-[3px] border-white shadow-custom shadow-custom
                                   ${i % 2 === 0 ? '-right-[8.5%]' : '-left-[8.5%]'}`} />

                  {/* Glass card */}
                  <div className="bg-glass backdrop-blur-xl border border-glass-border rounded-3xl p-8
                                  shadow-custom shadow-custom
                                  transition-all duration-500 hover:-translate-y-2 hover:shadow-custom-hover hover:shadow-custom">
                    <span className="inline-block px-3 py-1 bg-primary-soft text-primary text-[12px] font-subheading font-[600]
                                     uppercase tracking-widest rounded-full mb-3">
                      {item.year}
                    </span>
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <h3 className="text-[1.25rem] font-subheading font-[600] text-text-main mb-1">{item.title}</h3>
                    <p className="text-[.9rem] font-subheading font-[600] text-primary mb-4">{item.company}</p>
                    <p className="text-[.95rem] font-sans font-medium text-text-sec leading-[1.8] mb-5">{item.desc}</p>
                    <ul className="flex flex-col gap-2 list-none p-0">
                      {item.achievements.map((a, j) => (
                        <li key={j} className="flex items-center gap-2 text-[.9rem] font-sans font-medium text-text-sec">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary hover:bg-primary-hover transition-colors flex-shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
