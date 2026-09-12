import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useProductByHandle } from "@/hooks/useProducts";
import { formatMmk, getVariantPrice } from "@/lib/medusa";
import ImageCarousel from "@/components/ImageCarousel";
import VariantSelector, {
  resolveSelectedVariant,
} from "@/components/VariantSelector";
import ChatOrderButtons from "@/components/ChatOrderButtons";

function Skeleton({ width, height, borderRadius = 8 }: { width: number | string; height: number; borderRadius?: number }) {
  return (
    <div
      className="animate-pulse"
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: "#fce7f3",
      }}
    />
  );
}

export default function ProductDetailPage() {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();

  const { data: product, isLoading, error } = useProductByHandle(handle ?? "");

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  // Initialize selected options when product loads
  useMemo(() => {
    if (product) {
      const initial: Record<string, string> = {};
      product.options?.forEach((opt) => {
        if (opt.values?.[0]) {
          initial[opt.id] = opt.values[0].id;
        }
      });
      setSelectedOptions(initial);
    }
  }, [product?.id]);

  const selectedVariant = useMemo(() => {
    if (!product) return undefined;
    return resolveSelectedVariant(product, selectedOptions);
  }, [product, selectedOptions]);

  const variantPrice = useMemo(() => {
    if (!product || !selectedVariant) return null;
    return getVariantPrice(product, selectedVariant.id);
  }, [product, selectedVariant]);

  const handleOptionSelect = (optionId: string, valueId: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionId]: valueId }));
  };

  if (isLoading) {
    return (
      <div className="flex min-h-dvh flex-col" style={{ backgroundColor: "#ffffff" }}>
        <div
          className="flex items-center justify-between"
          style={{
            paddingTop: "calc(env(safe-area-inset-top, 0px) + 4px)",
            paddingBottom: 8,
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <Skeleton width={40} height={40} borderRadius={20} />
          <Skeleton width={100} height={18} borderRadius={6} />
          <div style={{ width: 40, height: 40 }} />
        </div>
        <div
          className="animate-pulse"
          style={{
            marginLeft: 24,
            marginRight: 24,
            marginBottom: 24,
            marginTop: 8,
            height: 320,
            borderRadius: 16,
            backgroundColor: "#f5f5f5",
          }}
        />
        <div style={{ paddingLeft: 24, paddingRight: 24 }}>
          <Skeleton width="80%" height={26} borderRadius={6} />
          <div style={{ marginTop: 12 }}>
            <Skeleton width="40%" height={20} borderRadius={6} />
          </div>
          <div style={{ marginTop: 20 }}>
            <Skeleton width="100%" height={14} borderRadius={4} />
          </div>
          <div style={{ marginTop: 8 }}>
            <Skeleton width="90%" height={14} borderRadius={4} />
          </div>
          <div style={{ marginTop: 8 }}>
            <Skeleton width="60%" height={14} borderRadius={4} />
          </div>
          <div className="flex" style={{ marginTop: 24, gap: 8 }}>
            <Skeleton width={60} height={36} borderRadius={18} />
            <Skeleton width={60} height={36} borderRadius={18} />
            <Skeleton width={60} height={36} borderRadius={18} />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div
        className="flex flex-1 flex-col items-center justify-center"
        style={{ backgroundColor: "#ffffff", paddingLeft: 32, paddingRight: 32 }}
      >
        <p style={{ textAlign: "center", fontSize: 14, color: "#666666" }}>
          {error?.message || "Product not found."}
        </p>
        <button
          onClick={() => navigate(-1)}
          style={{ marginTop: 16, fontSize: 14, fontWeight: 600, color: "#d63384" }}
        >
          Go back
        </button>
      </div>
    );
  }

  const priceLabel =
    variantPrice !== null
      ? formatMmk(variantPrice)
      : null;

  const images = product.images ?? [];

  return (
    <div className="flex min-h-dvh flex-col" style={{ backgroundColor: "#ffffff" }}>
      <div
        className="mx-auto flex items-center justify-between w-full"
        style={{
          maxWidth: 1200,
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 4px)",
          paddingBottom: 8,
          paddingLeft: 16,
          paddingRight: 16,
          borderBottom: "1px solid #f3e8ee",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center"
          style={{ width: 40, height: 40 }}
          aria-label="Go back"
        >
          <ChevronLeft size={24} color="#000000" />
        </button>
        <p style={{ fontSize: 16, fontWeight: 600, color: "#000000" }}>
          Product Detail
        </p>
        <div style={{ width: 40, height: 40 }} />
      </div>

      <div className="mx-auto flex-1 overflow-y-auto w-full" style={{ maxWidth: 1200, paddingBottom: 120 }}>
        <div className="md:flex md:gap-8 md:px-6 md:pt-4">
          <div
            className="flex items-center justify-center md:flex-1 h-80 md:h-[480px]"
            style={{
              marginLeft: 20,
              marginRight: 20,
              marginTop: 16,
              marginBottom: 20,
              borderRadius: 16,
              backgroundColor: "#fafafa",
              overflow: "hidden",
            }}
          >
            <ImageCarousel
              images={images}
              thumbnail={product.thumbnail}
              alt={product.title}
            />
          </div>

          <div className="md:flex-1 md:pb-8" style={{ paddingLeft: 20, paddingRight: 20 }}>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#000000", lineHeight: 1.3 }}>
              {product.title}
            </p>

            {priceLabel ? (
              <p style={{ marginTop: 8, fontSize: 16, fontWeight: 600, color: "#d63384" }}>
                {priceLabel}
              </p>
            ) : (
              <p style={{ marginTop: 8, fontSize: 14, color: "#999999" }}>
                Price unavailable
              </p>
            )}

            {product.description && (
              <>
                <div
                  style={{
                    marginTop: 16,
                    marginBottom: 16,
                    borderTop: "1px solid #f3e8ee",
                  }}
                />
                <p style={{ fontSize: 14, lineHeight: "22px", color: "#666666" }}>
                  {product.description}
                </p>
              </>
            )}

            <div
              style={{
                marginTop: 20,
                borderTop: "1px solid #f3e8ee",
              }}
            />

            <VariantSelector
              product={product}
              selectedOptions={selectedOptions}
              onOptionSelect={handleOptionSelect}
            />
          </div>
        </div>
      </div>

      <div
        className="mx-auto w-full"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          maxWidth: 1200,
          borderTop: "1px solid #f3e8ee",
          backgroundColor: "#ffffff",
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)",
          paddingTop: 14,
          boxShadow: "0 -2px 10px rgba(0,0,0,0.04)",
        }}
      >
        <ChatOrderButtons
          product={product}
          selectedOptions={selectedOptions}
        />
      </div>
    </div>
  );
}
