"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart, ChevronRight } from "lucide-react";
import Link from "next/link";
import Nav from "../header/page";
import DvagoFooter from "../footer/page";

import { supabase } from "@/app/adminSupabse/page"; // added

export default function MedicinePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Multivitamins");
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]); // changed: start empty
  const [loading, setLoading] = useState(true); // added

  useEffect(() => {
    const savedUser = localStorage.getItem("dvago_user");
    const savedWishlist = localStorage.getItem("dvago_wishlist");
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

    fetchMedicineProducts(); // added
  }, []);

  // added: fetch products from Supabase where category is Medicine
  async function fetchMedicineProducts() {
    setLoading(true);
    const { data, error } = await supabase
      .from("product")
      .select("*")
      .contains("store_categories", ["Medicine"])
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
    "Cardio-Vascular System",
    "Central Nervous System",
    "Circulatory System",
    "Derma",
    "Endocrine System",
    "Eyes, Nose, Ear",
    "Gastro-Intestin",
  ];

  // removed hardcoded products array

  const handleAddToCart = (product) => {
    if (!user?.loggedIn) {
      localStorage.setItem("redirect_after_login", "/medicine");
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
      <header className="pb-35">
        <Nav />
      </header>
      <div className="min-h-screen bg-white ">
        {/* BREADCRUMB */}
        <div className="border-b border-gray-200">
          <div className="max-w-screen-xl mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-[#76bc21]">
                Home
              </Link>
              <ChevronRight size={16} />
              <Link href="/health-care" className="hover:text-[#76bc21]">
                Health Care
              </Link>
              <ChevronRight size={16} />
              <Link
                href="/nutritions-supplements"
                className="hover:text-[#76bc21]"
              >
                Medicine
              </Link>
              <ChevronRight size={16} />
              <span className="text-gray-700">Multivitamins</span>
            </div>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto px-4 py-6">
          {/* PAGE TITLE */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-6 bg-[#76bc21]"></div>
            <h1 className="text-2xl font-semibold text-gray-700">Medicine</h1>
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
              No products found in Medicine
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="  bg-white border-gray-200 rounded-lg p-3 hover:shadow-lg transition group"
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
                    {/* <Link href={`/anas/${encodeURIComponent(product.id)}`}></Link> */}{" "}
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

      <div className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-screen-xl mx-auto px-4 py-10">
          {/* Main Heading */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Buy Medicine Online at Best Prices in Pakistan
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            Looking for high-quality medicine at the best prices? At{" "}
            <Link
              href="/"
              className="text-[#76bc21] hover:underline font-semibold"
            >
              Dvago
            </Link>
            , Pakistan's trusted online pharmacy, we offer a wide range of
            medicine to meet all your health needs. Whether you're looking to{" "}
            <Link
              href="/boost-your-immunity"
              className="text-[#76bc21] hover:underline"
            >
              boost your immunity
            </Link>
            , improve your energy levels, or{" "}
            <Link
              href="/enhance-skin-health"
              className="text-[#76bc21] hover:underline"
            >
              enhance skin health
            </Link>
            , we have something for everyone. Shop with confidence and get your
            medicines delivered straight to your door – all at competitive
            prices. Buy multivitamins online in Pakistan now, and start your
            journey towards a healthier life!
          </p>
          {/* Shop by Type */}
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
            Shop Medicine by Type
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Explore a variety of medicines designed to fit your preferences and
            lifestyle. Choose the right form for you:
          </p>
          <ul className="space-y-2 mb-8 text-sm text-gray-600">
            <li className="flex gap-2">
              <span className="text-[#76bc21] font-bold">•</span>
              <span>
                <strong>Tablets:</strong> Convenient and easy to consume.
                Perfect for those who prefer a quick, no-fuss option.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#76bc21] font-bold">•</span>
              <span>
                <strong>Gummies:</strong> Delicious and fun, ideal for people
                who struggle with swallowing pills.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#76bc21] font-bold">•</span>
              <span>
                <strong>Capsules:</strong> Trusted by many for their
                effectiveness and quick absorption.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#76bc21] font-bold">•</span>
              <span>
                <strong>Liquid Medicine:</strong> Great for those who prefer
                liquids or need a higher dose of nutrients.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#76bc21] font-bold">•</span>
              <span>
                <strong>Effervescent Tablets:</strong> Dissolve in water for a
                fizzy, refreshing, and easily digestible option.
              </span>
            </li>
          </ul>
          <p className="text-gray-600 text-sm mb-8">
            Find your perfect medicines form at{" "}
            <Link
              href="/"
              className="text-[#76bc21] hover:underline font-semibold"
            >
              Dvago
            </Link>
            , your online pharmacy in Pakistan.
          </p>
          {/* By Age & Gender */}
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
            Medicine by Age & Gender
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Whether you're looking for medicines for yourself or a loved one,
            we've got you covered with our tailored options for every age and
            gender:
          </p>
          <ul className="space-y-2 mb-4 text-sm text-gray-600">
            <li className="flex gap-2">
              <span className="text-[#76bc21] font-bold">•</span>
              <span>
                <Link
                  href="/multivitamins-for-men"
                  className="text-[#76bc21] hover:underline font-semibold"
                >
                  Medicines for Men
                </Link>
                : Designed to support energy, immunity, and overall health.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#76bc21] font-bold">•</span>
              <span>
                <Link
                  href="/multivitamins-for-women"
                  className="text-[#76bc21] hover:underline font-semibold"
                >
                  Medicines for Women
                </Link>
                : Perfectly formulated to promote skin health, hormonal balance,
                and more.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#76bc21] font-bold">•</span>
              <span>
                <Link
                  href="/multivitamins-for-kids"
                  className="text-[#76bc21] hover:underline font-semibold"
                >
                  Medicines for Kids
                </Link>
                : Packed with essential nutrients to support your child's growth
                and development.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#76bc21] font-bold">•</span>
              <span>
                <strong>Medicines for Seniors:</strong> Aimed at maintaining{" "}
                <Link
                  href="/bone-health"
                  className="text-[#76bc21] hover:underline"
                >
                  bone health
                </Link>
                ,{" "}
                <Link
                  href="/heart-health"
                  className="text-[#76bc21] hover:underline"
                >
                  heart health
                </Link>
                , and improving overall vitality for older adults.
              </span>
            </li>
          </ul>
          <p className="text-gray-600 text-sm mb-8">
            With Dvago, you'll find the right medicines to match your age,
            gender, and unique health needs.
          </p>
          {/* Shop by Health Benefit */}
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
            Shop by Health Benefit
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Find multivitamins that target your specific health goals. Our
            selection helps with a wide range of concerns, ensuring you get
            exactly what you need for a healthier lifestyle:
          </p>
          <ul className="space-y-2 mb-8 text-sm text-gray-600">
            <li className="flex gap-2">
              <span className="text-[#76bc21] font-bold">•</span>
              <span>
                <strong>Immunity Support:</strong> Strengthen your immune system
                with multivitamins designed to fight off illness and keep you
                healthy.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#76bc21] font-bold">•</span>
              <span>
                <strong>Bone & Joint Health:</strong> Improve your bone density
                and joint mobility with specialized multivitamins.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#76bc21] font-bold">•</span>
              <span>
                <strong>Energy & Stamina:</strong> Fuel your day with
                multivitamins that boost energy levels and{" "}
                <Link
                  href="/enhance-physical-stamina"
                  className="text-[#76bc21] hover:underline"
                >
                  enhance physical stamina
                </Link>
                .
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#76bc21] font-bold">•</span>
              <span>
                <strong>Skin, Hair & Nails:</strong> Nourish your{" "}
                <Link href="/skin" className="text-[#76bc21] hover:underline">
                  skin
                </Link>
                ,{" "}
                <Link href="/hair" className="text-[#76bc21] hover:underline">
                  hair
                </Link>
                , and{" "}
                <Link href="/nails" className="text-[#76bc21] hover:underline">
                  nails
                </Link>{" "}
                with vitamins that promote a youthful glow and strength.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#76bc21] font-bold">•</span>
              <span>
                <strong>Brain & Heart Health:</strong> Support{" "}
                <Link
                  href="/cognitive-function"
                  className="text-[#76bc21] hover:underline"
                >
                  cognitive function
                </Link>{" "}
                and heart health with multivitamins packed with essential
                nutrients.
              </span>
            </li>
          </ul>
          <p className="text-gray-600 text-sm">
            At{" "}
            <Link
              href="/"
              className="text-[#76bc21] hover:underline font-semibold"
            >
              Dvago
            </Link>
            , we believe in providing multivitamins that cater to your specific
            needs. Shop now and take charge of your health with our range of
            high-quality options!
          </p>
        </div>
      </div>
      <footer>
        <DvagoFooter />
        <p className="text-red-500 text-center text-sm pt-5 pb-5">
          <b>Disclaimer:</b> Our official website is www.dvago.pk and our
          official mobile app is Dvago – Pharmacy & Health by Novacare (Pvt)
          Ltd.We are not liable for orders placed through unauthorized
          platforms.Stay vigilant against scams. Report any fraudulent websites,
          apps, or numbers falsely claiming association with Dvago to (021)
          11-11-38246 immediately. Thank you.
        </p>
      </footer>
    </>
  );
}
