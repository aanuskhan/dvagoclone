"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/app/adminSupabse/page"; // adjust path
import { IoMdContact } from "react-icons/io";
import { TiShoppingCart } from "react-icons/ti";

export default function Nav() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeCategory, setActiveCategory] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navRef = useRef(null);
  const router = useRouter();

  // Debounced search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timeout = setTimeout(async () => {
      const { data } = await supabase
        .from("product")
        .select("id, slug, product_heading_title, product_image_url, price_rs")
        .ilike("product_heading_title", `%${searchQuery}%`)
        .limit(6);

      setSuggestions(data || []);
      setShowSuggestions(true);
    }, 300); // wait 300ms after user stops typing

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    setShowSuggestions(false);
    setSearchQuery("");
  };

  const handleSelectSuggestion = (slug) => {
    router.push(`/product/${slug}`);
    setShowSuggestions(false);
    setSearchQuery("");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuData = {
    /* your menuData stays same */
  };
  const navItems = Object.keys(menuData);

  return (
    <header className="fixed w-full z-20 top-0 start-0 bg-white shadow">
      <nav className="bg-neutral-primary">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a href="/" className="flex items-center space-x-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKRJJvKBaMDW-fMYOFM4EV-e-LFNekQqGYFbEYCHu4Vw&s=10"
              className="h-10 w-28"
              alt="DVAGO Logo"
            />
          </a>

          {/* REAL TIME SEARCH BAR */}
          <div className="flex-1 max-w-lg mx-8 relative">
            <form onSubmit={handleSearch} className="flex">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery && setShowSuggestions(true)}
                  className="block w-full ps-9 pe-4 py-3 border-4 border-[#76bc21] rounded-xl focus:outline-none"
                  placeholder="Search Medicines, Foods..."
                />
              </div>
              <button
                type="submit"
                className="bg-[#76bc21] text-white px-5 rounded-r-lg font-semibold hover:bg-[#5a9518] ml-5"
              >
                Search
              </button>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                {suggestions.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectSuggestion(item.slug)}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                  >
                    <img
                      src={item.product_image_url}
                      alt={item.product_heading_title}
                      className="w-12 h-12 object-contain"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-800 line-clamp-1">
                        {item.product_heading_title}
                      </p>
                      <p className="text-[#76bc21] font-bold text-sm">
                        Rs. {item.price_rs}
                      </p>
                    </div>
                  </div>
                ))}
                <div
                  onClick={handleSearch}
                  className="p-3 text-center text-[#76bc21] font-semibold hover:bg-gray-50 cursor-pointer"
                >
                  See all results for "{searchQuery}"
                </div>
              </div>
            )}
          </div>

          {/* Keep your other buttons */}
          <div className="flex items-center space-x-6">
            <button className="bg-[#76bc21] w-35 rounded-lg h-11 text-sm font-medium text-white font-bold">
              <a href="#">Download App</a>
            </button>
            <button className="bg-[#76bc21] w-25 rounded-lg h-11">
              <a href="/register">
                <IoMdContact className="w-20 h-7 text-white mx-auto" />
              </a>
            </button>
            <button className="bg-[#76bc21] w-25 rounded-lg h-11">
              <a href="/cart">
                <TiShoppingCart className="w-20 h-7 text-white mx-auto" />
              </a>
            </button>
          </div>
        </div>
      </nav>

      {/* Keep your dropdown nav below */}
    </header>
  );
}
