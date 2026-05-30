"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { Ghost, Star, Crown, FlaskConical, Gem, Flame, Sparkles } from "lucide-react";

const particles = [
  { left: 8, delay: 0.5, dur: 7, size: 4 },
  { left: 16, delay: 2.1, dur: 9, size: 6 },
  { left: 24, delay: 0.8, dur: 8, size: 3 },
  { left: 32, delay: 3.5, dur: 11, size: 5 },
  { left: 40, delay: 1.2, dur: 7, size: 7 },
  { left: 48, delay: 4.0, dur: 10, size: 4 },
  { left: 55, delay: 0.3, dur: 8, size: 5 },
  { left: 62, delay: 2.8, dur: 9, size: 3 },
  { left: 70, delay: 5.5, dur: 12, size: 6 },
  { left: 78, delay: 1.7, dur: 8, size: 4 },
  { left: 85, delay: 3.2, dur: 7, size: 7 },
  { left: 92, delay: 6.0, dur: 10, size: 5 },
  { left: 5, delay: 7.3, dur: 13, size: 3 },
  { left: 20, delay: 2.5, dur: 8, size: 6 },
  { left: 35, delay: 1.0, dur: 9, size: 4 },
  { left: 50, delay: 4.8, dur: 11, size: 5 },
  { left: 65, delay: 0.6, dur: 7, size: 7 },
  { left: 75, delay: 3.9, dur: 10, size: 3 },
  { left: 88, delay: 5.1, dur: 9, size: 6 },
  { left: 96, delay: 1.4, dur: 8, size: 4 },
];

const floatingAssets = [
  {
    emoji: <Ghost size={32} color="#8b5cf6" />,
    label: "Wild",
    top: "12%",
    left: "5%",
    right: undefined,
    delay: "0s",
  },
  {
    emoji: <Star size={32} color="#f59e0b" />,
    label: "Scatter",
    top: "28%",
    right: "3%",
    left: undefined,
    delay: ".8s",
  },
  {
    emoji: <Crown size={32} color="#f59e0b" />,
    label: "Crown",
    top: "55%",
    left: "2%",
    right: undefined,
    delay: "1.4s",
  },
  {
    emoji: <FlaskConical size={32} color="#10b981" />,
    label: "Potion",
    bottom: "28%",
    right: "5%",
    left: undefined,
    delay: ".4s",
  },
  {
    emoji: <Gem size={32} color="#06b6d4" />,
    label: "Gem",
    bottom: "15%",
    left: "8%",
    right: undefined,
    delay: "1.8s",
  },
  {
    emoji: <Flame size={32} color="#ef4444" />,
    label: "Dragon",
    top: "8%",
    right: "20%",
    left: undefined,
    delay: "1.1s",
  },
];

const avatars = [
  "https://picsum.photos/48/48?random=701",
  "https://picsum.photos/48/48?random=702",
  "https://picsum.photos/48/48?random=703",
  "https://picsum.photos/48/48?random=704",
];

export default function Hero() {
  const heroRef = useRef(null);
  const artRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (!artRef.current) return;
      const { left, top, width, height } =
        heroRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      artRef.current.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg) translateZ(20px)`;
    };
    const onLeave = () => {
      if (artRef.current)
        artRef.current.style.transform =
          "perspective(1000px) rotateY(0deg) rotateX(0deg)";
    };
    const el = heroRef.current;
    el?.addEventListener("mousemove", onMove);
    el?.addEventListener("mouseleave", onLeave);
    return () => {
      el?.removeEventListener("mousemove", onMove);
      el?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const scrollTo = (e, id) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-16"
      style={{
        background: `
                   radial-gradient(circle at top left, rgba(23,105,255,.08), transparent 35%),
                   radial-gradient(circle at bottom right, rgba(255,180,0,.06), transparent 35%),
                   #FAFAF9
                 `,
      }}
    >
      {/* ── Main Grid ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        {/* Left */}
        <div className="flex flex-col gap-4">
          {/* Badge */}
          <div className="section-badge animate-fade-up w-fit">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse-dot" />
            Slot Art Maker
          </div>

          {/* Heading */}
          <h1 className="text-[clamp(4rem,4.5vw,5rem)] font-heading font-[800] leading-[0.95] tracking-[-0.04em] text-text-main animate-fade-up [animation-delay:.1s]">
            I Create Art That{" "}
            <span className="gradient-text-vivid">Brings Winnings</span> To Life
          </h1>

          <p className="text-[1.125rem] font-sans font-medium text-text-sec leading-[1.8] max-w-[540px] animate-fade-up [animation-delay:.2s]">
            Specializing in high-quality slot game art that captivates players
            and enhances gameplay. From wild symbols to full game skins.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 flex-wrap animate-fade-up [animation-delay:.3s]">
            <a
              href="#portfolio"
              onClick={(e) => scrollTo(e, "#portfolio")}
              className="relative overflow-hidden inline-flex items-center gap-2.5 px-9 py-4
                          bg-primary hover:bg-primary-hover transition-colors
                          text-white font-subheading font-[600] text-[.97rem] rounded-full no-underline
                          shadow-custom shadow-custom
                          transition-all duration-300 hover:-translate-y-1 hover:scale-[1.04] hover:shadow-custom-hover hover:shadow-custom group"
            >
              <span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent
                               -translate-x-full group-hover:translate-x-full transition-transform duration-500"
              />
              View Portfolio
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollTo(e, "#contact")}
              className="inline-flex items-center gap-2.5 px-9 py-[15px]
                          bg-glass backdrop-blur-sm text-primary font-subheading font-[600] text-[.97rem] rounded-full no-underline
                          border-2 border-border-subtle
                          transition-all duration-300 hover:bg-primary-soft hover:border-border-subtle hover:-translate-y-1 hover:shadow-custom hover:shadow-custom"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch Reel
            </a>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-5 flex-wrap animate-fade-up [animation-delay:.4s]">
            {/* Avatars */}
            <div className="flex items-center">
              {avatars.map((src, i) => (
                <div
                  key={i}
                  className="w-11 h-11 rounded-full border-[3px] border-white overflow-hidden shadow-custom
                                        transition-all duration-300 hover:-translate-y-1 hover:scale-110"
                  style={{
                    marginLeft: i > 0 ? "-10px" : 0,
                    zIndex: avatars.length - i,
                  }}
                >
                  <Image
                    src={src}
                    alt={`Client ${i + 1}`}
                    width={44}
                    height={44}
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
              ))}
            </div>
            <div className="ml-2 flex flex-col">
              <span className="text-[1.3rem] font-heading font-bold text-text-main">
                50+
              </span>
              <span className="text-[13px] text-text-sec font-subheading font-[600] uppercase tracking-widest mt-0.5">
                Happy Clients
              </span>
            </div>
            <div className="w-px h-9 bg-violet-200" />
            <div className="flex flex-col">
              <span className="text-[1.3rem] font-heading font-bold text-text-main">
                100+
              </span>
              <span className="text-[13px] text-text-sec font-subheading font-[600] uppercase tracking-widest mt-0.5">
                Projects
              </span>
            </div>
            <div className="w-px h-9 bg-violet-200" />
            <div className="flex flex-col">
              <span className="text-[1.3rem] font-heading font-bold text-text-main">
                5★
              </span>
              <span className="text-[13px] text-text-sec font-subheading font-[600] uppercase tracking-widest mt-0.5">
                Avg Rating
              </span>
            </div>
          </div>
        </div>

        {/* Right — Artwork */}
        <div className="flex items-center justify-center">
          <div
            ref={artRef}
            className="relative w-full max-w-[900px] transition-transform duration-100 will-change-transform animate-fade-right [animation-delay:.2s]"
          >
            {/* Glow */}
            <div
              className="absolute inset-[-30px] rounded-full opacity-60 animate-pulse-glow pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(23, 105, 255,.25), transparent 70%)",
                filter: "blur(40px)",
              }}
            />

            {/* Card */}
            <div
              className="relative z-10 rounded-[28px] overflow-hidden
                            bg-glass backdrop-blur-xl border-2 border-glass-border
                            shadow-[0_30px_80px_rgba(23, 105, 255,.18),0_0_0_1px_rgba(255,255,255,.5)]
                            group"
            >
              <Image
                src="https://picsum.photos/800/640?random=800"
                alt="Featured Slot Art"
                width={800}
                height={440}
                priority
                className="block w-full h-auto lg:h-[600px] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 60%, rgba(30,27,75,.45))",
                }}
              />
              <div
                className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap
                              px-5 py-2 bg-glass backdrop-blur-md rounded-full
                              text-[13px] font-subheading font-[600] uppercase tracking-widest text-primary
                              border border-glass-border shadow-custom shadow-custom flex items-center gap-2"
              >
                <Sparkles size={16} color="#f59e0b" /> Featured Work
              </div>
            </div>

            {/* Floating assets */}
            {floatingAssets.map((a, i) => (
              <div
                key={i}
                className="absolute flex flex-col items-center gap-1 animate-float z-20"
                style={{
                  top: a.top,
                  bottom: a.bottom,
                  left: a.left,
                  right: a.right,
                  animationDelay: a.delay,
                }}
              >
                <div
                  className="w-14 h-14 bg-white/85 backdrop-blur-xl border border-glass-border rounded-2xl
                                flex items-center justify-center text-[1.5rem]
                                shadow-custom shadow-custom transition-transform duration-300 hover:scale-110"
                >
                  {a.emoji}
                </div>
                <span
                  className="text-[12px] font-subheading font-[600] text-primary uppercase tracking-widest
                                 bg-glass px-3 py-1 rounded-full backdrop-blur-md"
                >
                  {a.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 z-10 animate-fade-up [animation-delay:1s]">
        <div className="w-6 h-9 border-2 border-border-subtle rounded-full flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 bg-primary rounded-full animate-scroll-wheel" />
        </div>
        <span className="text-[13px] font-subheading font-[600] text-text-sec uppercase tracking-[.15em]">
          Scroll to explore
        </span>
      </div>
    </section>
  );
}
