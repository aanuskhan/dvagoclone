"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProductActions({ product }) {
  const [inCart, setInCart] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Use the same keys as your working code
    const cart = JSON.parse(localStorage.getItem("dvago_cart") || "[]");
    const favs = JSON.parse(localStorage.getItem("dvago_wishlist") || "[]");

    setInCart(cart.some((item) => item.slug === product.slug));
    setIsFav(favs.includes(product.id));
  }, [product.slug, product.id]);

  const addToCart = () => {
    if (typeof window === "undefined") return;

    const savedUser = localStorage.getItem("dvago_user");
    const user = savedUser ? JSON.parse(savedUser) : null;

    // Same logic as TopSellingVitamins
    if (!user?.loggedIn) {
      localStorage.setItem("redirect_after_login", window.location.pathname);
      localStorage.setItem("pending_cart_item", JSON.stringify(product));
      router.push("/register");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("dvago_cart") || "[]");
    const exists = cart.find((item) => item.slug === product.slug);

    if (!exists) {
      cart.push({
        slug: product.slug,
        id: product.id,
        name: product.product_heading_title,
        title: product.product_heading_title,
        price: product.price_rs,
        price_rs: product.price_rs,
        image: product.product_image_url,
        product_image_url: product.product_image_url,
        qty: 1,
      });
      localStorage.setItem("dvago_cart", JSON.stringify(cart));
      setInCart(true);
      alert(`${product.product_heading_title} added to cart successfully!`);
    }
    router.push("/cart");
  };

  const toggleFavorite = () => {
    if (typeof window === "undefined") return;

    const savedUser = localStorage.getItem("dvago_user");
    const user = savedUser ? JSON.parse(savedUser) : null;

    if (!user?.loggedIn) {
      router.push("/register");
      return;
    }

    const favs = JSON.parse(localStorage.getItem("dvago_wishlist") || "[]");
    const exists = favs.includes(product.id);

    let updated;
    if (exists) {
      updated = favs.filter((id) => id !== product.id);
      setIsFav(false);
    } else {
      updated = [...favs, product.id];
      setIsFav(true);
    }

    localStorage.setItem("dvago_wishlist", JSON.stringify(updated));
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={addToCart}
        className={`px-6 py-3 rounded-md w-full md:w-auto ${
          inCart
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 text-white"
        }`}
        disabled={inCart}
      >
        {inCart ? "ADDED TO CART" : "ADD TO CART"}
      </button>

      <button
        onClick={toggleFavorite}
        className={`px-4 py-3 rounded-md border ${
          isFav
            ? "bg-red-50 border-red-300 text-red-600"
            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
        }`}
      >
        {isFav ? "♥" : "♡"} Favorite
      </button>
    </div>
  );
}
