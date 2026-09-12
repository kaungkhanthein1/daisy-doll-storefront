import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { MedusaProductImage } from "@/types/medusa";

interface ImageCarouselProps {
  images: MedusaProductImage[];
  thumbnail: string | null;
  alt: string;
}

export default function ImageCarousel({
  images,
  thumbnail,
  alt,
}: ImageCarouselProps) {
  const allImages =
    images.length > 0
      ? images
      : thumbnail
        ? [{ id: "thumb", url: thumbnail, rank: 0 }]
        : [];

  const [current, setCurrent] = useState(0);

  if (allImages.length === 0) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ width: "100%", height: "100%", fontSize: 14, color: "#666666" }}
      >
        No Image
      </div>
    );
  }

  const prev = () =>
    setCurrent((c) => (c === 0 ? allImages.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === allImages.length - 1 ? 0 : c + 1));

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <img
        src={allImages[current].url}
        alt={alt}
        loading="eager"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          transition: "opacity 0.2s",
        }}
      />

      {allImages.length > 1 && (
        <>
          <button
            onClick={prev}
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.9)",
              padding: 8,
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
            }}
          >
            <ChevronLeft size={18} color="#374151" />
          </button>
          <button
            onClick={next}
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.9)",
              padding: 8,
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
            }}
          >
            <ChevronRight size={18} color="#374151" />
          </button>
          <div
            style={{
              position: "absolute",
              bottom: 12,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 6,
            }}
          >
            {allImages.map((_, i) => (
              <div
                key={i}
                style={{
                  borderRadius: "50%",
                  transition: "all 0.3s",
                  height: i === current ? 8 : 8,
                  width: i === current ? 20 : 8,
                  backgroundColor: i === current ? "#111827" : "#d1d5db",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
