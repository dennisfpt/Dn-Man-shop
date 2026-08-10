import React from "react";
import { Link } from "react-router-dom";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";

export default function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    updateQuantity,
    removeFromCart,
    subtotal,
  } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-ink/40 z-50 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-cream z-50 shadow-2xl transition-transform duration-300 ease-smooth flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-ink/10">
          <h2 className="text-sm uppercase tracking-widest2 font-medium">
            Your Bag ({cartItems.reduce((s, i) => s + i.qty, 0)})
          </h2>
          <button onClick={closeCart} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <ShoppingBag size={36} className="text-stone mb-4" />
            <p className="text-stone text-sm">Your bag is empty.</p>
            <Link
              to="/shop"
              onClick={closeCart}
              className="mt-5 text-xs uppercase tracking-wide border-b border-ink pb-0.5"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover bg-fog shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium leading-snug">{item.name}</p>
                        <p className="text-xs text-stone mt-1">Size: {item.size}</p>
                      </div>
                      <p className="text-sm font-medium whitespace-nowrap">
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-ink/15">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.qty - 1)
                          }
                          className="w-7 h-7 flex items-center justify-center hover:bg-ink/5"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-7 text-center text-xs">{item.qty}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.qty + 1)
                          }
                          className="w-7 h-7 flex items-center justify-center hover:bg-ink/5"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-stone hover:text-ink transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border-t border-ink/10 px-6 py-5 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-stone">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-stone">
                Shipping and taxes calculated at checkout.
              </p>
              <Link
                to="/checkout"
                onClick={closeCart}
                className="block text-center w-full bg-ink text-cream py-3.5 text-sm uppercase tracking-wide font-medium hover:bg-charcoal transition-colors"
              >
                Checkout
              </Link>
              <Link
                to="/shop"
                onClick={closeCart}
                className="block text-center text-xs uppercase tracking-wide text-stone hover:text-ink transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
