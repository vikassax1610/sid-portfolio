"use client";

import { useEffect, useState } from "react";
import { categorySections } from "@/data/galleryData";
import GallerySection from "./GallerySection";
import GalleryModal from "./GalleryModal";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);

  // Load gallery from the JSON API on mount
  useEffect(() => {
    fetch("/api/admin/gallery", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setGalleryItems(data);
      })
      .catch(() => {
        // Fallback: fetch the public JSON directly
        fetch("/gallery.json")
          .then((r) => r.json())
          .then((data) => {
            if (Array.isArray(data)) setGalleryItems(data);
          })
          .catch(console.error);
      });
  }, []);

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

        <div className="max-w-7xl mx-auto  relative z-10">
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
              items={galleryItems}
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
