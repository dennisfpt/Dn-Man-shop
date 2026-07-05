import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <footer className="bg-ink text-cream mt-24">
      {/* Newsletter */}
      <div className="border-b border-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center text-center">
          <h3 className="text-2xl sm:text-3xl font-semibold">Stay in the loop</h3>
          <p className="text-cream/60 mt-3 max-w-md text-sm">
            Sign up for early access to new arrivals, exclusive drops, and
            member-only offers.
          </p>
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex w-full max-w-md border-b border-cream/30 focus-within:border-cream transition-colors"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-cream/40"
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 text-xs uppercase tracking-wide shrink-0 hover:opacity-70 transition-opacity"
            >
              Subscribe <ArrowRight size={14} />
            </button>
          </form>
          {submitted && (
            <p className="text-xs text-cream/60 mt-3">
              Thanks — you're on the list.
            </p>
          )}
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div>
          <h4 className="text-xl font-bold tracking-widest2 mb-4">DN MAN</h4>
          <p className="text-cream/50 text-sm max-w-xs">
            Minimal, considered menswear designed in-house for everyday wear.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-cream/40 mb-4">Shop</p>
          <ul className="space-y-2 text-sm text-cream/70">
            <li><Link to="/shop/New Arrivals" className="hover:text-cream transition-colors">New Arrivals</Link></li>
            <li><Link to="/shop/Clothing" className="hover:text-cream transition-colors">Clothing</Link></li>
            <li><Link to="/shop/Accessories" className="hover:text-cream transition-colors">Accessories</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-cream/40 mb-4">Help</p>
          <ul className="space-y-2 text-sm text-cream/70">
            <li>Shipping & Returns</li>
            <li>Size Guide</li>
            <li><Link to="/contact" className="hover:text-cream transition-colors">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-cream/40 mb-4">Company</p>
          <ul className="space-y-2 text-sm text-cream/70">
            <li>About</li>
            <li>Sustainability</li>
            <li>Careers</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 py-6 text-center text-xs text-cream/40">
        © {new Date().getFullYear()} Dn Man. All rights reserved.
      </div>
    </footer>
  );
}
