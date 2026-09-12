import { Search, CircleX } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "trending outfits",
}: SearchBarProps) {
  return (
    <div
      className="flex flex-1 items-center gap-2"
      style={{
        height: 48,
        borderRadius: 14,
        paddingLeft: 14,
        paddingRight: 14,
        backgroundColor: "#fdf2f8",
        border: "1px solid #fce7f3",
      }}
    >
      <Search size={18} color="#d63384" strokeWidth={2.2} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSubmit?.(value);
        }}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none"
        style={{
          fontSize: 14,
          color: "#000000",
          caretColor: "#d63384",
        }}
      />
      {value.length > 0 ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className="flex items-center justify-center"
          style={{ padding: 4 }}
          aria-label="Clear search"
        >
          <CircleX size={16} color="#d63384" />
        </button>
      ) : null}
    </div>
  );
}
