"use client";

import { Gamepad2, BookOpen, Sparkles, Clock, Handshake } from "lucide-react";

const features = [
  {
    icon: <Gamepad2 size={24} color="#1769FF" />,
    title: "Game Inspired",
    desc: "Every asset is crafted with deep understanding of player psychology and gaming aesthetics.",
    color: "#1769FF",
  },
  {
    icon: <BookOpen size={24} color="#1769FF" />,
    title: "Storytelling",
    desc: "Art that tells a story — each symbol and character exists within a rich visual narrative.",
    color: "#1769FF",
  },
  {
    icon: <Sparkles size={24} color="#f59e0b" />,
    title: "High Quality",
    desc: "Pixel-perfect, production-ready art delivered in all formats your engine needs.",
    color: "#f59e0b",
  },
  {
    icon: <Clock size={24} color="#06b6d4" />,
    title: "On Time Delivery",
    desc: "Reliable timelines with milestone updates so you always know where your project stands.",
    color: "#06b6d4",
  },
  {
    icon: <Handshake size={24} color="#10b981" />,
    title: "Collaborative",
    desc: "Open communication, fast revisions, and a genuine partnership approach to every project.",
    color: "#10b981",
  },
];

export default function Features() {
  return (
    <section className="py-8 pb-20 relative z-10">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {features.map((f, i) => (
          <div
            key={i}
            className="relative group bg-gray-100/20 backdrop-blur-xl border border-gray-800/20 rounded-3xl p-6
                          shadow-custom shadow-custom overflow-hidden cursor-default
                          transition-all duration-500 hover:-translate-y-3 hover:shadow-custom-hover hover:shadow-custom hover:border-gray-800/40"
            style={{ "--feat-color": f.color }}
          >
            {/* Top gloss line */}

            {/* Corner glow */}

            {/* Icon */}
            <div
              className="mb-4 w-13 h-13 rounded-2xl flex items-center justify-center text-[1.4rem]
                            transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-5deg]"
              style={{
                background: `${f.color}18`,
                border: `1px solid ${f.color}30`,
                width: "52px",
                height: "52px",
              }}
            >
              {f.icon}
            </div>

            <h3 className="text-[1.2rem] font-subheading font-[600] text-text-main mb-2">
              {f.title}
            </h3>
            <p className="text-[.8rem] font-sans font-medium text-text-sec leading-[1.8]">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
