import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-[85vh] min-h-[520px] w-full overflow-hidden bg-ink">
      <img
        src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=1600&q=80"
        alt="Dn Man collection"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-end px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <p className="text-cream/70 text-xs sm:text-sm uppercase tracking-widest2 mb-4">
          Fall / Winter Collection
        </p>
        <h1 className="text-cream text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] max-w-2xl">
          Tailored for the
          <br />
          modern man.
        </h1>
        <p className="text-cream/80 max-w-md mt-5 text-sm sm:text-base">
          Considered essentials, cut from premium fabrics. Minimal by design,
          built to last a lifetime.
        </p>
        <Link
          to="/shop"
          className="group inline-flex items-center gap-2 mt-8 w-fit bg-cream text-ink px-8 py-3.5 text-sm uppercase tracking-wide font-medium hover:bg-cream/90 transition-colors"
        >
          Shop Now
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
}
