import React from "react";
import { CATEGORIES, SIZES } from "../data/products.js";

export default function FilterSidebar({ filters, setFilters }) {
  const toggleCategory = (cat) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }));
  };

  const toggleSize = (size) => {
    setFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const clearAll = () =>
    setFilters({ categories: [], sizes: [], maxPrice: 250 });

  return (
    <aside className="w-full lg:w-56 shrink-0 space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-sm uppercase tracking-widest2 font-medium">Filters</h3>
        <button
          onClick={clearAll}
          className="text-xs text-stone hover:text-ink underline underline-offset-2"
        >
          Clear
        </button>
      </div>

      {/* Category */}
      <div>
        <p className="text-xs uppercase tracking-wide text-stone mb-3">Category</p>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2 text-sm text-charcoal cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="accent-ink w-3.5 h-3.5"
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <p className="text-xs uppercase tracking-wide text-stone mb-3">
          Max Price: ${filters.maxPrice}
        </p>
        <input
          type="range"
          min={20}
          max={250}
          step={5}
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))
          }
          className="w-full accent-ink"
        />
      </div>

      {/* Size */}
      <div>
        <p className="text-xs uppercase tracking-wide text-stone mb-3">Size</p>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => {
            const active = filters.sizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`w-10 h-10 text-xs border transition-colors ${
                  active
                    ? "bg-ink text-cream border-ink"
                    : "border-ink/20 text-charcoal hover:border-ink"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
