import type { MedusaProductCategory } from "@/types/medusa";

interface CategoryTabsProps {
  categories: MedusaProductCategory[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export default function CategoryTabs({
  categories,
  selectedId,
  onSelect,
}: CategoryTabsProps) {
  const allCategories = [{ id: "", name: "All" }, ...categories];

  return (
    <div
      className="no-scrollbar flex items-center overflow-x-auto overflow-y-hidden"
      style={{ gap: 8, paddingBottom: 2 }}
    >
      {allCategories.map((cat) => {
        const isSelected =
          cat.id === selectedId ||
          (cat.id === "" && selectedId === null);
        return (
          <button
            key={cat.id || "all"}
            type="button"
            onClick={() => onSelect(cat.id || null)}
            className="shrink-0 whitespace-nowrap"
            style={{
              borderRadius: 9999,
              paddingLeft: 16,
              paddingRight: 16,
              paddingTop: 8,
              paddingBottom: 8,
              fontSize: 13,
              fontWeight: isSelected ? 600 : 400,
              backgroundColor: isSelected ? "#d63384" : "#fdf2f8",
              color: isSelected ? "#ffffff" : "#666666",
              border: `1px solid ${isSelected ? "#d63384" : "#fce7f3"}`,
              transition: "all 0.15s ease",
            }}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
