import GalleryCard from "./GalleryCard";

export default function GallerySection({ section, items, onImageClick }) {
  const sectionItems = items.filter((item) => item.category === section.label);
  if (sectionItems.length === 0) return null;

  return (
    <div className="mb-20 ">
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
      <div className="columns-2 sm:columns-3 lg:columns-3 xl:columns-4 gap-5">
        {sectionItems.map((item) => (
          <GalleryCard key={item.id} item={item} onClick={onImageClick} />
        ))}
      </div>
    </div>
  );
}