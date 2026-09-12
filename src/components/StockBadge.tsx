interface StockBadgeProps {
  inStock: boolean;
}

export default function StockBadge({ inStock }: StockBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${
        inStock
          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 backdrop-blur-md"
          : "border-red-200 bg-red-50 text-red-700"
      }`}
    >
      {inStock ? "In Stock" : "Sold Out"}
    </span>
  );
}
