"use client";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Me", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setActive(href.replace("#", ""));
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500
      ${
        scrolled
          ? "py-3 bg-glass backdrop-blur-2xl border-b border-glass-border shadow-custom shadow-custom"
          : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between gap-6">
        {/* ── Logo ── */}
        <a
          href="#home"
          onClick={(e) => go(e, "#home")}
          className="flex items-center gap-3 no-underline flex-shrink-0 group"
        >
          <div
            className="w-11 h-11 rounded-xl bg-primary hover:bg-primary-hover transition-colors
                          flex items-center justify-center text-white font-black text-lg
                          shadow-custom shadow-custom
                          transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-5deg]"
          >
            S
          </div>
          <span className="font-heading font-[800] text-[1.2rem] leading-none tracking-[-0.02em]">
            <span className="gradient-text-vivid">
              Sidhant
            </span>
            <span className="text-text-main"> Sharma</span>
          </span>
        </a>

        {/* ── Nav Links (desktop) ── */}
        <ul className="hidden lg:flex items-center gap-1 list-none m-0 p-0">
          {navLinks.map(({ label, href }) => {
            const id = href.replace("#", "");
            return (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => go(e, href)}
                  className={`relative px-4 py-2 text-[14px] font-subheading font-[600] uppercase tracking-widest rounded-full no-underline transition-all duration-300
                     ${
                       active === id
                         ? "text-primary bg-primary-soft"
                         : "text-primary hover:text-primary hover:bg-primary-soft"
                     }`}
                >
                  {label}
                  {active === id && (
                    <span
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-0.5
                                     rounded-full bg-primary"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* ── CTA (desktop) ── */}
        <a
          href="#contact"
          onClick={(e) => go(e, "#contact")}
          className="hidden lg:flex items-center gap-2 px-6 py-2.5 flex-shrink-0 whitespace-nowrap no-underline
                      font-subheading font-[600] text-[14px] text-white rounded-full
                      bg-primary hover:bg-primary-hover transition-colors
                      shadow-custom shadow-custom
                      transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.04] hover:shadow-custom-hover hover:shadow-custom
                      overflow-hidden relative group"
        >
          <span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                           -translate-x-full group-hover:translate-x-full transition-transform duration-500"
          />
          Let&apos;s Work Together
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

        {/* ── Hamburger ── */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="lg:hidden flex flex-col gap-[5px] p-2 rounded-xl hover:bg-primary-soft transition-colors"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-violet-600 rounded-full transition-all duration-300 origin-center
                           ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-violet-600 rounded-full transition-all duration-300
                           ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-violet-600 rounded-full transition-all duration-300 origin-center
                           ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* ── Mobile Drawer ── */}
      {menuOpen && (
        <div
          className="lg:hidden absolute top-full right-0 w-72 h-screen
                        bg-white/95 backdrop-blur-2xl border-l border-border-subtle
                        shadow-2xl shadow-custom py-8 px-6 flex flex-col gap-2"
        >
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => go(e, href)}
              className="px-4 py-3.5 text-primary font-subheading font-[600] rounded-xl no-underline
                          hover:bg-primary-soft hover:text-primary transition-all duration-200 text-[15px] uppercase tracking-widest"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => go(e, "#contact")}
            className="mt-4 text-center px-4 py-3 rounded-full text-white font-subheading font-[600] text-[14px] no-underline
                        bg-primary shadow-custom shadow-custom"
          >
            Let&apos;s Work Together
          </a>
        </div>
      )}
    </nav>
  );
}
