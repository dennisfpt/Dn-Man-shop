import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

// A cart "line" is uniquely identified by product id + size combo
const lineKey = (id, size) => `${id}__${size}`;

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]); // { id, name, price, image, size, qty }
  const [wishlist, setWishlist] = useState([]); // array of product ids
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product, size = product.sizes?.[0], qty = 1) => {
    setCartItems((prev) => {
      const key = lineKey(product.id, size);
      const existing = prev.find((item) => lineKey(item.id, item.size) === key);
      if (existing) {
        return prev.map((item) =>
          lineKey(item.id, item.size) === key
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images?.[0],
          size,
          qty,
        },
      ];
    });
    openCart();
  };

  const removeFromCart = (id, size) => {
    setCartItems((prev) =>
      prev.filter((item) => lineKey(item.id, item.size) !== lineKey(id, size))
    );
  };

  const updateQuantity = (id, size, qty) => {
    if (qty < 1) {
      removeFromCart(id, size);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        lineKey(item.id, item.size) === lineKey(id, size)
          ? { ...item, qty }
          : item
      )
    );
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.qty, 0),
    [cartItems]
  );

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.qty * item.price, 0),
    [cartItems]
  );

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    subtotal,
    isCartOpen,
    openCart,
    closeCart,
    wishlist,
    toggleWishlist,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
