const VIBER_PA_URI = import.meta.env.VITE_VIBER_URI || "";
const TELEGRAM_USERNAME = import.meta.env.VITE_TELEGRAM_USERNAME || "";
const TIKTOK_USERNAME = import.meta.env.VITE_TIKTOK_USERNAME || "";

const isConfigured = (value: string) =>
  value.length > 0 && !value.startsWith("YOUR_");

export interface OrderMessageParams {
  productTitle: string;
  variantTitle: string;
  price: string;
  productUrl: string;
}

function buildOrderMessage(params: OrderMessageParams): string {
  return `Hello! I would like to order:
- Item: ${params.productTitle}
- Variant: ${params.variantTitle}
- Price: ${params.price}
- Link: ${params.productUrl}`;
}

export function generateTiktokOrderLink(_params: OrderMessageParams): string {
  if (isConfigured(TIKTOK_USERNAME)) {
    const username = TIKTOK_USERNAME.replace(/^@/, "");
    return `https://www.tiktok.com/@${username}`;
  }
  return `https://www.tiktok.com`;
}

export function getTiktokOrderMessage(params: OrderMessageParams): string {
  return buildOrderMessage(params);
}

export function generateViberOrderLink(params: OrderMessageParams): string {
  const message = buildOrderMessage(params);
  if (isConfigured(VIBER_PA_URI)) {
    return `viber://pa?chatURI=${VIBER_PA_URI}&text=${encodeURIComponent(message)}`;
  }
  return `viber://forward?text=${encodeURIComponent(message)}`;
}

export function generateTelegramOrderLink(params: OrderMessageParams): string {
  const message = buildOrderMessage(params);
  if (isConfigured(TELEGRAM_USERNAME)) {
    const username = TELEGRAM_USERNAME.replace(/^@/, "");
    return `https://t.me/${username}?text=${encodeURIComponent(message)}`;
  }
  return `https://t.me/share/url?text=${encodeURIComponent(message)}`;
}
