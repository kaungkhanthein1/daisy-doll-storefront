import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useState } from "react";
import type { MedusaProduct } from "@/types/medusa";
import { getProductPrice, formatMmk } from "@/lib/medusa";

interface ProductCardProps {
  product: MedusaProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const price = getProductPrice(product);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Link
      to={`/product/${product.handle}`}
      className="block"
      style={{ cursor: "pointer" }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: "173 / 200",
          borderRadius: 12,
          backgroundColor: "#f5f5f5",
          boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)",
        }}
      >
        {product.thumbnail ? (
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="eager"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "opacity 0.15s",
            }}
          />
        ) : null}
        <button
          style={{
            position: "absolute",
            right: 2,
            top: 2,
            zIndex: 10,
            padding: 8,
          }}
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={20}
            color={isFavorite ? "#E0607E" : "#000000"}
            fill={isFavorite ? "#E0607E" : "transparent"}
          />
        </button>
      </div>

      <p
        style={{
          marginTop: 5,
          fontSize: 11,
          fontWeight: 600,
          color: "#000000",
          lineHeight: 1.4,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {product.title}
      </p>

      <p
        style={{
          marginTop: 4,
          fontSize: 11,
          fontWeight: 600,
          color: "#000000",
        }}
      >
        {price !== null ? formatMmk(price) : "Price unavailable"}
      </p>
    </Link>
  );
}
