import { Check } from "lucide-react";

export type SortOption = {
  id: string;
  order: string | undefined;
  label: string;
  clientSort?: "price_asc" | "price_desc";
};

export const SORT_OPTIONS: SortOption[] = [
  { id: "default", order: undefined, label: "Default" },
  { id: "price_asc", order: undefined, label: "Price: Low to High", clientSort: "price_asc" },
  { id: "price_desc", order: undefined, label: "Price: High to Low", clientSort: "price_desc" },
  { id: "az", order: "title", label: "Alphabetical: A-Z" },
  { id: "za", order: "-title", label: "Alphabetical: Z-A" },
];

interface FilterModalProps {
  visible: boolean;
  selectedId: string;
  onSelect: (option: SortOption) => void;
  onClose: () => void;
}

export default function FilterModal({
  visible,
  selectedId,
  onSelect,
  onClose,
}: FilterModalProps) {
  if (!visible) return null;

  const priceOptions = SORT_OPTIONS.filter((o) => o.id.startsWith("price"));
  const alphaOptions = SORT_OPTIONS.filter((o) => o.id === "az" || o.id === "za");
  const defaultOption = SORT_OPTIONS.find((o) => o.id === "default")!;

  return (
    <div
      className="flex items-end md:items-center justify-center"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
        onClick={onClose}
      />

      <div
        className="w-full md:max-w-md"
        style={{
          position: "relative",
          maxWidth: 512,
          backgroundColor: "#fdf2f8",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingBottom: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 12,
            paddingBottom: 16,
          }}
        >
          <div
            style={{
              width: 40,
              height: 4,
              borderRadius: 2,
              backgroundColor: "#f3e8ee",
            }}
          />
        </div>

        <div style={{ paddingLeft: 20, paddingRight: 20 }}>
          <p
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#000000",
              marginBottom: 16,
            }}
          >
            Sort by
          </p>

          <p
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#666666",
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Price
          </p>
          {priceOptions.map((option) => (
            <SortRow
              key={option.id}
              label={option.label}
              isSelected={selectedId === option.id}
              onSelect={() => onSelect(option)}
            />
          ))}

          <p
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#666666",
              marginTop: 16,
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Alphabetical
          </p>
          {alphaOptions.map((option) => (
            <SortRow
              key={option.id}
              label={option.label}
              isSelected={selectedId === option.id}
              onSelect={() => onSelect(option)}
            />
          ))}

          <div
            style={{
              marginTop: 16,
              borderTop: "1px solid #f3e8ee",
              paddingTop: 16,
            }}
          >
            <SortRow
              label={defaultOption.label}
              isSelected={selectedId === defaultOption.id}
              onSelect={() => onSelect(defaultOption)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SortRow({
  label,
  isSelected,
  onSelect,
}: {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingTop: 14,
        paddingBottom: 14,
        borderBottom: "1px solid #f3e8ee",
        fontSize: 15,
        fontWeight: isSelected ? 600 : 400,
        color: isSelected ? "#d63384" : "#000000",
        textAlign: "left",
      }}
    >
      {label}
      {isSelected && <Check size={18} color="#d63384" />}
    </button>
  );
}
