"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { galleryData, categorySections } from "@/data/galleryData";

/* ───────────────────────────── */
/* MODAL */
/* ───────────────────────────── */

function GalleryModal({ item, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  if (!item) return null;

  return (
    <div
      onClick={onClose}
      className="
        fixed inset-0 z-[1000]
        flex items-center justify-center
        bg-black/95 backdrop-blur-md
        animate-in fade-in duration-300
      "
    >
      {/* Modal Content */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          max-w-6xl w-full
          animate-in zoom-in-95 duration-300
        "
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="
            absolute top-5 right-5 z-20
            w-12 h-12 rounded-full
            bg-white/10 backdrop-blur-xl
            border border-white/20
            flex items-center justify-center
            text-white
            transition-all duration-300
            hover:scale-110 hover:bg-white/20
          "
        >
          <X size={22} />
        </button>

        {/* Image */}
        <div
          className="
            relative overflow-hidden
            rounded-[32px]
                mt-12      "
        >
          <div className="relative w-full h-[80vh]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Bottom Overlay */}
          <div
            className="
              absolute bottom-0 left-0 right-0
              p-6
             
            "
          ></div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────── */
/* CARD */
/* ───────────────────────────── */

function GalleryCard({ item, onClick }) {
  const heightMap = {
    tall: "320px",
    medium: "240px",
    short: "180px",
    wide: "200px",
  };

  return (
    <div className="break-inside-avoid mb-4">
      <div
        onClick={() => onClick(item)}
        className="
          relative group cursor-zoom-in
          rounded-[28px] overflow-hidden

          bg-white/60
          backdrop-blur-xl

          border border-white/40

          shadow-[0_10px_40px_rgba(0,0,0,.06)]

          transition-all duration-500

          hover:scale-[1.02]
          hover:-translate-y-2
          hover:shadow-[0_25px_80px_rgba(0,0,0,.12)]
        "
      >
        <div
          className="relative overflow-hidden"
          style={{
            height: heightMap[item.height] || "240px",
          }}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width:768px) 50vw, 25vw"
            className="
              object-cover
              transition-transform duration-700
              group-hover:scale-110
            "
          />

          {/* Hover Overlay */}
          <div
            className="
              absolute inset-0
              opacity-0 group-hover:opacity-100
              transition-all duration-500

              flex items-end
              p-5

              bg-gradient-to-t
              from-black/70
              via-black/10
              to-transparent
            "
          >
            <div className="translate-y-4 group-hover:translate-y-0 transition-all duration-500">
              <p className="text-white text-xl font-bold">{item.title}</p>

              <p className="text-white/70 uppercase tracking-[0.2em] text-xs mt-1">
                {item.category}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────── */
/* SECTION */
/* ───────────────────────────── */

function GallerySection({ section, onImageClick }) {
  const items = galleryData.filter((item) => item.category === section.label);

  return (
    <div className="mb-20">
      {/* Heading */}
      <div className="mb-12">
        <h3 className="text-5xl font-bold tracking-tight text-[#191919]">
          {section.label}
        </h3>

        <p className="text-[#6B7280] text-lg mt-3 max-w-xl leading-[1.8]">
          {section.description}
        </p>
      </div>

      {/* Masonry */}
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-5">
        {items.map((item) => (
          <GalleryCard key={item.id} item={item} onClick={onImageClick} />
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────────── */
/* MAIN */
/* ───────────────────────────── */

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <section id="portfolio" className="relative py-24 overflow-hidden">
        {/* Background */}
        <div
          className="
            absolute inset-0
            pointer-events-none
          "
          style={{
            background: `
              radial-gradient(circle at top left,
              rgba(23,105,255,.06),
              transparent 30%),

              radial-gradient(circle at bottom right,
              rgba(255,180,0,.05),
              transparent 30%)
            `,
          }}
        />

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          {/* Main Heading */}
          <div className="text-center">
            <h2 className="text-[clamp(3rem,6vw,5rem)] font-black tracking-tight text-[#191919] leading-none">
              Featured{" "}
              <span className="bg-gradient-to-r from-[#1769FF] to-[#3B82F6] bg-clip-text text-transparent">
                Artwork
              </span>
            </h2>

            <p className="text-[#6B7280] text-xl max-w-2xl mx-auto mt-6 leading-[1.8]">
              A curated showcase of premium slot game art, crafted to create
              immersive player experiences.
            </p>
          </div>

          {/* Sections */}
          {categorySections.map((section) => (
            <GallerySection
              key={section.id}
              section={section}
              onImageClick={setSelectedImage}
            />
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <GalleryModal
          item={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}
