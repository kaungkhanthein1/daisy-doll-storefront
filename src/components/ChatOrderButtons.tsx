import { MessageCircle, Send, Phone } from "lucide-react";
import {
  generateMessengerOrderLink,
  generateViberOrderLink,
  generateTelegramOrderLink,
} from "@/utils/messenger";
import { formatMmk } from "@/lib/medusa";
import type { MedusaProduct } from "@/types/medusa";
import { resolveSelectedVariant } from "@/components/VariantSelector";

interface ChatOrderButtonsProps {
  product: MedusaProduct;
  selectedOptions: Record<string, string>;
}

export default function ChatOrderButtons({
  product,
  selectedOptions,
}: ChatOrderButtonsProps) {
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

  const platforms = [
    {
      key: "messenger",
      label: "Messenger",
      icon: MessageCircle,
      color: "#0084FF",
      shadow: "0 4px 20px rgba(0,132,255,0.35)",
      onClick: () => openLink(generateMessengerOrderLink(orderParams)),
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
    <div>
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
              background: `linear-gradient(145deg, ${color}, ${color}cc)`,
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
            <Icon size={17} strokeWidth={2.3} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
