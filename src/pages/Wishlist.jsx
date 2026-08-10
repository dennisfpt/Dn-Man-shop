import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import { products } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Wishlist() {
  const { wishlist } = useCart();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-8">Your Wishlist</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Heart size={36} className="text-stone mb-4" />
          <p className="text-stone text-sm">Your wishlist is empty.</p>
          <Link
            to="/shop"
            className="mt-5 text-xs uppercase tracking-wide border-b border-ink pb-0.5"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
