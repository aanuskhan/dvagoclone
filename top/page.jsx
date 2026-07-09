"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/app/adminSupabse/page"; // adjust this path to your supabase client

export default function TopSellingVitamins() {
  const router = useRouter();
  const scrollRef = useRef(null);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Multivitamins");
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchVitamins = async () => {
  //     setLoading(true);
  //     const { data, error } = await supabase
  //       // .from("product") // change table name if different
  //       // .select("*")
  //       // .ilike("store_categories", ["Multivitamins"]) // case-insensitive match
  //       // .order("sold_count", { ascending: false, nullsFirst: false }) // top selling first
  //       // .limit(12);
  //       .from("product")
  //       .select("*")
  //       .contains("store_categories", ["Multivitamins"])
  //       .order("id", { ascending: false });

  //     if (!error) setProducts(data || []);
  //     setLoading(false);
  //   };
  //   fetchVitamins();
  // }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("dvago_user");
    const savedWishlist = localStorage.getItem("dvago_wishlist");
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

    fetchMultivitaminProducts(); // added
  }, []);
  async function fetchMultivitaminProducts() {
    setLoading(true);
    const { data, error } = await supabase
      .from("product")
      .select("*")
      .contains("store_categories", ["Multivitamins"])
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      setProducts([]);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  }

  //
  const handleAddToCart = (product) => {
    if (!user?.loggedIn) {
      localStorage.setItem("redirect_after_login", "/vitamins");
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

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 260;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      {/* Header - DVAGO style */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[22px] md:text-2xl font-bold text-gray-900">
            Top Selling Vitamins
          </h2>
        </div>
        <Link
          href="/vitamins"
          className="bg-[#76bc21] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#5a9518] transition-colors shadow-sm"
        >
          VIEW ALL
        </Link>
      </div>

      {/* Carousel */}
      <div className="relative group">
        {loading ? (
          <div className="flex gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[200px] md:w-[230px] h-[320px] bg-gray-100 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-gray-500 text-center py-12">No vitamins found</p>
        ) : (
          <>
            {/* Left Arrow */}
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-10 h-10 rounded-full bg-white border-gray-200 text-gray-700 flex items-center justify-center hover:bg-[#76bc21] hover:text-white hover:border-[#76bc21] transition-all shadow-md z-10 opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={20} />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto scroll-smooth scrollbar-hide pb-3"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {products.map((product) => (
                <div
                  onClick={() => router.push(`/anus/${product.slug}`)}
                  key={product.id}
                  className="flex-shrink-0 w-[200px] md:w-[230px] bg-white border-gray-100 rounded-xl hover:shadow-xl hover:border-gray-200 transition-all duration-200 relative group/card"
                >
                  {/* Badge + Wishlist */}
                  <div className="flex items-start justify-between p-3 pb-0">
                    <span className="text-[11px] font-medium text-[#76bc21] bg-green-50 px-2 py-0.5 rounded">
                      Vitamin
                    </span>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="text-gray-300 hover:text-red-500 transition"
                    >
                      <Heart
                        size={18}
                        className={
                          wishlist.includes(product.id)
                            ? "fill-red-500 text-red-500"
                            : ""
                        }
                      />
                    </button>
                  </div>

                  {/* Product Image */}
                  <Link
                    href={`/product/${product.slug}`}
                    className="block px-4 pt-1"
                  >
                    <div className="h-[150px] flex items-center justify-center">
                      <img
                        src={product.product_image_url || product.img}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain group-hover/card:scale-105 transition-transform duration-200"
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="p-3 pt-2">
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="text-sm text-gray-800 font-medium line-clamp-2 h-10 mb-2 hover:text-[#76bc21]">
                        {product.product_heading_title}
                      </h3>
                    </Link>

                    <div className="flex items-end justify-between mt-3">
                      <div>
                        <p className="text-[#76bc21] font-bold text-[17px]">
                          Rs. {Number(product.price_rs).toFixed(2)}
                        </p>
                        {product.old_price && (
                          <p className="text-gray-400 text-xs line-through">
                            Rs. {Number(product.old_price).toFixed(2)}
                          </p>
                        )}
                      </div>

                      {/* Add to Cart */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-9 h-9 rounded-full bg-[#76bc21] text-white flex items-center justify-center hover:bg-[#5a9518] transition-colors shadow-sm"
                      >
                        <ShoppingCart size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 rounded-full bg-white border-gray-200 text-gray-700 flex items-center justify-center hover:bg-[#76bc21] hover:text-white hover:border-[#76bc21] transition-all shadow-md z-10 opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
