'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const features = [
  'Game-focused design thinking',
  'Attention to visual detail',
  'Creative & innovative approach',
  'Clear, fast communication',
  'Flexible revision process',
  'Production-ready file delivery',
];

const tools = [
  { name:'Photoshop',  icon:'🎨', level:98 },
  { name:'Illustrator',icon:'✏️', level:95 },
  { name:'Figma',      icon:'🖌️', level:88 },
  { name:'Blender',    icon:'🧊', level:75 },
  { name:'Procreate',  icon:'🖊️', level:90 },
];

export default function About() {
  const [visible, setVisible]   = useState(false);
  const leftRef                 = useRef(null);
  const rightRef                = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.25 }
    );
    if (leftRef.current) observer.observe(leftRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    [leftRef, rightRef].forEach(r => r.current && observer.observe(r.current));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-36 relative overflow-hidden">
      {/* Background decor */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[800px] h-[800px] rounded-full opacity-30"
           style={{ background:'radial-gradient(circle, rgba(124,58,237,.06) 0%, transparent 70%)', filter:'blur(60px)' }} />

      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

        {/* ── Left ── */}
        <div className="reveal-left flex flex-col gap-6" ref={leftRef}>
          <div className="section-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
            </svg>
            About Me
          </div>
          <h2 className="text-[clamp(2rem,3.2vw,3rem)] font-black text-slate-900 tracking-tight leading-[1.1]">
            Art That <span className="gradient-text">Powers</span> Your Game
          </h2>
          <div className="w-16 h-1 rounded-full bg-gradient-to-r from-violet-600 to-pink-500" />

          <p className="text-gray-500 leading-[1.9] text-[.98rem]">
            With 5+ years in slot game art, I&apos;ve shipped visual assets for studios across Europe, Asia,
            and North America. My work combines deep knowledge of gaming psychology with a passion for beautiful,
            functional design that resonates with players.
          </p>
          <p className="text-gray-500 leading-[1.9] text-[.98rem]">
            Whether you need a complete game skin, individual symbols, or a character lineup — I deliver work
            that doesn&apos;t just look good, but performs in the game.
          </p>

          {/* Feature checklist */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 list-none p-0">
            {features.map((f, i) => (
              <li key={i} className="flex items-center gap-3 text-[.88rem] font-medium text-slate-700">
                <span className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-600 to-purple-500
                                 flex items-center justify-center text-white text-[.6rem] font-black flex-shrink-0">
                  ✓
                </span>
                {f}
              </li>
            ))}
          </ul>

          {/* Tool bars */}
          <div className="mt-4">
            <p className="text-[.72rem] font-extrabold text-gray-400 uppercase tracking-[.1em] mb-4">
              Tools & Software
            </p>
            <div className="flex flex-col gap-4">
              {tools.map((t, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center text-[.86rem] font-semibold text-slate-700 mb-1.5">
                    <span>{t.icon} {t.name}</span>
                    <span className="text-violet-600 font-bold text-[.8rem]">{t.level}%</span>
                  </div>
                  <div className="h-1.5 bg-violet-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500
                                    transition-all duration-[1200ms] ease-out"
                         style={{
                           width: visible ? `${t.level}%` : '0%',
                           transitionDelay: `${i * 0.1 + 0.2}s`,
                         }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right ── */}
        <div className="reveal-right flex items-center justify-center" ref={rightRef}>
          <div className="relative w-full max-w-[440px]">
            {/* Glow */}
            <div className="absolute inset-[-20px] rounded-full opacity-60 animate-pulse-glow pointer-events-none"
                 style={{ background:'radial-gradient(circle, rgba(124,58,237,.15), transparent 70%)', filter:'blur(50px)' }} />

            {/* Art card */}
            <div className="relative z-10 rounded-[28px] overflow-hidden border-2 border-white/85 group
                            shadow-[0_30px_80px_rgba(124,58,237,.15)]
                            transition-transform duration-700 hover:scale-[1.02]">
              <Image src="https://picsum.photos/520/640?random=900" alt="Artist at work"
                     width={520} height={640} className="block w-full h-auto object-cover" />
              <div className="absolute inset-0"
                   style={{ background:'linear-gradient(to bottom, transparent 50%, rgba(30,27,75,.3))' }} />
            </div>

            {/* Floating experience badge */}
            <div className="absolute -bottom-5 -left-5 z-20 bg-white/90 backdrop-blur-xl rounded-2xl px-6 py-4
                            shadow-xl shadow-violet-200/50 border border-white/90 flex flex-col items-center
                            animate-float">
              <span className="text-[1.8rem] font-black gradient-text leading-none">5+</span>
              <span className="text-[.68rem] text-gray-500 font-semibold text-center mt-0.5">Years of Experience</span>
            </div>

            {/* Floating skill badge */}
            <div className="absolute top-6 -right-4 z-20 flex items-center gap-2 px-4 py-2.5
                            bg-gradient-to-r from-violet-600 to-purple-500 rounded-full text-white text-[.76rem] font-bold
                            shadow-lg shadow-violet-300/50 animate-float [animation-delay:1s]">
              🎰 Slot Art Specialist
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
