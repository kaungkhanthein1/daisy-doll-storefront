import { useState } from "react";
import { Send, Phone, Check } from "lucide-react";
import {
  generateTiktokOrderLink,
  generateViberOrderLink,
  generateTelegramOrderLink,
  getTiktokOrderMessage,
} from "@/utils/messenger";
import { formatMmk } from "@/lib/medusa";
import type { MedusaProduct } from "@/types/medusa";
import { resolveSelectedVariant } from "@/components/VariantSelector";

function TikTokIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.43V13.2a8.19 8.19 0 005.58 2.17v-3.45a4.85 4.85 0 01-5.58-2.76V6.69h5.58z" />
    </svg>
  );
}

interface ChatOrderButtonsProps {
  product: MedusaProduct;
  selectedOptions: Record<string, string>;
}

export default function ChatOrderButtons({
  product,
  selectedOptions,
}: ChatOrderButtonsProps) {
  const [copied, setCopied] = useState(false);

  const selectedVariant = resolveSelectedVariant(product, selectedOptions);
  const variantPrice = selectedVariant
    ? product.variants?.find((v) => v.id === selectedVariant.id)
        ?.calculated_price?.calculated_amount ?? null
    : null;

  const orderParams = {
    productTitle: product.title,
    variantTitle: selectedVariant?.title ?? "N/A",
    price:
      variantPrice !== null ? formatMmk(variantPrice) : "Price unavailable",
    productUrl: window.location.href,
  };

  const openLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleTiktok = () => {
    const msg = getTiktokOrderMessage(orderParams);
    navigator.clipboard.writeText(msg).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        openLink(generateTiktokOrderLink(orderParams));
      }, 2000);
    }).catch(() => {
      openLink(generateTiktokOrderLink(orderParams));
    });
  };

  const platforms = [
    {
      key: "tiktok",
      label: "TikTok",
      icon: TikTokIcon,
      color: "#000000",
      shadow: "0 4px 20px rgba(0,0,0,0.25)",
      onClick: handleTiktok,
    },
    {
      key: "viber",
      label: "Viber",
      icon: Phone,
      color: "#7360F2",
      shadow: "0 4px 20px rgba(115,96,242,0.35)",
      onClick: () => openLink(generateViberOrderLink(orderParams)),
    },
    {
      key: "telegram",
      label: "Telegram",
      icon: Send,
      color: "#229ED9",
      shadow: "0 4px 20px rgba(34,158,217,0.35)",
      onClick: () => openLink(generateTelegramOrderLink(orderParams)),
    },
  ];

  return (
    <div style={{ position: "relative" }}>
      {copied && (
        <div
          style={{
            position: "fixed",
            bottom: 100,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#000000",
            color: "#ffffff",
            fontSize: 13,
            fontWeight: 500,
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 12,
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            gap: 6,
            boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
            zIndex: 100,
            animation: "fadeIn 0.2s ease",
          }}
        >
          <Check size={14} />
          Order message copied — please paste in TikTok chat to complete your order.  
        </div>
      )}
      <p
        style={{
          marginBottom: 12,
          textAlign: "center",
          fontSize: 13,
          fontWeight: 500,
          color: "#999999",
          letterSpacing: 0.3,
        }}
      >
        Order via chat
      </p>
      <div className="flex" style={{ gap: 10 }}>
        {platforms.map(({ key, label, icon: Icon, color, shadow, onClick }) => (
          <button
            key={key}
            onClick={onClick}
            className="flex flex-1 items-center justify-center"
            style={{
              background: key === "tiktok"
                ? "linear-gradient(145deg, #000000, #333333)"
                : `linear-gradient(145deg, ${color}, ${color}cc)`,
              borderRadius: 14,
              paddingTop: 13,
              paddingBottom: 13,
              fontSize: 13,
              fontWeight: 700,
              color: "#ffffff",
              boxShadow: shadow,
              border: "1px solid rgba(255,255,255,0.15)",
              gap: 7,
              letterSpacing: 0.2,
              textShadow: "0 1px 2px rgba(0,0,0,0.15)",
            }}
          >
            <Icon size={17} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
