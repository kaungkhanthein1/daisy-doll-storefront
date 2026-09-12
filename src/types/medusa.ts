export interface MedusaProduct {
  id: string;
  title: string;
  handle: string;
  description: string | null;
  thumbnail: string | null;
  images: MedusaProductImage[];
  variants: MedusaProductVariant[];
  options: MedusaProductOption[];
  categories: MedusaProductCategory[];
}

export interface MedusaProductImage {
  id: string;
  url: string;
  rank: number;
}

export interface MedusaProductVariant {
  id: string;
  title: string;
  sku: string | null;
  inventory_quantity: number;
  options: MedusaProductVariantOption[];
  calculated_price: {
    calculated_amount: number;
    currency_code: string;
  } | null;
}

export interface MedusaProductVariantOption {
  option_id: string;
  option_value: string;
  value_id: string;
}

export interface MedusaProductOption {
  id: string;
  title: string;
  values: MedusaProductOptionValue[];
}

export interface MedusaProductOptionValue {
  id: string;
  value: string;
}

export interface MedusaProductCategory {
  id: string;
  name: string;
  handle: string;
  description: string | null;
}

export interface MedusaRegion {
  id: string;
  name: string;
  currency_code: string;
}

export interface ListProductsResponse {
  products: MedusaProduct[];
  count: number;
  limit: number;
  offset: number;
}

export interface ListCategoriesResponse {
  product_categories: MedusaProductCategory[];
  count: number;
}
