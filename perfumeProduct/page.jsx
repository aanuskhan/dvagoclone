"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart, ChevronRight } from "lucide-react";
import Link from "next/link";
import Nav from "../header/page";
import DvagoFooter from "../footer/page";
import { supabase } from "@/app/adminSupabse/page"; // added

export default function PerfumeDeals() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("perfume");
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]); // changed: start empty
  const [loading, setLoading] = useState(true); // added

  useEffect(() => {
    const savedUser = localStorage.getItem("dvago_user");
    const savedWishlist = localStorage.getItem("dvago_wishlist");
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

    fetchPerfumeProducts(); // added
  }, []);

  // added: fetch products from Supabase where category is Medicine
  async function fetchPerfumeProducts() {
    setLoading(true);
    const { data, error } = await supabase
      .from("product")
      .select("*")
      .contains("store_categories", ["perfume"])
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      setProducts([]);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  }
  const categories = [
    "Bonanza code Green",
    "Bonanza No.7",
    "Bonanza Addiction",
    "...",
  ];
  const handleAddToCart = (product) => {
    if (!user?.loggedIn) {
      localStorage.setItem("redirect_after_login", "/perfume");
      localStorage.setItem("pending_cart_item", JSON.stringify(product));
      router.push("/register");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("dvago_cart") || "[]");
    cart.push(product);
    localStorage.setItem("dvago_cart", JSON.stringify(cart));
    alert(`${product.product_heading_title} added to cart!`);
  };

  const toggleWishlist = (productId) => {
    const newWishlist = wishlist.includes(productId)
      ? wishlist.filter((id) => id !== productId)
      : [...wishlist, productId];
    setWishlist(newWishlist);
    localStorage.setItem("dvago_wishlist", JSON.stringify(newWishlist));
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="max-w-screen-xl mx-auto px-4 py-6">
          {/* PAGE TITLE */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-6 bg-[#76bc21]"></div>
            <h1 className="text-2xl font-semibold text-gray-700">Top Deals</h1>
          </div>

          {/* CATEGORY TABS */}
          <div className="flex gap-3 overflow-x-auto pb-4 mb-8 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                  activeTab === cat
                    ? "bg-[#76bc21] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* PRODUCT GRID */}
          {loading ? (
            <p className="text-center py-10">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-center py-10 text-gray-500">
              No products found in Others
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border-gray-200 rounded-lg p-3 hover:shadow-lg transition group"
                >
                  {/* WISHLIST HEART */}
                  <div className="flex justify-end mb-2">
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="text-gray-300 hover:text-red-500 transition"
                    >
                      <Heart
                        size={20}
                        className={
                          wishlist.includes(product.id)
                            ? "fill-red-500 text-red-500"
                            : ""
                        }
                      />
                    </button>
                  </div>

                  {/* PRODUCT IMAGE */}
                  <div
                    onClick={() => router.push(`/anus/${product.slug}`)}
                    className="aspect-square mb-3 flex items-center justify-center bg-gray-50 rounded"
                  >
                    <img
                      src={product.product_image_url} // fixed field name
                      alt={product.product_heading_title} // fixed field name
                      className="w-full h-full object-contain p-2"
                    />
                  </div>

                  {/* PRODUCT NAME */}
                  <h3 className="text-xs text-gray-600 mb-2 line-clamp-2 min-h-[32px]">
                    {product.product_heading_title} {/* fixed field name */}
                  </h3>

                  {/* PRICE */}
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-gray-800">
                      Rs. {product.price_rs?.toFixed(2)}{" "}
                      {/* fixed field name */}
                    </p>
                  </div>

                  {/* ADD TO CART - Protected */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-[#76bc21] hover:bg-[#5a9518] text-white text-xs font-semibold py-2 rounded transition"
                  >
                    {user?.loggedIn ? "ADD TO CART" : "LOGIN TO ADD"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
