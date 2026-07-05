import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { products } from "../data/products.js";

const COLLECTIONS = [
  {
    title: "Outerwear",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    to: "/shop/Clothing",
  },
  {
    title: "Essentials",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    to: "/shop/Clothing",
  },
  {
    title: "Accessories",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    to: "/shop/Accessories",
  },
];

export default function Home() {
  const featured = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <div>
      <Hero />

      {/* Featured Collections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Featured Collections
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {COLLECTIONS.map((col) => (
            <Link
              key={col.title}
              to={col.to}
              className="group relative overflow-hidden aspect-[4/5] bg-fog"
            >
              <img
                src={col.image}
                alt={col.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <p className="text-cream text-lg font-semibold">{col.title}</p>
                <span className="text-cream/80 text-xs uppercase tracking-wide border-b border-cream/50 mt-1 inline-block">
                  Shop Now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold">New Arrivals</h2>
          <Link
            to="/shop/New Arrivals"
            className="text-xs uppercase tracking-wide border-b border-ink pb-0.5 hover:opacity-70"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand statement banner */}
      <section className="bg-charcoal text-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-xs uppercase tracking-widest2 text-cream/50 mb-4">
            Our Philosophy
          </p>
          <h2 className="text-2xl sm:text-4xl font-semibold leading-snug">
            Fewer, better things — made from premium materials, designed to
            outlast trends.
          </h2>
        </div>
      </section>
    </div>
  );
}
