import Image from "next/image";
export default function GalleryCard({ item, onClick }) {
  return (
    <div className="break-inside-avoid mb-5 group">
      <div
        onClick={() => onClick(item)}
        className="
          relative
          overflow-hidden
          rounded-[24px]
          cursor-pointer
          bg-white
          shadow-sm
          transition-all
          duration-300
          hover:shadow-xl
        "
      >
        <Image
          src={item.image}
          alt={item.title}
          width={600}
          height={800}
          loading="lazy"
          className="
            w-full
            h-full
            block
            transition-transform
            duration-700
            group-hover:scale-105
          "
          unoptimized
        />

        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-black/70
            via-black/20
            to-transparent
            opacity-0
            group-hover:opacity-100
            transition-opacity
            duration-300
            flex items-end
            p-5
          "
        >
          <div>
            <h3 className="text-white text-lg font-semibold">
              {item.title}
            </h3>

            <p className="text-white/80 text-sm uppercase tracking-wider">
              {item.category}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}