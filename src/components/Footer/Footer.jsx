"use client";
import { Mail, MessageCircle, MapPin, Clock } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Me", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    name: "Behance",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
        <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3h-3.39v3.016h3.341c3.055 0 2.868-3.016.049-3.016z" />
      </svg>
    ),
  },
  {
    name: "Dribbble",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
        <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.048 6.39 1.73 1.35 3.92 2.166 6.298 2.166 1.42 0 2.77-.29 4.005-.806zm-9.88-2.895c.239-.39 3.117-5.206 8.292-6.83.132-.045.266-.084.399-.12-.239-.557-.503-1.105-.78-1.646-4.818 1.485-9.49 1.425-9.922 1.408a10.142 10.142 0 0 0-.012.99c0 2.34.71 4.51 1.923 6.198zm-2.065-8.138c.438.012 4.422.03 8.95-1.172-1.603-2.85-3.33-5.248-3.588-5.612a10.22 10.22 0 0 0-5.362 6.784zm8.212-7.968c.27.375 2.02 2.77 3.612 5.672 3.438-1.288 4.898-3.24 5.067-3.472A10.133 10.133 0 0 0 12.272 2.45zm9.387 5.688c-.2.26-1.818 2.383-5.418 3.858.225.463.438.932.637 1.407.07.17.14.34.207.513 3.396-.43 6.77.258 7.1.332-.012-2.205-.638-4.266-1.726-6.11z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const go = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative">
      {/* Animated gradient bar */}
      <div
        className="h-[3px] bg-[length:200%_auto] animate-gradient"
        style={{
          background:
            "linear-gradient(90deg, #1769FF, #1769FF, #1769FF, #f59e0b, #1769FF)",
        }}
      />

      <div className="bg-glass backdrop-blur-2xl border-t border-glass-border shadow-[0_-4px_40px_rgba(23, 105, 255,.07)]">
        <div className="max-w-7xl mx-auto px-8 pt-16 pb-10">
          {/* Top row */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1.2fr] gap-14 pb-12 border-b border-border-subtle mb-8">
            {/* Logo + tagline + socials */}
            <div className="flex flex-col gap-5">
              <a
                href="#home"
                onClick={(e) => go(e, "#home")}
                className="flex items-center gap-3 no-underline w-fit group"
              >
                <div
                  className="w-11 h-11 rounded-xl bg-primary hover:bg-primary-hover transition-colors
                                flex items-center justify-center text-white font-black text-lg
                                shadow-custom shadow-custom transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-5deg]"
                >
                  S
                </div>
                <span className="font-heading font-[800] text-[1.2rem] leading-none tracking-[-0.02em]">
                  <span className="bg-primary hover:bg-primary-hover transition-colors bg-clip-text text-transparent">
                    Siddhant
                  </span>
                  <span className="text-text-main"> Sharma</span>
                </span>
              </a>
              <p className="text-[.95rem] font-sans font-medium text-text-sec leading-[1.8] max-w-[320px]">
                Premium slot game art that captivates players and powers
                unforgettable gaming experiences.
              </p>
              <div className="flex gap-2.5">
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    aria-label={s.name}
                    title={s.name}
                    className="w-10 h-10 rounded-xl bg-primary-soft border border-border-subtle
                                flex items-center justify-center text-primary
                                transition-all duration-300 hover:bg-gradient-to-br hover:from-violet-600 hover:to-purple-500
                                hover:text-white hover:border-transparent hover:-translate-y-1 hover:scale-110 hover:shadow-custom hover:shadow-custom
                                no-underline"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col gap-5">
              <h4 className="text-[13px] font-subheading font-[600] text-text-sec uppercase tracking-widest">
                Navigation
              </h4>
              <ul className="flex flex-col gap-2.5 list-none p-0">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={(e) => go(e, l.href)}
                      className="flex items-center gap-2 text-[.95rem] font-sans font-medium text-text-sec no-underline
                                  transition-all duration-300 hover:text-primary hover:gap-4 group"
                    >
                      <span className="w-0 group-hover:w-3.5 h-0.5 bg-primary hover:bg-primary-hover transition-colors rounded-full transition-all duration-300" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-5">
              <h4 className="text-[13px] font-subheading font-[600] text-text-sec uppercase tracking-widest">
                Get In Touch
              </h4>
              <div className="flex flex-col gap-3">
                {[
                  {
                    icon: <Mail size={16} color="#1769FF" />,
                    text: "hello@slotartist.com",
                  },
                  {
                    icon: <MessageCircle size={16} color="#06b6d4" />,
                    text: "@slotartist (Telegram)",
                  },
                  {
                    icon: <MapPin size={16} color="#f59e0b" />,
                    text: "Remote — Worldwide",
                  },
                  {
                    icon: <Clock size={16} color="#10b981" />,
                    text: "24hr Response Time",
                  },
                ].map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 text-[.95rem] font-sans font-medium text-text-sec"
                  >
                    <span>{c.icon}</span>
                    <span>{c.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[13px] font-sans font-medium text-text-sec">
              © {new Date().getFullYear()} Siddhant Sharma. All rights reserved.
            </p>
            <div className="flex gap-5">
              {["Privacy Policy", "Terms of Service"].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="text-[13px] font-sans font-medium text-text-sec no-underline transition-colors hover:text-primary"
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
