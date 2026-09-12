const MESSENGER_PAGE_ID =
  import.meta.env.VITE_MESSENGER_PAGE_ID || "YOUR_PAGE_ID";
const VIBER_PA_URI = import.meta.env.VITE_VIBER_URI || "";
const TELEGRAM_USERNAME = import.meta.env.VITE_TELEGRAM_USERNAME || "";

// Placeholder env values haven't been replaced with real account info yet.
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

export function generateMessengerOrderLink(params: OrderMessageParams): string {
  const message = buildOrderMessage(params);
  return `https://m.me/${MESSENGER_PAGE_ID}?text=${encodeURIComponent(message)}`;
}

export function generateViberOrderLink(params: OrderMessageParams): string {
  const message = buildOrderMessage(params);
  // Requires a Viber Public Account URI (set VITE_VIBER_URI).
  // Falls back to Viber's share sheet so the user can pick the shop's chat manually.
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
