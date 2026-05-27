'use client';
import { useEffect, useRef } from 'react';

const stats = [
  { number:'100+', label:'Projects Completed', icon:'🎨', color:'#7c3aed' },
  { number:'50+',  label:'Happy Clients',       icon:'🤝', color:'#ec4899' },
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
           style={{ background:'radial-gradient(circle, rgba(124,58,237,.04) 0%, transparent 70%)', filter:'blur(100px)' }} />

      <div className="max-w-7xl mx-auto px-8">

        {/* ── Header ── */}
        <div className="reveal text-center mb-20 flex flex-col items-center gap-5" ref={headerRef}>
          <div className="section-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Experience
          </div>
          <h2 className="text-[clamp(2.2rem,3.5vw,3.2rem)] font-black text-slate-900 tracking-tight leading-[1.1]">
            A Journey of <span className="gradient-text">Creative Growth</span>
          </h2>
          <p className="text-[1.05rem] text-gray-500 leading-relaxed max-w-[520px]">
            From indie freelancing to leading full studio productions — here is the journey that shaped my craft.
          </p>
        </div>

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((s, i) => (
            <div key={i}
                 className="reveal relative group bg-white/60 backdrop-blur-xl border border-white/85 rounded-3xl
                            p-10 text-center overflow-hidden cursor-default
                            shadow-md shadow-violet-100/40
                            transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-violet-200/40"
                 ref={el => itemRefs.current[i] = el}
                 style={{ transitionDelay: `${i * .1}s` }}>

              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />
              <div className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full pointer-events-none opacity-[.08] group-hover:opacity-[.18] transition-opacity duration-400"
                   style={{ background: `radial-gradient(circle, ${s.color}, transparent 70%)` }} />

              <div className="text-3xl mb-4 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-[-5deg] inline-block">
                {s.icon}
              </div>
              <div className="text-[2.8rem] font-black leading-none mb-3 gradient-text">{s.number}</div>
              <div className="text-[.88rem] text-gray-500 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Timeline ── */}
        <div className="relative">
          {/* Center line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
               style={{ background:'linear-gradient(180deg, transparent, rgba(124,58,237,.4) 15%, rgba(124,58,237,.4) 85%, transparent)' }} />

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
                                   bg-gradient-to-br from-violet-600 to-pink-500
                                   border-[3px] border-white shadow-md shadow-violet-300/50
                                   ${i % 2 === 0 ? '-right-[8.5%]' : '-left-[8.5%]'}`} />

                  {/* Glass card */}
                  <div className="bg-white/65 backdrop-blur-xl border border-white/85 rounded-3xl p-8
                                  shadow-md shadow-violet-100/40
                                  transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-violet-200/40">
                    <span className="inline-block px-3 py-1 bg-violet-100 text-violet-600 text-[.72rem] font-extrabold
                                     uppercase tracking-[.1em] rounded-full mb-3">
                      {item.year}
                    </span>
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <h3 className="text-[1.15rem] font-extrabold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-[.8rem] font-semibold text-violet-500 mb-4">{item.company}</p>
                    <p className="text-[.88rem] text-gray-500 leading-[1.75] mb-5">{item.desc}</p>
                    <ul className="flex flex-col gap-2 list-none p-0">
                      {item.achievements.map((a, j) => (
                        <li key={j} className="flex items-center gap-2 text-[.8rem] font-medium text-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-violet-600 to-pink-500 flex-shrink-0" />
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
