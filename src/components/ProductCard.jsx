import React from "react";
import { Link } from "react-router-dom";
import { Heart, Plus } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const isWishlisted = wishlist.includes(product.id);
  const secondaryImage = product.images[1] || product.images[0];

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[0], 1);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden bg-fog aspect-[3/4]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-smooth group-hover:scale-105 group-hover:opacity-0"
        />
        <img
          src={secondaryImage}
          alt={`${product.name} alternate view`}
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-500 ease-smooth group-hover:scale-105 group-hover:opacity-100"
        />

        {product.isNew && (
          <span className="absolute top-3 left-3 bg-ink text-cream text-[10px] uppercase tracking-wide px-2.5 py-1">
            New
          </span>
        )}

        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-cream/90 flex items-center justify-center hover:bg-cream transition-colors"
          aria-label="Toggle wishlist"
        >
          <Heart
            size={15}
            className={isWishlisted ? "fill-ink text-ink" : "text-ink"}
          />
        </button>

        {/* Quick Add — appears on hover */}
        <button
          onClick={handleQuickAdd}
          className="absolute left-3 right-3 bottom-3 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-smooth bg-ink text-cream text-xs uppercase tracking-wide py-3 flex items-center justify-center gap-1.5 hover:bg-charcoal"
        >
          <Plus size={14} />
          Quick Add
        </button>
      </div>

      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm text-ink font-medium leading-snug line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs text-stone mt-0.5">{product.category}</p>
        </div>
        <p className="text-sm text-ink font-medium whitespace-nowrap">
          ${product.price}
        </p>
      </div>
    </Link>
  );
}
