import { SlidersHorizontal } from "lucide-react";

interface FilterButtonProps {
  isActive: boolean;
  onPress: () => void;
}

export default function FilterButton({ isActive, onPress }: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onPress}
      className="flex items-center justify-center"
      style={{
        width: 48,
        height: 48,
        borderRadius: 14,
        flexShrink: 0,
        backgroundColor: isActive ? "#d63384" : "#fdf2f8",
        border: `1px solid ${isActive ? "#d63384" : "#fce7f3"}`,
      }}
      aria-label="Filter"
    >
      <SlidersHorizontal size={18} color={isActive ? "#ffffff" : "#d63384"} />
    </button>
  );
}
