import { useState, useMemo, useDeferredValue } from "react";
import { useSearchParams } from "react-router-dom";
import { CircleX, AlertTriangle, RefreshCw } from "lucide-react";
import { useProducts, useCategories } from "@/hooks/useProducts";
import TopAppBar from "@/components/TopAppBar";
import SearchBar from "@/components/SearchBar";
import FilterButton from "@/components/FilterButton";
import FilterModal, { SORT_OPTIONS, type SortOption } from "@/components/FilterModal";
import CategoryTabs from "@/components/CategoryTabs";
import ProductCard from "@/components/ProductCard";
import ProductGridSkeleton from "@/components/ProductGridSkeleton";

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory
  );
  const [selectedSort, setSelectedSort] = useState<SortOption>(SORT_OPTIONS[0]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const isSortActive = selectedSort.id !== "default";

  const debouncedQuery = useDeferredValue(searchInput.trim());
  const isQueryStale = searchInput.trim() !== debouncedQuery;

  const {
    data: productsData,
    isLoading,
    error,
    refetch,
  } = useProducts({
    categoryId: selectedCategory,
    q: debouncedQuery || undefined,
    order: selectedSort.order,
  });

  const { data: categoriesData } = useCategories();

  const products = productsData?.products ?? [];
  const categories = categoriesData?.product_categories ?? [];

  const sortedProducts = useMemo(() => {
    if (selectedSort.clientSort === "price_asc") {
      return [...products].sort((a, b) => {
        const pa = a.variants?.[0]?.calculated_price?.calculated_amount ?? 0;
        const pb = b.variants?.[0]?.calculated_price?.calculated_amount ?? 0;
        return pa - pb;
      });
    }
    if (selectedSort.clientSort === "price_desc") {
      return [...products].sort((a, b) => {
        const pa = a.variants?.[0]?.calculated_price?.calculated_amount ?? 0;
        const pb = b.variants?.[0]?.calculated_price?.calculated_amount ?? 0;
        return pb - pa;
      });
    }
    return products;
  }, [products, selectedSort.clientSort]);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    const newParams = new URLSearchParams();
    if (selectedCategory) newParams.set("category", selectedCategory);
    if (value.trim()) newParams.set("q", value.trim());
    setSearchParams(newParams, { replace: true });
  };

  const handleCategorySelect = (id: string | null) => {
    setSelectedCategory(id);
    const newParams = new URLSearchParams();
    if (id) newParams.set("category", id);
    if (searchInput.trim()) newParams.set("q", searchInput.trim());
    setSearchParams(newParams, { replace: true });
  };

  const handleSelectSort = (option: SortOption) => {
    setSelectedSort(option);
    setFilterModalVisible(false);
  };

  return (
    <div className="flex min-h-dvh flex-col" style={{ backgroundColor: "#ffffff" }}>
      <TopAppBar />

      <FilterModal
        visible={filterModalVisible}
        selectedId={selectedSort.id}
        onSelect={handleSelectSort}
        onClose={() => setFilterModalVisible(false)}
      />

      <div className="mx-auto w-full" style={{ maxWidth: 1200, paddingLeft: 20, paddingRight: 20 }}>
        <div
          className="flex items-center"
          style={{ marginBottom: 14, gap: 10 }}
        >
          <SearchBar
            value={searchInput}
            onChange={handleSearchChange}
          />
          <FilterButton
            isActive={isSortActive}
            onPress={() => setFilterModalVisible(true)}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <CategoryTabs
            categories={categories}
            selectedId={selectedCategory}
            onSelect={handleCategorySelect}
          />
        </div>

        {isSortActive ? (
          <div
            className="flex items-center"
            style={{
              marginBottom: 12,
              gap: 4,
              borderRadius: 9999,
              backgroundColor: "#fce7f3",
              paddingLeft: 12,
              paddingRight: 12,
              paddingTop: 4,
              paddingBottom: 4,
              width: "fit-content",
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "#d63384",
              }}
            >
              Sorted by: {selectedSort.label}
            </span>
            <button
              onClick={() => handleSelectSort(SORT_OPTIONS[0])}
              style={{ padding: 2 }}
            >
              <CircleX size={14} color="#d63384" />
            </button>
          </div>
        ) : null}
      </div>

      {isLoading ? (
        <ProductGridSkeleton />
      ) : error ? (
        <div
          className="flex flex-1 flex-col items-center justify-center"
          style={{ paddingLeft: 32, paddingRight: 32 }}
        >
          <AlertTriangle size={32} color="#d63384" style={{ marginBottom: 12 }} />
          <p
            style={{
              textAlign: "center",
              fontSize: 14,
              color: "#666666",
              marginBottom: 16,
              maxWidth: 280,
            }}
          >
            {error.message || "Failed to load products. Please try again."}
          </p>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2"
            style={{
              borderRadius: 9999,
              backgroundColor: "#fce7f3",
              color: "#d63384",
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
              paddingBottom: 10,
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      ) : sortedProducts.length > 0 ? (
        <div
          className="mx-auto flex-1 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          style={{
            maxWidth: 1200,
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 100,
            columnGap: 16,
            rowGap: 20,
            opacity: isQueryStale ? 0.6 : 1,
            transition: "opacity 0.15s",
          }}
        >
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div
          className="flex flex-1 items-center justify-center"
          style={{ paddingLeft: 32, paddingRight: 32 }}
        >
          <p style={{ textAlign: "center", fontSize: 14, color: "#666666" }}>
            {searchInput.trim()
              ? `No results for "${searchInput.trim()}"`
              : "No products found."}
          </p>
        </div>
      )}
    </div>
  );
}
