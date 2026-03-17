"use client";

interface TagChipsProps {
  tags: string[];
  selectedTag?: string;
  onTagClick?: (tag: string) => void;
}

export default function TagChips({ tags, selectedTag, onTagClick }: TagChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isSelected = selectedTag === tag || (selectedTag === undefined && tag === "All");

        return (
          <button
            key={tag}
            onClick={() => onTagClick?.(tag)}
            aria-pressed={isSelected}
            className={`rounded-md border px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-purple focus:ring-offset-2 focus:ring-offset-space min-h-[40px] ${
              isSelected
                ? "border-accent-purple/60 bg-accent-purple/10 text-accent-purple"
                : "border-border bg-surface text-text-muted hover:border-border/80 hover:text-text"
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
