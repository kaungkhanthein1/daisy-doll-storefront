import type {
  MedusaProduct,
  MedusaProductOption,
  MedusaProductOptionValue,
  MedusaProductVariant,
} from "@/types/medusa";

interface VariantSelectorProps {
  product: MedusaProduct;
  selectedOptions: Record<string, string>;
  onOptionSelect: (optionId: string, valueId: string) => void;
  showStock?: boolean;
}

export default function VariantSelector({
  product,
  selectedOptions,
  onOptionSelect,
  showStock = false,
}: VariantSelectorProps) {
  if (!product.options || product.options.length === 0) return null;

  return (
    <div style={{ marginTop: 24 }}>
      {product.options.map((option: MedusaProductOption, index) => (
        <div
          key={option.id}
          style={{ marginTop: index > 0 ? 20 : 0 }}
        >
          <p
            style={{
              marginBottom: 10,
              fontSize: 14,
              fontWeight: 600,
              color: "#000000",
              letterSpacing: 0.2,
            }}
          >
            {option.title}
          </p>
          <div className="flex flex-wrap" style={{ gap: 10 }}>
            {option.values.map((val: MedusaProductOptionValue) => {
              const isSelected = selectedOptions[option.id] === val.id;

              return (
                <button
                  key={val.id}
                  onClick={() => onOptionSelect(option.id, val.id)}
                  style={{
                    borderRadius: 9999,
                    border: `1.5px solid ${
                      isSelected ? "#d63384" : "#cccccc"
                    }`,
                    backgroundColor: isSelected ? "#fdf2f8" : "#f9f9f9",
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingTop: 10,
                    paddingBottom: 10,
                    fontSize: 13,
                    fontWeight: isSelected ? 600 : 500,
                    color: isSelected ? "#d63384" : "#333333",
                    transition: "all 0.15s ease",
                    boxShadow: isSelected
                      ? "0 0 0 1px #d6338420"
                      : "none",
                  }}
                >
                  {val.value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export function resolveSelectedVariant(
  product: MedusaProduct,
  selectedOptions: Record<string, string>
): MedusaProductVariant | undefined {
  const optionIds = product.options?.map((o) => o.id) ?? [];
  const allSelected = optionIds.every((id) => selectedOptions[id]);

  if (!allSelected) return product.variants?.[0];

  return (
    product.variants?.find((variant) =>
      optionIds.every((optionId) => {
        const selectedValueId = selectedOptions[optionId];
        return variant.options?.some(
          (opt) =>
            opt.option_id === optionId && opt.value_id === selectedValueId
        );
      })
    ) ?? product.variants?.[0]
  );
}
