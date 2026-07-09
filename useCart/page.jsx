"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useCart() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadData = () => {
      if (typeof window !== "undefined") {
        setUser(JSON.parse(localStorage.getItem("dvago_user") || "null"));
        setCart(JSON.parse(localStorage.getItem("dvago_cart") || "[]"));
      }
    };
    loadData();
    window.addEventListener("storage", loadData);
    return () => window.removeEventListener("storage", loadData);
  }, []);

  const saveCart = (newCart) => {
    localStorage.setItem("dvago_cart", JSON.stringify(newCart));
    setCart(newCart);
    window.dispatchEvent(new Event("storage"));
  };

  const addToCart = (product, qty = 1) => {
    if (!user?.loggedIn) {
      localStorage.setItem("redirect_after_login", window.location.pathname);
      localStorage.setItem(
        "pending_cart_item",
        JSON.stringify({
          ...product,
          price: Number(product.price) || 0, // FORCE NUMBER
          quantity: qty,
        }),
      );
      router.push("/login");
      return;
    }

    // FORCE PRICE TO BE NUMBER
    const productWithNumber = {
      ...product,
      price: Number(product.price) || 0,
      quantity: Number(qty) || 1,
    };

    const existing = cart.find((item) => item.id === product.id);
    const newCart = existing
      ? cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item,
        )
      : [...cart, productWithNumber];

    saveCart(newCart);
    router.push("/cart");
  };

  const updateQty = (id, qty) => {
    if (qty < 1) {
      removeItem(id);
      return;
    }
    saveCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: Number(qty) } : item,
      ),
    );
  };

  const removeItem = (id) => {
    saveCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => saveCart([]);

  const cartCount = cart.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0,
  );
  const cartTotal = cart.reduce(
    (sum, item) =>
      sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0,
  );

  return {
    cart,
    user,
    cartCount,
    cartTotal,
    addToCart,
    updateQty,
    removeItem,
    clearCart,
  };
}
