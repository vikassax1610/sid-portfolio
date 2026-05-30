import {X} from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
export default function GalleryModal({ item, onClose }) {
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
              unoptimized={item.image.startsWith("/uploads/")}
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