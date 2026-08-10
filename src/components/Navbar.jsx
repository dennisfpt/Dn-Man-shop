import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingBag, Menu, X, User } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const NAV_LINKS = [
  { label: "New Arrivals", to: "/shop/New Arrivals" },
  { label: "Clothing", to: "/shop/Clothing" },
  { label: "Accessories", to: "/shop/Accessories" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const { cartCount, wishlist, openCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      setMobileOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold tracking-widest2 text-ink shrink-0"
          >
            DN&nbsp;MAN
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm uppercase tracking-wide text-charcoal hover:text-ink transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-ink transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Search bar (desktop) */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center flex-1 max-w-xs border-b border-ink/20 focus-within:border-ink transition-colors"
          >
            <Search size={16} className="text-stone mr-2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-stone"
            />
          </form>

          {/* Icons */}
          <div className="flex items-center gap-4 sm:gap-5 shrink-0">
            <Link
              to={isAuthenticated ? "/account" : "/login"}
              className="hidden sm:flex items-center gap-1.5 text-ink hover:opacity-70 transition-opacity"
              title={isAuthenticated ? user.fullName : "Sign In"}
            >
              <User size={22} />
              {isAuthenticated && (
                <span className="text-xs max-w-[80px] truncate">{user.fullName}</span>
              )}
            </Link>

            <Link to="/wishlist" className="relative text-ink hover:opacity-70 transition-opacity">
              <Heart size={22} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-ink text-cream text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button
              onClick={openCart}
              className="relative text-ink hover:opacity-70 transition-opacity"
              aria-label="Open cart"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-ink text-cream text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              className="lg:hidden text-ink"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-ink/10 bg-cream px-4 py-4 space-y-4">
          <form onSubmit={handleSearch} className="flex items-center border-b border-ink/20 pb-2">
            <Search size={16} className="text-stone mr-2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-stone"
            />
          </form>
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="text-sm uppercase tracking-wide text-charcoal py-1"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to={isAuthenticated ? "/account" : "/login"}
              onClick={() => setMobileOpen(false)}
              className="text-sm uppercase tracking-wide text-charcoal py-1 border-t border-ink/10 pt-3"
            >
              {isAuthenticated ? `My Account (${user.fullName})` : "Sign In / Register"}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
