import React, { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Heart, ChevronDown, Check } from "lucide-react";
import { getProductById, products } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
import ProductCard from "../components/ProductCard.jsx";

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-ink/10">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-sm font-medium uppercase tracking-wide">{title}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 pb-4" : "max-h-0"
        }`}
      >
        <p className="text-sm text-stone leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProductById(id);
  const { addToCart, wishlist, toggleWishlist } = useCart();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);

  if (!product) return <Navigate to="/shop" replace />;

  const isWishlisted = wishlist.includes(product.id);
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addToCart(product, selectedSize, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <p className="text-xs text-stone mb-8">
        <Link to="/shop" className="hover:text-ink">Shop</Link>
        {" / "}
        <Link to={`/shop/${product.category}`} className="hover:text-ink">
          {product.category}
        </Link>
        {" / "}
        <span className="text-ink">{product.name}</span>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery */}
        <div>
          <div className="aspect-[3/4] bg-fog overflow-hidden mb-3">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-3">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-20 h-24 overflow-hidden bg-fog shrink-0 border-2 transition-colors ${
                  activeImage === idx ? "border-ink" : "border-transparent"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="lg:sticky lg:top-24 self-start">
          {product.isNew && (
            <span className="inline-block bg-ink text-cream text-[10px] uppercase tracking-wide px-2.5 py-1 mb-4">
              New
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl font-semibold">{product.name}</h1>
          <p className="text-xl mt-2">${product.price}</p>

          <p className="text-sm text-stone mt-6 leading-relaxed">
            {product.description}
          </p>

          {/* Size selector */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs uppercase tracking-wide text-stone">
                Select Size
              </p>
              {sizeError && (
                <p className="text-xs text-red-600">Please select a size</p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeError(false);
                  }}
                  className={`w-12 h-12 text-sm border transition-colors ${
                    selectedSize === size
                      ? "bg-ink text-cream border-ink"
                      : "border-ink/20 text-charcoal hover:border-ink"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-8">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-ink text-cream py-4 text-sm uppercase tracking-wide font-medium hover:bg-charcoal transition-colors flex items-center justify-center gap-2"
            >
              {added ? (
                <>
                  <Check size={16} /> Added to Bag
                </>
              ) : (
                "Add to Cart"
              )}
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`w-14 flex items-center justify-center border transition-colors ${
                isWishlisted ? "border-ink bg-ink/5" : "border-ink/20 hover:border-ink"
              }`}
              aria-label="Toggle wishlist"
            >
              <Heart size={18} className={isWishlisted ? "fill-ink text-ink" : ""} />
            </button>
          </div>

          {/* Accordion */}
          <div className="mt-10">
            <Accordion title="Description" defaultOpen>
              {product.description}
            </Accordion>
            <Accordion title="Size & Fit">
              This piece fits true to size. If you're between sizes, we
              recommend sizing up for a more relaxed fit.
            </Accordion>
            <Accordion title="Shipping & Returns">
              Free standard shipping on all orders. Easy returns within 30
              days of delivery, provided items are unworn and tagged.
            </Accordion>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="text-2xl font-semibold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
