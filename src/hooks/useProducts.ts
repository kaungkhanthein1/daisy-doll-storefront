import { useQuery } from "@tanstack/react-query";
import {
  listProducts,
  listCategories,
  getRegion,
  getProductByHandle,
} from "@/lib/medusa";

export function useProducts(params: {
  categoryId?: string | null;
  q?: string;
  order?: string;
  limit?: number;
}) {
  return useQuery({
    queryKey: [
      "products",
      params.categoryId ?? "all",
      params.q ?? "",
      params.order ?? "default",
      params.limit ?? 20,
    ],
    queryFn: async () => {
      const region = await getRegion();
      return listProducts({
        region_id: region.id,
        category_id: params.categoryId ?? undefined,
        q: params.q || undefined,
        limit: params.limit ?? 20,
        order: params.order,
      });
    },
  });
}

export function useProductByHandle(handle: string) {
  return useQuery({
    queryKey: ["product", "handle", handle],
    queryFn: () => getProductByHandle(handle),
    enabled: handle.length > 0,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: listCategories,
  });
}
