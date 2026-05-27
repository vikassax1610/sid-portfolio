'use client';

const features = [
  { icon:'🎮', title:'Game Inspired',    desc:'Every asset is crafted with deep understanding of player psychology and gaming aesthetics.',   color:'#1769FF' },
  { icon:'📖', title:'Storytelling',     desc:'Art that tells a story — each symbol and character exists within a rich visual narrative.',     color:'#1769FF' },
  { icon:'✨', title:'High Quality',     desc:'Pixel-perfect, production-ready art delivered in all formats your engine needs.',                color:'#f59e0b' },
  { icon:'⏱️', title:'On Time Delivery', desc:'Reliable timelines with milestone updates so you always know where your project stands.',        color:'#06b6d4' },
  { icon:'🤝', title:'Collaborative',   desc:'Open communication, fast revisions, and a genuine partnership approach to every project.',       color:'#10b981' },
];

export default function Features() {
  return (
    <section className="py-8 pb-20 relative z-10">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {features.map((f, i) => (
          <div key={i}
               className="relative group bg-glass backdrop-blur-xl border border-glass-border rounded-3xl p-8
                          shadow-custom shadow-custom overflow-hidden cursor-default
                          transition-all duration-500 hover:-translate-y-3 hover:shadow-custom-hover hover:shadow-custom hover:border-white/95"
               style={{ '--feat-color': f.color }}>

            {/* Top gloss line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />

            {/* Corner glow */}
            <div className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full pointer-events-none opacity-[.07] transition-opacity duration-500 group-hover:opacity-[.18]"
                 style={{ background: `radial-gradient(circle, ${f.color}, transparent 70%)` }} />

            {/* Icon */}
            <div className="mb-4 w-13 h-13 rounded-2xl flex items-center justify-center text-[1.4rem]
                            transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-5deg]"
                 style={{ background: `${f.color}18`, border: `1px solid ${f.color}30`, width:'52px', height:'52px' }}>
              {f.icon}
            </div>

            <h3 className="text-[1.1rem] font-subheading font-[600] text-text-main mb-2">{f.title}</h3>
            <p className="text-[.9rem] font-sans font-medium text-text-sec leading-[1.8]">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
