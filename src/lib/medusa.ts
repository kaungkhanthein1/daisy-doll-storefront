import type {
  MedusaProduct,
  MedusaRegion,
  ListProductsResponse,
  ListCategoriesResponse,
} from "@/types/medusa";

const BASE_URL = "";
const PUBLISHABLE_KEY =
  import.meta.env.VITE_MEDUSA_PUBLISHABLE_KEY ||
  "pk_4f49ee70d0ba748fbf79dd855c5e8c8574e20d7d6f9a7b4047ead3832236259c";

const headers = {
  "x-publishable-api-key": PUBLISHABLE_KEY,
  "Content-Type": "application/json",
};

const REQUEST_TIMEOUT = 90_000;

let cachedRegionId: string | null = null;

async function apiFetch(url: string, init?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
  try {
    const res = await fetch(url, { ...init, signal: controller.signal });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`API ${res.status}: ${text || res.statusText}`);
    }
    return res;
  } finally {
    clearTimeout(timer);
  }
}

export async function getRegion(): Promise<MedusaRegion> {
  if (cachedRegionId) {
    return { id: cachedRegionId } as MedusaRegion;
  }
  const res = await apiFetch(`${BASE_URL}/store/regions?limit=1`, { headers });
  const data = await res.json();
  const region = data.regions[0];
  if (region?.id) cachedRegionId = region.id;
  return region;
}

export async function listProducts(params: {
  region_id?: string;
  category_id?: string;
  q?: string;
  limit?: number;
  offset?: number;
  order?: string;
}): Promise<ListProductsResponse> {
  const searchParams = new URLSearchParams();
  if (params.region_id) searchParams.set("region_id", params.region_id);
  if (params.category_id) searchParams.set("category_id", params.category_id);
  if (params.q) searchParams.set("q", params.q);
  if (params.limit) searchParams.set("limit", String(params.limit));
  if (params.offset) searchParams.set("offset", String(params.offset));
  if (params.order) searchParams.set("order", params.order);

  searchParams.set(
    "fields",
    "+title,+handle,+thumbnail,+description,*variants,+variants.title,+variants.sku,+variants.calculated_price,+variants.inventory_quantity,*images,*categories"
  );

  const res = await apiFetch(
    `${BASE_URL}/store/products?${searchParams.toString()}`,
    { headers }
  );
  return res.json();
}

export async function getProductByHandle(
  handle: string
): Promise<MedusaProduct | null> {
  const searchParams = new URLSearchParams({
    handle,
    limit: "1",
    fields: "+title,+handle,+thumbnail,+description,*variants,+variants.title,+variants.sku,+variants.calculated_price,+variants.inventory_quantity,+variants.options,*options,+options.title,*options.values,*images,*categories",
  });

  const res = await apiFetch(
    `${BASE_URL}/store/products?${searchParams.toString()}`,
    { headers }
  );
  const data: ListProductsResponse = await res.json();
  return data.products[0] || null;
}

export async function listCategories(): Promise<ListCategoriesResponse> {
  const searchParams = new URLSearchParams({
    fields: "+id,+name,+handle,+description",
    limit: "50",
  });

  const res = await apiFetch(
    `${BASE_URL}/store/product-categories?${searchParams.toString()}`,
    { headers }
  );
  return res.json();
}

export function formatMmk(amount: number): string {
  return `${new Intl.NumberFormat("en-US").format(Math.round(amount))} MMK`;
}

export function getProductPrice(product: MedusaProduct): number | null {
  const variant = product.variants?.[0];
  return variant?.calculated_price?.calculated_amount ?? null;
}

export function getVariantPrice(
  product: MedusaProduct,
  variantId: string
): number | null {
  const variant = product.variants?.find((v) => v.id === variantId);
  return variant?.calculated_price?.calculated_amount ?? null;
}

export function isInStock(product: MedusaProduct): boolean {
  return product.variants?.some((v) => v.inventory_quantity > 0) ?? false;
}

export function getVariantStock(
  product: MedusaProduct,
  variantId: string
): number {
  const variant = product.variants?.find((v) => v.id === variantId);
  return variant?.inventory_quantity ?? 0;
}
