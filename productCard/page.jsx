"use client";
import { useState } from "react";
import { Heart, Plus, Minus } from "lucide-react";
import { useCart } from "@/app/useCart/page";

export default function ProductCard({ product }) {
  // <-- product prop required
  if (!product) return null; // Safety check to prevent crash

  const { user, addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [wishlist, setWishlist] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = JSON.parse(localStorage.getItem("dvago_wishlist") || "[]");
      return saved.includes(product.id); // This line crashes if product is undefined
    }
    return false;
  });

  // ... rest of mine code
}
